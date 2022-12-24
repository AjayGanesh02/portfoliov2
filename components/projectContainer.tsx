import ProjectCard from "./projectCard";

export default function ProjectContainer() {
    return (
        <div>
            <ProjectCard project={{name: "test", image: "test", tags: ["test1", "test2"]}}/>
        </div>
    )
}