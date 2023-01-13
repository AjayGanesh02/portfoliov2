import ProjectCard from "./projectCard";
import { Project } from "../types/project";

export default function ProjectContainer({Projects}: {Projects: Project[] }) {
    return (
        <div>
            {Projects.map((proj, idx) => <ProjectCard key={idx} project={proj}/>)}
        </div>
    )
}

