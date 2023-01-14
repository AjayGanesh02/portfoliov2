import { Project } from "../types/project";
import Image from 'next/image';
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="border border-sky-500 rounded shadow-md w-96 h-96 text-center flex flex-col bg-gray-700">
            <div className="basis-1/6">
                <h2>{project.name}</h2>
                <p>{project.blurb}</p>
            </div>
            <div className="basis-1/2 object-cover relative">
                <Image
                    src={project.img}
                    alt={project.name}
                    // width={500}
                    // height={500}
                    fill={true}
                />
            </div>
            <ul className="grid grid-cols-3 basis-1/6 items-center">
                {project.tags.map((tag, idx) => <div key={idx} className="border border-sky-500 rounded h-full"><li className="text-center" >{tag}</li></div>)}
            </ul>
            <div className="grid grid-cols-2 m-2 h-1/3 items-center basis-1/6">
                <div className="border border-sky-500 rounded shadow-md w-12 h-fit text-center">
                    Info
                    {/* <Link href={project.visit}>
                        Visit
                    </Link> */}
                </div>
                {project.visit &&
                    <div className="border border-sky-500 rounded shadow-md w-12 h-fit text-center">
                        <Link href={project.visit}>
                            Visit
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}