const express = require('express');
const cors = require('cors');
const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');
const userRouter = require("./routes/userRouter");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");  // Assuming swagger.json is in the same directory

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/vehicleRentals', vehicleRentalRouter);
app.use("/api/users", userRouter);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);



module.exports = app;

