import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function Projects() {
	const [projects, setProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [statusFilter, setStatusFilter] = useState("");
	const [selectedTechnologies, setSelectedTechnologies] = useState([]);


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
	        	}`,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setProjects(data.data.projects);
				setFilteredProjects(data.data.projects); // Initialize with all projects
			})
			.catch((err) => console.error("Error fetching projects:", err));
	}, []);

	// Function to get status color for each project
	const getStatusColor = (status) => {
		//Switch case for the string value of 'status'
		switch (status.toLowerCase()) {
			case "complete": //If completed
				return "bg-green-100 text-green-700";
			case "in progress"://If in progress
				return "bg-yellow-100 text-yellow-700";
			case "planned"://If planned
				return "bg-gray-100 text-gray-700";
			default://Default case, missing status
				return "bg-blue-100 text-blue-700";
		}
	};

	// Get unique technologies to display on page
	const allTechnologies = [
		...new Set(projects.flatMap((project) => project.technologies)),
	];

	// Handle Status Filter
	const handleStatusChange = (e) => {
		//Setter for how to filter
		setStatusFilter(e.target.value);
		//Filter the projects by status
		filterProjects(e.target.value, selectedTechnologies);
	};

	// Handle Technology Filter Toggle
	const toggleTechnology = (tech) => {
		//Update the technologies that have been selected for filtering
		const updatedTechnologies = selectedTechnologies.includes(tech)
			? selectedTechnologies.filter((t) => t !== tech)
			: [...selectedTechnologies, tech];

		//Set the selected technologies for filtering
		setSelectedTechnologies(updatedTechnologies);
		//Filter the projects
		filterProjects(statusFilter, updatedTechnologies);
	};

	// Filtering Function
	const filterProjects = (status, technologies) => {
		//Get the projects list by reference
		let filtered = projects;

		//If we are filtering by status
		if (status) {
			//Filter the set by only selecting the projects with the same status value
			filtered = filtered.filter((project) => project.status === status);
		}

		//If we have selected any technologies for filtering (At least 1 tech.)
		if (technologies.length > 0) {
			//Filter the set by the projects that have the tech in its tech list
			filtered = filtered.filter((project) =>
				project.technologies.some((tech) => technologies.includes(tech))
			);
		}

		//Set the projects to the new filtered state 
		setFilteredProjects(filtered);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 text-white flex flex-col pt-16">
			<Navbar />
			<div className="min-h-screen bg-gray-50 py-12 px-6">
				<h1 className="text-5xl font-extrabold text-center text-blue-600 mb-10">
					My Projects
				</h1>

				{/* Filters Section */}
				<div className="max-w-7xl mx-auto flex flex-col md:flex-col items-center justify-between mb-10 space-y-4">

					{/* Status Dropdown - Always on Top */}
					<div className="w-full md:w-auto">
						<select
							onChange={handleStatusChange}
							value={statusFilter}
							className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring focus:ring-blue-300 w-full"
						>
							<option value="">All Statuses</option>
							<option value="Complete">Completed</option>
							<option value="In Progress">In Progress</option>
							<option value="Planned">Planned</option>
						</select>
					</div>

					{/* Technology Filter - Always Below */}
					<div className="w-full md:w-auto">
						<div className="flex flex-wrap gap-2 mt-2">
							{allTechnologies.map((tech) => (
								<button
									key={tech}
									onClick={() => toggleTechnology(tech)}
									className={`px-3 py-1 text-sm rounded-full ${selectedTechnologies.includes(tech)
										? "bg-blue-500 text-white"
										: "bg-gray-200 text-gray-700"
										}`}
								>
									{tech}
								</button>
							))}
						</div>
					</div>
				</div>


				{/* Project Cards */}
				<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredProjects.map((project) => (
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
