const VehicleRental = require('../models/vehicleRentalModel');
const mongoose = require('mongoose');

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  res.send("getAllVehicleRentals");
};

// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  res.send("createVehicleRental");
};

// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {
  res.send("getVehicleRentalById");
};

// PUT /api/vehicleRentals/:vehicleRentalId
const updateVehicleRental = async (req, res) => {
  res.send("updateVehicleRental");
};

// DELETE /api/vehicleRentals/:vehicleRentalId
const deleteVehicleRental = async (req, res) => {
  res.send("deleteVehicleRental");
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
};

// const Product = require("../models/productModel");
// const mongoose = require("mongoose");

// // GET /products
// const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to retrieve products" });
//     }
// };

// // POST /products
// const createProduct = async (req, res) => {
// try {
//     const user_id = req.user._id;
//     const newProduct = new Product({...req.body, user_id}); // add ,user_id
//     await newProduct.save();
//     res.status(201).json(newProduct);

//     } catch (error) {
//         console.error("Error creating product:", error);
//         res.status(500).json({ error: "Server Error" });
//     }
// };

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