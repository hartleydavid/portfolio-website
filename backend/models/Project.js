const mongoose = require("mongoose");

//Project Schema used for the GraphQL API
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  technologies: [String],
});

//Export the project schema
module.exports = mongoose.model("Project", ProjectSchema);
