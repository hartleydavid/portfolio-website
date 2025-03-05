const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const cors = require("cors");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://database:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Connect to the Database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Import your existing Project model
const Project = require("./models/Project");

// Define a GraphQL schema
const schema = buildSchema(`
  type Project {
    id: ID!
    title: String!
    description: String!
    status: String!
    technologies: [String]!
  }

  type Query {
    projects: [Project]
    project(id: ID!): Project
  }

  type Mutation {
    addProject(title: String!, description: String!, status: String!, technologies: [String]!): Project
    addMultipleProjects(projects: [ProjectInput]!): [Project]
    deleteAllProjects: String
  }

  input ProjectInput {
    title: String!
    description: String!
    status: String!
    technologies: [String]!
  }
`);

// Define resolvers
const root = {
    projects: async () => await Project.find(),
    project: async ({ id }) => await Project.findById(id),

    addProject: async ({ title, description, status, technologies }) => {
        const newProject = new Project({ title, description, status, technologies });
        return await newProject.save();
    },
    // Add multiple projects at once
    addMultipleProjects: async ({ projects }) => {
        const newProjects = await Project.insertMany(projects);
        return newProjects;
    },

    // Delete all projects Function
    deleteAllProjects: async () => {
        await Project.deleteMany({});
        return "All projects have been deleted!";
    }
};

// Create an Express app
const app = express();
app.use(cors());

// Set up GraphQL API
app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Enables GraphiQL UI for testing
}));

// Start the server
app.listen(5000, () => console.log("Server running on http://localhost:5000/graphql"));