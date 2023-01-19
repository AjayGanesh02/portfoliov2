import { useRouter } from "next/router";
import clientPromise from "../../lib/mongodb";
import { Project } from "../../components/types/project";
import Image from "next/image";

export default function ProjectInfo({project}: {project: Project}) {
  return (
    <div>
        <h1>{project.name}</h1>
        <h3>{project.blurb}</h3>
        <Image src={project.img} alt={project.name} width={500} height={500} />
    </div>
  );
}

type Params = {
    params: {
        pid: string
    }
}

export async function getStaticProps({ params }: Params) {
  try {
    const client = await clientPromise;
    const project = await client
      .db("Portfolio")
      .collection("Projects")
      .find({name: params.pid})
      .project({
        name: 1,
        blurb: 1,
        img: 1,
        _id: 0
      }).toArray()
      return { 
        props: {project: project[0]},
        revalidate: 60
    }
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
        params: { pid: project.name }
      }))

      return { paths, fallback: false }
    } catch (e) {
      console.error(e);
    }
  }