import { Badge } from '@/components/ui/badge'

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Skills</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Technical Expertise
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Here are some of the technologies and tools I specialize in.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10">
            {skillCategories.map((category, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const skillCategories = [
  {
    name: 'Programming Languages',
    skills: ['Python', 'C++', 'Rust', 'Go', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    name: 'Frontend Technologies',
    skills: ['React', 'Next.js'],
  },
  {
    name: 'Backend Technologies',
    skills: ['Node.js', 'Flask'],
  },
  {
    name: 'Databases',
    skills: ['MongoDB', 'PostgreSQL'],
  },
  {
    name: 'DevOps & Cloud',
    skills: ['Docker', 'AWS', 'Google Cloud Platform', 'Linux'],
  },
  {
    name: 'Tools & Methodologies',
    skills: ['Git', 'Agile', 'Scrum', 'REST APIs'],
  },
]

export default Skills

