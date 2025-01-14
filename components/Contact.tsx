import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Contact</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Get in Touch
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="mt-10 lg:mt-20 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input id="name" name="name" type="text" required className="mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input id="email" name="email" type="email" required className="mt-1" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea id="message" name="message" rows={4} required className="mt-1" />
              </div>
              <div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-blue-600" />
                <span className="ml-3 text-gray-700">john.doe@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-blue-600" />
                <span className="ml-3 text-gray-700">+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span className="ml-3 text-gray-700">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

