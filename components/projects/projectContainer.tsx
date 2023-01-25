import ProjectCard from "./projectCard";
import { Project } from "../types/project";

export default function ProjectContainer({
  Projects,
}: {
  Projects: Project[];
}) {
  return (
    <div className="">
      <div className="flex items-center justify-center text-center">
        <h2 className="text-2xl">/projects</h2>
      </div>
      <div className="flex place-content-center">
        <div className="projects relative z-0 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-12">
          {Projects.map((proj, idx) => (
            <div key={idx}>
              <ProjectCard project={proj} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
