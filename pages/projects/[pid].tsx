import clientPromise from "../../lib/mongodb";
import { Project } from "../../components/types/project";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export default function ProjectInfo({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="pb-4 text-4xl">{project.name}</h1>
        <div className="pb-4">
          <Image
            src={project.img}
            alt={project.name}
            height={1000}
            width={1000}
          />
        </div>
        <h3 className="pb-4 text-gray-400">{project.blurb}</h3>
      </div>
      {!project.experience && (
        <div className="flex flex-row flex-wrap items-center justify-center gap-6">
          <h1>Tags:</h1>
          {project.tags.map((tag, idx) => (
            <div className="rounded-md border p-2" key={idx}>
              {tag}
            </div>
          ))}
        </div>
      )}
      <div className="px-8 pt-8 pb-12">
        <h3 className="pb-4 text-center text-xl">Description</h3>
        <div className="prose prose-invert text-center max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {project.mdDesc}
          </ReactMarkdown>
        </div>
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
        tags: 1,
        experience: 1,
        _id: 0,
      })
      .toArray();
    return {
      props: { project: project[0] },
      revalidate: 3600,
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
