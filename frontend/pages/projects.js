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
				  status
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

	// Function to get status color
	const getStatusColor = (status) => {
		switch (status.toLowerCase()) {
		case "completed":
			return "bg-green-100 text-green-700";
		case "in progress":
			return "bg-yellow-100 text-yellow-700";
		case "planned":
			return "bg-gray-100 text-gray-700";
		default:
			return "bg-blue-100 text-blue-700";
		}
	};

	return (
		<div>
		<Navbar />
		<div className="min-h-screen bg-gray-50 py-12 px-6">
			<h1 className="text-5xl font-extrabold text-center text-blue-600 mb-10">
			My Projects
			</h1>

			<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{projects.map((project) => (
				<div
				key={project.id}
				className="bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
				>
				<h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
				<p className="text-gray-700 mt-2">{project.description}</p>

				<span
					className={`inline-block px-3 py-1 mt-4 text-sm font-semibold rounded-full ${getStatusColor(
					project.status
					)}`}
				>
					{project.status}
				</span>

				<div className="mt-4">
					<p className="text-gray-800 font-semibold">Technologies Used:</p>
					<div className="flex flex-wrap gap-2 mt-2">
					{project.technologies?.map((tech, index) => (
						<span
						key={index}
						className="bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-full shadow"
						>
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