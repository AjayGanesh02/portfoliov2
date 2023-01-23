import clientPromise from "../../lib/mongodb";
import { Project } from "../../components/types/project";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export default function ProjectInfo({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1>{project.name}</h1>
        <h3>{project.blurb}</h3>
        <Image
          src={project.img}
          alt={project.name}
          height={1000}
          width={1000}
        />
      </div>
      <div className="px-4 pt-20">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {project.mdDesc}
        </ReactMarkdown>
      </div>
    </div>
  );
}

type Params = {
  params: {
    pid: string;
  };
};

export async function getStaticProps({ params }: Params) {
  try {
    const client = await clientPromise;
    const project = await client
      .db("Portfolio")
      .collection("Projects")
      .find({ name: params.pid })
      .project({
        name: 1,
        blurb: 1,
        img: 1,
        mdDesc: 1,
        _id: 0,
      })
      .toArray();
    return {
      props: { project: project[0] },
      revalidate: 60,
    };
  } catch (e) {
    console.error(e);
  }
}

export async function getStaticPaths() {
  try {
    const client = await clientPromise;
    const projects = await client
      .db("Portfolio")
      .collection("Projects")
      .find({})
      .project({
        name: 1,
        _id: 0,
      })
      .toArray();

    const paths = projects.map((project) => ({
      params: { pid: project.name },
    }));

    return { paths, fallback: false };
  } catch (e) {
    console.error(e);
  }
}
