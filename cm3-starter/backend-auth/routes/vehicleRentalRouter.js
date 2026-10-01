const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
} = require('../controllers/vehicleRentalControllers');

// GET /api/vehicleRentals
router.get('/', getAllVehicleRentals);

// POST /api/vehicleRentals
router.post('/', requireAuth, createVehicleRental);

// GET /api/vehicleRentals/:vehicleRentalId
router.get('/:vehicleRentalId', getVehicleRentalById);

// PUT /api/vehicleRentals/:vehicleRentalId
router.put('/:vehicleRentalId', requireAuth, updateVehicleRental);

// DELETE /api/vehicleRentals/:vehicleRentalId
router.delete('/:vehicleRentalId', requireAuth, deleteVehicleRental);

module.exports = router;

