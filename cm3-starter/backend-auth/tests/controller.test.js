const supertest = require("supertest");
const mongoose = require("mongoose");
const config = require("../utils/config");
const app = require("../app");
const VehicleRental = require("../models/vehicleRentalModel");
const User = require("../models/userModel");
const api = supertest(app);

const SIGNUP_URL = "/api/users/signup";
const LOGIN_URL = "/api/users/login";
const RENTALS_URL = "/api/vehicleRentals";

const validUser = {
  name: "Test User",
  username: "testuser",
  password: "Passw0rd!",
  phone_number: "+358401234567",
  licenseNumber: "LIC-123456",
  date_of_birth: "1995-05-05",
  address: {
    licenseExpiryDate: "2030-01-01",
    city: "Helsinki",
    yearsOfExperience: 5,
  },
};

const validRental = {
  vehicleModel: "Test",
  category: "Big",
  description: "Good quality",
  agency: { name: "Test", contactEmail: "fih@mail.com", fleetSize: 20 },
  location: { city: "Helsinki", state: "Uusimaa" },
  dailyPrice: 12,
  listingDate: "2026-10-01",
  availabilityStatus: "available",
  bookingDeadline: "2026-12-01",
  insurancePolicy: "Test",
};

let token;

beforeAll(async () => {
  await mongoose.connect(config.MONGO_URI);
});

beforeEach(async () => {
  await VehicleRental.deleteMany({});
  await User.deleteMany({});
  const res = await api.post(SIGNUP_URL).send(validUser).expect(201);
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users/signup", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("creates a user and returns username + token", async () => {
    const res = await api.post(SIGNUP_URL).send(validUser).expect(201);
    expect(res.body.username).toBe(validUser.username);
    expect(res.body.token).toEqual(expect.any(String));
  });

  it("stores a hashed password, not the plain one", async () => {
    await api.post(SIGNUP_URL).send(validUser).expect(201);
    const saved = await User.findOne({ username: validUser.username });
    expect(saved.password).not.toBe(validUser.password);
    expect(saved.password).toMatch(/^\$2[aby]\$/); // bcrypt hash prefix
  });

  it("returns 400 when a required field is missing", async () => {
    const { phone_number, ...invalid } = validUser;
    const res = await api.post(SIGNUP_URL).send(invalid).expect(400);
    expect(res.body.error).toBeDefined();
    expect(await User.countDocuments()).toBe(0);
  });

  it("returns 400 when the username is already in use", async () => {
    await api.post(SIGNUP_URL).send(validUser).expect(201);
    const res = await api
      .post(SIGNUP_URL)
      .send({ ...validUser, licenseNumber: "LIC-OTHER" })
      .expect(400);
    expect(res.body.error).toMatch(/username already in use/i);
  });

  it("returns 400 when the license number is already registered", async () => {
    await api.post(SIGNUP_URL).send(validUser).expect(201);
    await api
      .post(SIGNUP_URL)
      .send({ ...validUser, username: "someoneelse" })
      .expect(400);
    expect(await User.countDocuments()).toBe(1);
  });
});

describe("POST /api/users/login", () => {
  it("returns 200 and a token for valid credentials", async () => {
    const res = await api
      .post(LOGIN_URL)
      .send({ username: validUser.username, password: validUser.password })
      .expect(200);
    expect(res.body.token).toEqual(expect.any(String));
  });

  it("returns 400 for a wrong password", async () => {
    const res = await api
      .post(LOGIN_URL)
      .send({ username: validUser.username, password: "wrong-password" })
      .expect(400);
    expect(res.body.error).toMatch(/invalid credentials/i);
  });

  it("returns 400 for an unknown user", async () => {
    await api
      .post(LOGIN_URL)
      .send({ username: "nobody", password: validUser.password })
      .expect(400);
  });

  it("returns 400 when fields are missing", async () => {
    await api.post(LOGIN_URL).send({ username: validUser.username }).expect(400);
    await api.post(LOGIN_URL).send({ password: validUser.password }).expect(400);
  });
});

describe("requireAuth middleware", () => {
  it("returns 401 when no Authorization header is sent", async () => {
    const res = await api.post(RENTALS_URL).send(validRental).expect(401);
    expect(res.body.error).toMatch(/authorization token required/i);
  });

  it("returns 401 for an invalid token", async () => {
    const res = await api
      .post(RENTALS_URL)
      .set("Authorization", "Bearer not.a.real.token")
      .send(validRental)
      .expect(401);
    expect(res.body.error).toMatch(/not authorized/i);
  });

  it("returns 401 for a malformed Authorization header", async () => {
    await api
      .post(RENTALS_URL)
      .set("Authorization", "garbage")
      .send(validRental)
      .expect(401);
  });

  it("allows the request through with a valid token", async () => {
    await api
      .post(RENTALS_URL)
      .set("Authorization", `Bearer ${token}`)
      .send(validRental)
      .expect(201);
  });
});

describe("POST /api/vehicleRentals", () => {
  it("creates a rental and returns 201", async () => {
    await api
      .post(RENTALS_URL)
      .set("Authorization", `Bearer ${token}`)
      .send(validRental)
      .expect(201);
    expect(await VehicleRental.countDocuments()).toBe(1);
  });

  it("returns 400 when required fields are missing", async () => {
    const { vehicleModel, ...invalid } = validRental;
    await api
      .post(RENTALS_URL)
      .set("Authorization", `Bearer ${token}`)
      .send(invalid)
      .expect(400);
  });

  it("returns 401 and creates nothing without a token", async () => {
    await api.post(RENTALS_URL).send(validRental).expect(401);
    expect(await VehicleRental.countDocuments()).toBe(0);
  });
});

describe("DELETE /api/vehicleRentals/:id", () => {
  it("removes the rental", async () => {
    const created = await VehicleRental.create(validRental);
    await api
      .delete(`${RENTALS_URL}/${created.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    expect(await VehicleRental.countDocuments()).toBe(0);
  });

  it("returns 401 and keeps the rental without a token", async () => {
    const created = await VehicleRental.create(validRental);
    await api.delete(`${RENTALS_URL}/${created.id}`).expect(401);
    expect(await VehicleRental.countDocuments()).toBe(1);
  });
});

describe("PUT /api/vehicleRentals/:id", () => {
  it("persists updated fields", async () => {
    const created = await VehicleRental.create(validRental);
    await api
      .put(`${RENTALS_URL}/${created.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ dailyPrice: 99 })
      .expect(200);
    const updated = await api
      .get(`${RENTALS_URL}/${created.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(updated.body.dailyPrice).toBe(99);
  });

  it("returns 401 and leaves the rental unchanged without a token", async () => {
    const created = await VehicleRental.create(validRental);
    await api
      .put(`${RENTALS_URL}/${created.id}`)
      .send({ dailyPrice: 99 })
      .expect(401);
    const unchanged = await VehicleRental.findById(created.id);
    expect(unchanged.dailyPrice).toBe(validRental.dailyPrice);
  });
});