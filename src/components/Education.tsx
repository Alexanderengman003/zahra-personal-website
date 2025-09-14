import { GraduationCap } from "lucide-react";

const education = [
  {
    id: 1,
    degree: "Master of Science in Nanotechnology",
    school: "KTH Royal Institute of Technology",
    location: "Stockholm, Sweden",
    period: "2018 - 2020",
    description: "Engineering studies within the field of Nanotechnology, with a nanoelectronics track. Completed thesis on stretchable microsupercapacitors.",
    coursework: ["Quantum Physics", "Semiconductor Devices", "Microfabrication", "Microsystem Technology", "Electronics"]
  },
  {
    id: 2,
    degree: "Bachelor of Science in Materials Science and Engineering",
    school: "KTH Royal Institute of Technology",
    location: "Stockholm, Sweden",
    period: "2015-2018",
    description: "Studies focused on material properties at the nano and microstructure levels.",
    coursework: ["Mathematics", "Physics", "Material Chemistry", "Polymers", "Ceramics", "Metals"]
  } 
];

export function Education() {
  return (
    <section id="education" className="section-spacing bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="section-header">Education</h2>
          <p className="section-subheader">
            My academic background that shaped my technical expertise.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h3 className="card-title">Academic Education</h3>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className="card-gradient rounded-xl card-spacing shadow-medium hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
                  <div className="flex-1">
                    <h4 className="card-title mb-2">
                      {edu.degree}
                    </h4>
                    <p className="card-subtitle mb-2">{edu.school}</p>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <span>{edu.location}</span>
                      <span className="text-primary font-medium">{edu.period}</span>
                    </div>
                  </div>
                </div>
                
                <p className="card-description mb-4 sm:mb-6">
                  {edu.description}
                </p>
                
                <div>
                  <h5 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">Key Coursework</h5>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="inline-flex items-center px-2 py-1 rounded text-xs sm:text-sm bg-accent text-accent-foreground"
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
      </div>
    </section>
  );
}