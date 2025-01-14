"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type ProjectType = {
  title: string
  period: string
  description: string
  highlights: string[]
  technologies: string[]
  image: string
  github: string
  demo: string
  language: 'JavaScript' | 'C/C++' | 'Python' | 'Go' | 'Rust'
}

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null)

  const filteredProjects = filter
    ? projects.filter(project => project.language === filter)
    : projects

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Projects</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Featured Work
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Here are some of the projects I've worked on that showcase my skills and experience.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant={filter === null ? "default" : "outline"}
            onClick={() => setFilter(null)}
            className="text-sm"
          >
            All
          </Button>
          <Button
            variant={filter === "JavaScript" ? "default" : "outline"}
            onClick={() => setFilter("JavaScript")}
            className="text-sm"
          >
            JavaScript
          </Button>
          <Button
            variant={filter === "C/C++" ? "default" : "outline"}
            onClick={() => setFilter("C/C++")}
            className="text-sm"
          >
            C/C++
          </Button>
          <Button
            variant={filter === "Python" ? "default" : "outline"}
            onClick={() => setFilter("Python")}
            className="text-sm"
          >
            Python
          </Button>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{project.title}</CardTitle>
                  <CardDescription className="text-gray-500">
                    {project.period}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{project.description}</p>
                  <ul className="mt-4 space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-gray-500">
                        • {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => window.open(project.github, '_blank')}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  {project.demo !== '#' && (
                    <Button variant="outline" size="sm" onClick={() => window.open(project.demo, '_blank')}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const projects: ProjectType[] = [
  {
    title: 'Virtual Memory Manager',
    period: 'December 2023',
    description: 'A C++ implementation of a virtual memory management system with page replacement algorithms.',
    highlights: [
      'Implemented LRU and FIFO page replacement algorithms',
      'Built virtual address translation mechanism',
      'Managed page tables and frame allocation',
      'Handled page faults and memory access violations'
    ],
    technologies: ['C++', 'Operating Systems', 'Memory Management'],
    image: '/placeholder.svg?height=200&width=400',
    github: 'https://github.com/AjayGanesh02/virtual-memory-manager',
    demo: '#',
    language: 'C/C++',
  },
  {
    title: 'Distributed Key-Value Database',
    period: 'October 2023',
    description: 'A highly available distributed key-value store implementing the Paxos consensus algorithm.',
    highlights: [
      'Implemented sharding for improved performance and scalability',
      'Built fault tolerance mechanisms for node failures',
      'Developed custom garbage collection for optimal performance',
      'Created a robust testing suite for distributed systems'
    ],
    technologies: ['Go', 'RPCs', 'AWS', 'Distributed Systems'],
    image: '/placeholder.svg?height=200&width=400',
    github: 'https://github.com/AjayGanesh02/distributed-kv-store',
    demo: '#',
    language: 'Go',
  },
  {
    title: 'TaskTango',
    period: 'January 2023',
    description: 'A smart home management system for distributing and tracking household chores.',
    highlights: [
      'Integrated NFC tags for physical task verification',
      'Built serverless backend architecture on AWS',
      'Developed Arduino-based hardware system',
      'Implemented real-time notifications'
    ],
    technologies: ['React', 'Next.js', 'MongoDB', 'AWS', 'Arduino', 'NFC'],
    image: '/placeholder.svg?height=200&width=400',
    github: 'https://github.com/AjayGanesh02/TaskTango',
    demo: 'https://tasktango.vercel.app',
    language: 'JavaScript',
  },
  {
    title: 'Word Hunt Solver',
    period: 'May 2022',
    description: 'A web application that solves Word Hunt puzzles from the GamePigeon iOS game.',
    highlights: [
      'Containerized application using Docker',
      'Deployed on Google Cloud Platform',
      'Implemented efficient word search algorithms',
      'Built responsive React frontend'
    ],
    technologies: ['Flask', 'React', 'Docker', 'GCP', 'Python'],
    image: '/placeholder.svg?height=200&width=400',
    github: 'https://github.com/AjayGanesh02/wordhunt-solver',
    demo: 'https://wordhunt.ajayganesh.com',
    language: 'Python',
  },
]

export default Projects
