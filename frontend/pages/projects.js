import Navbar from "../components/Navbar";
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";

import { useState, useEffect } from "react";

export default function Projects() {

	const [projects, setProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [statusFilter, setStatusFilter] = useState("");
	const [selectedTechnologies, setSelectedTechnologies] = useState([]);

	//Use effect to fetch the projects from our graphQL API (POST as we are making a query to GraphQL)
	useEffect(() => {
		//Fetch the response from our API proxy
		fetch("/api/graphql-proxy", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
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
			.then((data) => {
				setProjects(data.data.projects);
				setFilteredProjects(data.data.projects);
			})
			.catch((err) => console.error("Error fetching projects:", err));
	}, []);

	/** Helper function that will return the tailwind css classname string
	 * for the status of our projects
	 * 
	 * @param {*} status The Status of this project that calls the function
	 * @returns The tailwindcss classname string of the project to get the correct color
	 */
	const getStatusColor = (status) => {
		//Switch case for each of the possible colors of status's
		switch (status.toLowerCase()) {
			case "complete": //Green for complete
				return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
			case "in progress":// Yellow for in progress
				return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100";
			case "planned"://Grey for planned
				return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
			default:// Default is blue, there is an error or typo in status of project
				return "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100";
		}
	};

	// Get unique technologies to display on page
	const allTechnologies = [
		...new Set(projects.flatMap((project) => project.technologies)),
	];

	/** Helper function that will filter our projects when the status filter is upated
	 * 
	 * @param {*} e: The status value we want to filter by 
	 */
	const handleStatusChange = (e) => {
		//Set the new status filter
		setStatusFilter(e.target.value);
		//Filter the projects
		filterProjects(e.target.value, selectedTechnologies);
	};

	/** Helper function that will update the list of technologies selected when we select/deselect a technology
	 * from the list on the page
	 * 
	 * @param {*} tech: The newly changed technology
	 */
	const toggleTechnology = (tech) => {
		//If we have the selected tech already, filter back in all values in without this value (deselected), otherwise append new tech
		const updatedTechnologies = selectedTechnologies.includes(tech)
			? selectedTechnologies.filter((t) => t !== tech)
			: [...selectedTechnologies, tech];

		//Call the setter to update our list of selected technologies
		setSelectedTechnologies(updatedTechnologies);
		//Filter the projects with our new tech filter
		filterProjects(statusFilter, updatedTechnologies);
	};

	/** Function that will filter the projects based on the technologies selected
	 * 
	 * @param {*} status: The status of the project (all, complete, in progess, planned) filter for out returning dataset
	 * @param {*} technologies: A set of selected technologies (strings) that we want to filter our returning dataset to only include
	 */
	const filterProjects = (status, technologies) => {
		//Set the filtered projects equal to the current list of projects
		let filtered = projects;

		//If we are updating the status filter
		if (status) {
			//Filter the dataset
			filtered = filtered.filter((project) => project.status === status);
		}

		//If we have selected at least 1 technology to filter by
		if (technologies.length > 0) {
			//Filter the projects by the technologies
			filtered = filtered.filter((project) =>
				project.technologies.some((tech) => technologies.includes(tech))
			);
		}

		//Set the filtered projects to our newly filtered projects list
		setFilteredProjects(filtered);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 dark:from-gray-900 dark:to-black text-white flex flex-col pt-16">
			{/* Navbar */}
			<Navbar />
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
				{/* Title */}
				<h1 className="text-5xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-10">
					My Projects
				</h1>

				{/* Filters Section */}
				<div className="max-w-7xl mx-auto flex flex-col md:flex-col items-center justify-between mb-10 space-y-4">

					{/* GitHub Link*/}
					<Link
						href="https://github.com/hartleydavid"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-all duration-300">
						<FaGithub className="w-5 h-5" /> GitHub
					</Link>

					{/* Status Dropdown */}
					<div className="w-full md:w-auto">
						<select
							onChange={handleStatusChange}
							value={statusFilter}
							className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring focus:ring-blue-300 w-full"
						>
							<option value="">All Projects</option>
							<option value="Complete">Completed</option>
							<option value="In Progress">In Progress</option>
							<option value="Planned">Planned</option>
						</select>
					</div>

					{/* Technology Filter */}
					<div className="w-full md:w-auto">
						<div className="flex flex-wrap gap-2 mt-2">
							{/* As we select tech to filter, update the technologies filter of our dataset */}
							{allTechnologies.map((tech) => (
								<button
									key={tech}
									onClick={() => toggleTechnology(tech)}
									className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${selectedTechnologies.includes(tech)
										? "bg-blue-500 text-white dark:bg-blue-400 dark:text-gray-900"
										: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
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
							className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-xl p-6 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
						>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">{project.title}</h2>
							<p className="text-gray-700 dark:text-gray-300 mt-2">{project.description}</p>

							<span
								className={`inline-block px-3 py-1 mt-4 text-sm font-semibold rounded-full ${getStatusColor(
									project.status
								)}`}
							>
								{project.status}
							</span>

							<div className="mt-4">
								<p className="text-gray-800 dark:text-gray-300 font-semibold">Technologies Used:</p>
								<div className="flex flex-wrap gap-2 mt-2">
									{project.technologies?.map((tech, index) => (
										<span
											key={index}
											className="bg-blue-500 dark:bg-blue-400 text-white dark:text-gray-900 px-3 py-1 text-xs font-medium rounded-full shadow"
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
