import { GraduationCap, Award, BookOpen } from "lucide-react";

const education = [
  {
    id: 1,
    degree: "Master of Science in Computer Science",
    school: "Stanford University",
    location: "Stanford, CA",
    period: "2017 - 2019",
    gpa: "3.9/4.0",
    description: "Specialized in Software Engineering and Machine Learning. Completed thesis on distributed systems optimization.",
    coursework: ["Advanced Algorithms", "Machine Learning", "Distributed Systems", "Software Engineering", "Database Systems"]
  },
  {
    id: 2,
    degree: "Bachelor of Science in Computer Engineering",
    school: "University of California, Berkeley",
    location: "Berkeley, CA",
    period: "2013 - 2017",
    gpa: "3.7/4.0",
    description: "Graduated Magna Cum Laude with focus on software development and computer systems architecture.",
    coursework: ["Data Structures", "Computer Architecture", "Operating Systems", "Web Development", "Mathematics"]
  }
];

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    credential: "AWS-SAA-123456"
  },
  {
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2022",
    credential: "GCP-PD-789012"
  },
  {
    title: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2022",
    credential: "CKA-345678"
  }
];

export function Education() {
  return (
    <section id="education" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Education & Certifications
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            My academic background and professional certifications that shaped my technical expertise.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Education Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Academic Education</h3>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="card-gradient rounded-xl p-6 shadow-medium hover-lift"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-1">
                          {edu.degree}
                        </h4>
                        <p className="text-primary font-medium">{edu.school}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mt-1">
                          <span>{edu.location}</span>
                          <span>•</span>
                          <span>{edu.period}</span>
                          <span>•</span>
                          <span className="font-medium">GPA: {edu.gpa}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {edu.description}
                    </p>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-foreground mb-2">Key Coursework</h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="inline-flex items-center px-2 py-1 rounded text-xs bg-accent text-accent-foreground"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <Award className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Certifications</h3>
              </div>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.title}
                    className="card-gradient rounded-lg p-4 shadow-subtle hover-lift"
                    style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-primary font-medium mb-1">
                          {cert.issuer}
                        </p>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <span>Issued: {cert.date}</span>
                          <span className="font-mono">{cert.credential}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Additional Info */}
              <div className="mt-6 card-gradient rounded-lg p-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Continuous Learning
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Actively pursuing additional certifications in cloud architecture, 
                  DevOps practices, and emerging technologies to stay current with 
                  industry trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}