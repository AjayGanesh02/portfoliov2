import { Project } from "../types/project";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="hover-state z-0 my-6 flex h-80 w-72 flex-col rounded-lg border border-white bg-gradient-to-r from-zinc-600 to-zinc-500 p-1 text-center">
      <Link href={"/projects/" + project.name}>
        <div className="flex basis-1/6 items-center justify-center">
          <h2 className="text-lg">{project.name}</h2>
        </div>
      </Link>
      <div className="relative basis-1/2 overflow-hidden rounded-lg object-cover">
        <Link href={"/projects/" + project.name}>
          <Image src={project.img} alt={project.name} fill={true} />
        </Link>
      </div>
      <div className="m-2 flex basis-1/3 items-center justify-center gap-20">
        <Link href={"/projects/" + project.name}>
          <div className="hover-state flex h-14 w-20 items-center justify-center rounded border border-sky-500 text-center">
            Info
          </div>
        </Link>
        {project.visit && (
          <Link href={project.visit}>
            <div className="hover-state flex h-14 w-20 items-center justify-center rounded border border-sky-500 text-center">
              Visit
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
