import { Project } from "../types/project";
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="border border-sky-500 rounded shadow-md w-96 h-96">
            <h2>{project.name}</h2>
            <p>{project.blurb}</p>
            <Image 
            src={project.img} 
            alt={project.name} 
            width={500} 
            height={500}
            />
            <ul className="flex flex-row">
                {project.tags.map((tag, idx) => <li className="border border-sky-500 rounded w-1/2 " key={idx}>{tag}</li>)}
            </ul>
        </div>
    );
}