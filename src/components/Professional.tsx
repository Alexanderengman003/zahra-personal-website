import { MapPin, Calendar, Building } from "lucide-react";

const professionalRoles = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovation Corp",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: "Lead development of scalable web applications serving 100k+ users. Architected microservices infrastructure and mentored junior developers.",
    technologies: ["React", "Node.js", "AWS", "PostgreSQL", "TypeScript"],
    achievements: [
      "Reduced application load time by 40% through optimization",
      "Led a team of 5 developers on critical product features",
      "Implemented CI/CD pipelines improving deployment frequency by 300%"
    ]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Inc",
    location: "New York, NY",
    period: "2020 - 2022",
    description: "Developed and maintained full-stack applications for e-commerce and fintech clients. Collaborated with cross-functional teams to deliver high-quality solutions.",
    technologies: ["Vue.js", "Python", "Django", "MySQL", "Docker"],
    achievements: [
      "Built payment processing system handling $2M+ monthly transactions",
      "Developed real-time analytics dashboard for client insights",
      "Achieved 99.9% uptime for critical client applications"
    ]
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Creative Web Studio",
    location: "Austin, TX",
    period: "2019 - 2020",
    description: "Created responsive web interfaces and interactive user experiences. Worked closely with designers to implement pixel-perfect designs.",
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Sass"],
    achievements: [
      "Improved user engagement by 60% through UX improvements",
      "Delivered 15+ client projects on time and under budget",
      "Established component library used across multiple projects"
    ]
  }
];

export function Professional() {
  return (
    <section id="professional" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Professional Experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A journey through my professional career, building innovative solutions and leading teams.
          </p>
        </div>

        {/* Professional Roles */}
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            {professionalRoles.map((role, index) => (
              <div
                key={role.id}
                className="card-gradient rounded-2xl p-8 shadow-medium hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Role Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {role.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span className="text-sm font-medium">{role.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{role.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{role.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {role.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {role.achievements.map((achievement, achievementIndex) => (
                      <li
                        key={achievementIndex}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}