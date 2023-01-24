import ProjectCard from "./projectCard";
import { Project } from "../types/project";

export default function ProjectContainer({
  Projects,
}: {
  Projects: Project[];
}) {
  return (
    <div className="">
      <h2 className="text-2xl">/projects</h2>
      <div>
        <div className="projects relative z-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
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
