
import { useEffect, useState } from 'react';
// The corrected code
import { getProjects } from './services/apiService';        // This imports the 'value' (the function)
import type { Project } from './services/apiService'; // This imports the 'type' (the interface)
import { ProjectCard } from './components/ProjectCard';
import './App.css';

function App() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProjects()
            .then(data => setProjects(data))
            .catch(err => {
                console.error("Failed to fetch projects:", err);
                setError("Could not load projects. Is the backend server running?");
            });
    }, []);

    return (
        <>
            <h1>My Professional Portfolio</h1>
            <p>Welcome! Here are some of my projects.</p>
            <div className="project-grid">
                {error && <p className="error">{error}</p>}
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </>
    );
}

export default App;