import { Project } from "./types/project";
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="border border-sky-500 rounded">
            <h2>{project.name}</h2>
            <p>{project.blurb}</p>
            <Image src={project.img} alt={project.name} width={500} height={500}/>
            <ul>
                {project.tags.map((tag, idx) => <li className="border border-sky-500 rounded" key={idx}>{tag}</li>)}
            </ul>
        </div>
    );
}