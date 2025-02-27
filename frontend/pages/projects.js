import Navbar from '../components/Navbar';
import { useState,  useEffect } from "react";


export default function Projects() {

	//Objects that is the projects from the database
	const [projects, setProjects] = useState([]);

	//Call the API to our backend and fetch the prokects
	useEffect(() => {
		fetch("http://localhost:5000/graphql", {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
			query: `
			  query {
				projects {
				  id
				  title
				  description
				  technologies
				}
			  }
			`,
		  }),
		})
		  .then((res) => res.json())
		  .then((data) => setProjects(data.data.projects))
		  .catch((err) => console.error("Error fetching projects:", err));
	  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
		  <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">My Projects</h1>
		  
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{projects.map((project) => (
			  <div key={project._id} className="bg-white shadow-md rounded-lg p-6">
				<h2 className="text-2xl font-semibold text-gray-800">{project.name}</h2>
				<p className="text-gray-600 mt-2">{project.description}</p>
				<p className="mt-3 text-sm text-gray-500">
				  <strong>Status:</strong> <span className="text-blue-500">{project.status}</span>
				</p>
	
				<div className="mt-3">
				  <p className="font-semibold text-gray-700">Technologies Used:</p>
				  <div className="flex flex-wrap gap-2 mt-2">
					{project.technologies?.map((tech, index) => (
					  <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 text-xs font-medium rounded-full">
						{tech}
					  </span>
					))}
				  </div>
				</div>
			  </div>
			))}
		  </div>
		</div>
    </div>
  );
}