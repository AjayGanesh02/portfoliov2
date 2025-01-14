import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Experience</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            My Professional Journey
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10">
            {experiences.map((experience, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{experience.role}</CardTitle>
                  <CardDescription>{experience.company} | {experience.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {experience.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="text-gray-600">{responsibility}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Meta',
    period: '2024 - Present',
    responsibilities: [
      'Lead development of scalable backend services using Python and Go',
      'Optimize database queries and implement caching strategies to improve application performance',
      'Collaborate with cross-functional teams to design and implement new features',
      'Mentor junior engineers and conduct code reviews',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Deepgram',
    period: 'May 2023 - Aug. 2023',
    responsibilities: [
      'Developed and deployed a Node.js backend service enabling speech recognition machine learning model usage on YouTube videos, used in a high-value client demo with potential revenue exceeding $100k',
      'Optimized code for a Rust web API handling authorization and billing for Deepgram\'s automatic speech recognition models, resulting in a 5 ms average decrease in response time and greater standardization of error messages',
      'Increased account signup conversions by 7% by implementing an IP caching system in Rust and deploying it to on-premises data centers, giving new users increased exposure to Deepgram\'s AI models',
    ],
  },
  {
    role: 'Student Security Engineer - UM MDP Program',
    company: 'Riot Games',
    period: 'Jan. 2023 - May 2024',
    responsibilities: [
      'Developed an extensible monitoring system using Python and Go to provide security engineers with real-time notifications for vulnerabilities in internal networks, contributing to increased operational efficiency',
      'Harnessed Amazon Web Services (Lambda, S3, CloudFormation) to create a deployment pipeline, allowing engineers to automatically deploy internal environment monitoring scripts in minutes',
      'Researched workflows with senior Information Security professionals to develop a continuous compliance dashboard in React, allowing executives to easily visualize the status of the organization\'s attack surface',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'CaringWire',
    period: 'Nov. 2021 - May 2022',
    responsibilities: [
      'Collaborated with senior developers and interns in an Agile environment to make updates and improvements to a web platform using Scrum ideologies, improving user experience for hundreds of caretakers and families',
      'Implemented features such as an auto-logout system, a database search autocomplete feature, and a cloud upload system for medical data, achieving HIPAA compliance and increasing usability for elderly consumers',
      'Improved a search feature by implementing a MongoDB data aggregation pipeline using TypeScript, leading to a 75% increase in quantity of accurate results delivered to users',
    ],
  },
]

export default Experience

