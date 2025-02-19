const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://database:27017/portfolio"; // Using Docker service name

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Import and use routes
const projectRoutes = require("./routes/projects"); // ✅ Correct way
app.use("/api/projects", projectRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running! 🚀");
});

// Start the server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



/* OLD CODE
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/api/projects', (req, res) => {
  res.json([{ name: 'Project 1', description: 'Description of project 1' }]);
});

app.listen(5000, () => console.log('Server running on port 5000'));*/