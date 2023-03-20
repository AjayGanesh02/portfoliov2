import { Project } from "../types/project";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="hover-state z-0 my-6 flex h-80 w-72 flex-col rounded-lg border border-gray-500 bg-neutral-800 p-1 text-center hover:border-white">
      <Link href={"/projects/" + project.name}>
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-semibold">{project.name}</h2>
        </div>
      </Link>
      <div className="basis-1/2">
        <Link href={"/projects/" + project.name}>
          <div className="relative h-full w-full overflow-hidden rounded-lg object-cover">
            <Image
              src={project.img}
              alt={project.name}
              fill={true}
              sizes="
              (max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
        </Link>
      </div>
      <div className="m-2 flex basis-1/3 items-center justify-center gap-20">
        <Link href={"/projects/" + project.name}>
          <div className="hover-state flex h-14 w-20 items-center justify-center rounded border border-sky-500 text-center font-bold shadow-md">
            Info
          </div>
        </Link>
        {project.visit && (
          <Link href={project.visit}>
            <div className="hover-state flex h-14 w-20 items-center justify-center rounded border border-sky-500 text-center font-bold shadow-md">
              Visit
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
