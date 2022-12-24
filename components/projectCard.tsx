import { Project } from "./types/project";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="border border-sky-500 rounded">
            {project.name}
            {project.image}
            {project.tags}
        </div>
    );
}