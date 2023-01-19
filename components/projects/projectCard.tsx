import { Project } from "../types/project";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="z-0 my-6 flex h-96 w-96 flex-col rounded border border-sky-500 bg-gray-700 text-center shadow-md">
      <div className="basis-1/6">
        <h2>{project.name}</h2>
        <p>{project.blurb}</p>
      </div>
      <div className="relative basis-1/2 object-cover">
        <Image
          src={project.img}
          alt={project.name}
          // width={500}
          // height={500}
          fill={true}
        />
      </div>
      <ul className="grid basis-1/6 grid-cols-3 items-center">
        {project.tags.map((tag, idx) => (
          <div key={idx} className="h-full rounded border border-sky-500">
            <li className="text-center">{tag}</li>
          </div>
        ))}
      </ul>
      <div className="m-2 grid h-1/3 basis-1/6 grid-cols-2 items-center">
        <div className="h-fit w-12 rounded border border-sky-500 text-center shadow-md">
           <Link href={"/projects/" + project.name}>
                        Info
                    </Link> 
        </div>
        {project.visit && (
          <div className="h-fit w-12 rounded border border-sky-500 text-center shadow-md">
            <Link href={project.visit}>Visit</Link>
          </div>
        )}
      </div>
    </div>
  );
}
