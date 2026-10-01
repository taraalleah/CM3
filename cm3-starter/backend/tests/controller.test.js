
describe("POST /api/vehicleRentals", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
  });

  describe("when the payload is valid", () => {
    it("should create a vehicle rental and return status 201", async () => {
      await api
        .post("/api/vehicleRentals")
        //.set("Authorization", "bearer " + token)
        .send({
          vehicleModel: "Test",
          category: "Big",
          description: "Good quality",
          agency: "Test",
            contactEmail: "fih@mail.com",
            fleetSize: 20,
          location: {
            city: "Helsinki",
            state: "New york",
          },
          dailyPrice: 12,
          listingDate: "some date",
          availabilityStatus: 'available',
          bookingDeadline: "some date",
          insurancePolicy: "Test",
        })
        .expect(201);
    });
  });

  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => {
      await api
        .post("/api/vehicleRentals")
        //.set("Authorization", "bearer " + token)
        .send({
          description: "Good quality",
          agency: "Test",
            contactEmail: "fih@mail.com",
            fleetSize: 20,
          location: {
            city: "Helsinki",
            state: "New york",
          },
        })
        .expect(400);
    });
  });
});

describe("DELETE /api/vehicleRentals/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});

    await api
      .post("/api/vehicleRentals")
      //.set("Authorization", "bearer " + token)
      .send({
        title: "Situps",
        reps: 25,
        load: 10,
      });
  });

  it("should remove the workout and return status 200", async () => {
    const all = await api
      .get("/api/vehicleRentals")
      //.set("Authorization", "bearer " + token);

    const id = all.body[0]._id;

    await api
      .delete(`/api/vehicleRentals/${id}`)
      //.set("Authorization", "bearer " + token)
      .expect(200);

    const remaining = await api
      .get("/api/vehicleRentals")
      //.set("Authorization", "bearer " + token);

    expect(remaining.body).toHaveLength(0);
  });
});

describe("PATCH /api/vehicleRentals/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});

    await api
      .post("/api/vehicleRentals")
      //.set("Authorization", "bearer " + token)
      .send({
        title: "Situps",
        reps: 25,
        load: 10,
      });
  });

  it("should persist updated fields and return status 200", async () => {
    const all = await api
      .get("/api/vehicleRentals")
      //.set("Authorization", "bearer " + token);

    const id = all.body[0]._id;

    await api
      .patch(`/api/vehicleRentals/${id}`)
      //.set("Authorization", "bearer " + token)
      .send({ reps: 99 })
      .expect(200);

    const updated = await api
      .get(`/api/vehicleRentals/${id}`)
      //.set("Authorization", "bearer " + token);

    expect(updated.body.reps).toBe(99);
  });
});
