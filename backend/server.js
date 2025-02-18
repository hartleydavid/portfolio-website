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

app.listen(5000, () => console.log('Server running on port 5000'));