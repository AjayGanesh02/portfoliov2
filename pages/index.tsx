import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import ProjectContainer from '../components/projectContainer'
import AboutMe from '../components/aboutme'
import clientPromise from '../lib/mongodb'
import { Project } from '../components/types/project'
import { EJSON } from 'bson';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ Projects }: { Projects: Project[] }) {
  return (
    <>
      <Head>
        <title>Ajay Ganesh!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AboutMe/>
        <ProjectContainer Projects={Projects}/>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  try {
      const client = await clientPromise
      const projects = await client.db('Portfolio').collection('Projects').find({}).project({name: 1, tags: 1, _id: 0}).toArray()
      return {
          props: {Projects: projects}
      }

  } catch (e) {
      console.error(e)
      return {
          props: {Projects: []}
      }
  } 
}
