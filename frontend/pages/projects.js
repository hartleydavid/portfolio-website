import Navbar from '../components/Navbar';
import { useState,  useEffect } from "react";


export default function Projects() {

	//Objects that is the projects from the database
	const [projects, setProjects] = useState([]);

	//Call the API to our backend and fetch the prokects
	useEffect(() => {
	  fetch("http://localhost:5000/api/projects") // Call backend API
		.then((res) => res.json())
		.then((data) => setProjects(data))
		.catch((err) => console.error("Error fetching projects:", err));
	}, []);

  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h2>My Projects!</h2>

		<ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
			<ul>
              {project.technologies?.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
            <p><strong>Status:</strong> {project.status}</p>
          </li>
        ))}
      </ul>

      </main>
    </div>
  );
}