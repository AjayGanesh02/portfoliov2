import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Hi, I'm John Doe</span>
            <span className="block text-blue-600">Software Engineer at Meta</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Building scalable systems and innovative solutions. Passionate about web technologies and artificial intelligence.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-72 md:h-96 lg:relative lg:w-96 lg:h-96 lg:mx-auto mt-8">
        <Image
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4123.JPG-CeEJeJKD2IpMcOTLOoWaAqkmLi5aC9.jpeg"
          alt="Professional headshot"
          width={500}
          height={600}
        />
      </div>
    </div>
  )
}

export default Hero

