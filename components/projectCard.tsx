import { Project } from "./types/project";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="border border-sky-500 rounded">
            <h2>{project.name}</h2>
            {project.image}
            <ul>
                {project.tags.map((tag, idx) => <li key={idx}>{tag}</li>)}
            </ul>
        </div>
    );
}