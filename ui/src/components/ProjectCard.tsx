
import { type Project } from '../services/apiService';
import './ProjectCard.css';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className="card">
            <img src={project.imageUrl} alt={project.title} className="card-image" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="card-links">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
            </div>
        </div>
    );
};