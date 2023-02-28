import { Project } from "../types/project";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="hover-state z-0 my-6 flex h-80 w-72 flex-col rounded-lg border border-white bg-gradient-to-r from-zinc-600 to-zinc-500 p-1 text-center">
      <a id="projects"></a>
      <div className="flex basis-1/6 items-center justify-center">
        <h2 className="text-lg">{project.name}</h2>
      </div>
      <div className="relative basis-1/2 overflow-hidden rounded-lg object-cover">
        <Image src={project.img} alt={project.name} fill={true} />
      </div>
      <div className="m-2 grid h-1/3 basis-1/3 grid-cols-2 items-center">
        <div className="h-fit w-12 rounded border border-sky-500 text-center shadow-md">
          <Link href={"/projects/" + project.name}>Info</Link>
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
