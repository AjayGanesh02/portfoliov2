import ProjectCard from "./projectCard";
import { Project } from "../types/project";

export default function ProjectContainer({ Projects }: { Projects: Project[] }) {
    return (
        <div className="grid grid-cols-3 projects">
            {Projects.map((proj, idx) =>
                <div key={idx}>
                    <ProjectCard project={proj} />
                </div>)}
        </div>
    )
}

