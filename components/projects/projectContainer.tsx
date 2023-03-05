import ProjectCard from "./projectCard";
import { Project } from "../types/project";
import { useState } from "react";

const topics = ["JavaScript", "C/C++", "Python", ""];

export default function ProjectContainer({
  Projects,
}: {
  Projects: Project[];
}) {
  const [curTopic, setCurTopic] = useState("");
  return (
    <div>
      <a id="projects"></a>
      <div className="flex items-center justify-center text-center">
        <h2 className="text-2xl">/projects</h2>
      </div>
      <div className="my-6 flex flex-col items-center justify-center text-center">
        <p>Filter by:</p>
        <div className="flex flex-row items-center justify-center">
          {topics.map((topic, idx) => (
            <button
              className={
                "hover-state m-2 rounded-md border border-blue-400 p-1 shadow-md hover:shadow-lg" +
                (curTopic == topic && topic ? " border-red-700" : "")
              }
              onClick={() => {
                setCurTopic(topic);
              }}
              key={idx}
            >
              {topic === "" ? "Reset" : topic}
            </button>
          ))}
        </div>
      </div>
      <div className="flex place-content-center">
        <div className="projects relative z-0 grid grid-cols-1 gap-12 lg:grid-cols-2 2xl:grid-cols-3">
          {Projects.map((proj, idx) => {
            if (curTopic === "" || proj.tags.includes(curTopic)) {
              return (
                <div key={idx}>
                  <ProjectCard project={proj} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
