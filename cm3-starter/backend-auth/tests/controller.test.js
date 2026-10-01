const supertest = require("supertest");
const mongoose = require("mongoose");
const config = require("../utils/config");
const app = require("../app");
const VehicleRental = require("../models/vehicleRentalModel");
const api = supertest(app);

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

beforeAll(async () => {
  await mongoose.connect(config.MONGO_URI);
});

beforeEach(async () => {
  await VehicleRental.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/vehicleRentals", () => {
  it("creates a rental and returns 201", async () => {
    await api.post("/api/vehicleRentals").send(validRental).expect(201);
  });
  it("returns 400 when required fields are missing", async () => {
    const { vehicleModel, ...invalid } = validRental;
    await api.post("/api/vehicleRentals").send(invalid).expect(400);
  });
});

describe("DELETE /api/vehicleRentals/:id", () => {
  it("removes the rental", async () => {
    const created = await VehicleRental.create(validRental);
    await api.delete(`/api/vehicleRentals/${created.id}`).expect(204);
    expect(await VehicleRental.countDocuments()).toBe(0);
  });
});

describe("PUT /api/vehicleRentals/:id", () => {
  it("persists updated fields", async () => {
    const created = await VehicleRental.create(validRental);
    await api.put(`/api/vehicleRentals/${created.id}`)
      .send({ dailyPrice: 99 }).expect(200);
    const updated = await api.get(`/api/vehicleRentals/${created.id}`).expect(200);
    expect(updated.body.dailyPrice).toBe(99);
  });
});