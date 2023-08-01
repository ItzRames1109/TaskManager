const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(cors());

const userRoutes = require('./userRoutes');

app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected successfully to MongoDB");

    app.listen(process.env.PORT || 8000, (err) => {
      if (err) {
        console.log("Error starting the server:", err);
      } else {
        console.log("Server running successfully at", process.env.PORT || 8000);
      }
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });


app.use(userRoutes);