import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <Link href="https://github.com/johndoe" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </Link>
          <Link href="https://linkedin.com/in/johndoe" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href="https://twitter.com/johndoe" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 text-center">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} John Doe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

