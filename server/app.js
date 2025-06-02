const express = require("express");
const PORT = 5005;
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const {
  middlewareConfig,
  errorHandler,
  notFoundHandler,
} = require("./config/middleware.config");
require("dotenv").config();
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
middlewareConfig(app);

//DB CONNECTION (DAY 2)
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

//ROUTES
const cohortRoute = require("./routes/cohort.route");
const studentRoute = require("./routes/student.route");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
app.use("/", cohortRoute);
app.use("/", studentRoute);
app.use("/", authRoute);
app.use("/", userRoute);

//!SWAGGER BASICS

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cohort Tools API",
      version: "1.0.0",
      description: "API documentation for Cohort Tools project",
    },
    servers: [
      {
        url: "http://localhost:5005",
      },
    ],
  },
  apis: ["./swagger.js"], // You can add more files here for annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

//!SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//ERROR HANDLING
//1: NOT FOUND
app.use(notFoundHandler);

//2: OTHER ERRORS
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
