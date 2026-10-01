const VehicleRental = require('../models/vehicleRentalModel');
const mongoose = require('mongoose');

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  try {
      const vehicleRentals = await VehicleRental.find({});
      res.status(200).json(vehicleRentals);
  } catch (error) {
      res.status(500).json({ message: "Failed to retrieve Vehicle Rentals" });
  }
};

// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  try {
    //const user_id = req.user._id;
    const newVehicleRental = new VehicleRental({...req.body}); // {...req.body, user_id}
    await newVehicleRental.save();
    res.status(201).json(newProduct);

    } catch (error) {
        console.error("Error creating Vehicle Rentals:", error);
        res.status(500).json({ error: "Server Error" });
    }
};


// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {
  const { vehicleRentaltId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(vehicleRentaltId)) {
        return res.status(400).json({ message: "Invalid vehicleRental ID" });
    }

    try {
        const vehicleRental = await VehicleRental.findById(vehicleRentaltId);
        const limit = parseInt(req.query._limit);
        const products = limit 
            ? await VehicleRental.find({}).sort({ createdAt: -1 }).limit(limit)
            : await VehicleRental.find({}).sort({ createdAt: -1 });
        if (vehicleRental) {
            res.status(200).json(vehicleRental);
        } else {
            res.status(404).json({message: "VehicleRental is not found"});
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve a vehicleRental" });
    }
};



// PUT /api/vehicleRentals/:vehicleRentalId
const updateVehicleRental = async (req, res) => {
       const { vehicleRentalId } = req.params;
       //const user_id = req.user._id;

     if (!mongoose.Types.ObjectId.isValid(productId)) {
         return res.status(400).json({ message: "Invalid product ID" });
     }
     try {
         const updatedVehicleRental = await VehicleRental.findOneAndUpdate(
            { _id: vehicleRentalId},
             { ...req.body},
             { returnDocument: "after" },
         );
         if (updatedVehicleRental) {
            res.status(200).json(updatedVehicleRental);
        } else {
             res.status(404).json({ message: "Vehicle not found" });
         }

     } catch (error) {
         res.status(500).json({ message: "Failed to update a vehicle" });
     }
 };


[]
 // DELETE /products/:productId
 const deleteVehicleRental = async (req, res) => {
      const { vehicleRentalId } = req.params;
       const user_id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid vehicle ID" });
     }

     try {
         const deleteVehicleRental = await VehicleRental.findOneAndDelete({_id: vehicleRentalId, user_id});
         if (deleteVehicleRental){
             res.status(204).send();
         } else {
             res.status(404).json({message: "vehicle not found"});
         }
     } catch {
        res.status(500).json({ message: "Failed to delete a vehicle" });
     }
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
};


// // GET /products/:productId
// const getProductById = async (req, res) => {
// const { productId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//         return res.status(400).json({ message: "Invalid product ID" });
//     }

//     try {
//         const product = await Product.findById(productId);
//         const limit = parseInt(req.query._limit);
//         const products = limit 
//             ? await Product.find({}).sort({ createdAt: -1 }).limit(limit)
//             : await Product.find({}).sort({ createdAt: -1 });
//         if (product) {
//             res.status(200).json(product);
//         } else {
//             res.status(404).json({message: "Product is not found"});
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Failed to retrieve a product" });
//     }


// };

// // PUT /products/:productId
// const updateProduct = async (req, res) => {
//       const { productId } = req.params;
//       const user_id = req.user._id;

//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//         return res.status(400).json({ message: "Invalid product ID" });
//     }
//     try {
//         const updatedProduct = await Product.findOneAndUpdate(
//             { _id: productId, user_id },
//             { ...req.body},
//             { returnDocument: "after" },
//         );
//         if (updatedProduct) {
//             res.status(200).json(updatedProduct);
//         } else {
//             res.status(404).json({ message: "Product not found" });
//         }

//     } catch (error) {
//         res.status(500).json({ message: "Failed to update a product" });
//     }
// };

// // DELETE /products/:productId
// const deleteProduct = async (req, res) => {
//       const { productId } = req.params;
//       const user_id = req.user._id;

//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//         return res.status(400).json({ message: "Invalid product ID" });
//     }

//     try {
//         const deleteProduct = await Product.findOneAndDelete({_id: productId, user_id});
//         if (deleteProduct){
//             res.status(204).send();
//         } else {
//             res.status(404).json({message: "Product not found"});
//         }
//     } catch {
//         res.status(500).json({ message: "Failed to delete a product" });
//     }
// };

// module.exports = {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// };

/*
describe("POST /api/vehicleRentals", () => {
  beforeEach(async () => {
    await VehicleRental.deleteMany({});
  });

  describe("when the payload is valid", () => {
    it("should create a workout and return status 201", async () => {
      await api
        .post("/api/vehicleRentals")
        //.set("Authorization", "bearer " + token)
        .send({
          title: "Situps",
          reps: 25,
          load: 10,
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
          reps: 10,
          load: 100,
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
      .set("Authorization", "bearer " + token)
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

describe("PATCH /api/workouts/:id", () => {
  beforeEach(async () => {
    await VehicleRental.deleteMany({});

    await api
      .post("/api/")
      //.set("Authorization", "bearer " + token)
      .send({
        title: "Situps",
        reps: 25,
        load: 10,
      });
  });

  it("should persist updated fields and return status 200", async () => {
    const all = await api
      .get("/api/workouts")
      //.set("Authorization", "bearer " + token);

    const id = all.body[0]._id;

    await api
      .patch(`/api/vehicleRental/${id}`)
      .set("Authorization", "bearer " + token)
      .send({ reps: 99 })
      .expect(200);

    const updated = await api
      .get(`/api/vehicleRental/${id}`)
      //.set("Authorization", "bearer " + token);

    expect(updated.body.reps).toBe(99);
  });
});
*/
