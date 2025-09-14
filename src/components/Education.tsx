import { GraduationCap, Building, MapPin, Calendar, ExternalLinkIcon } from "lucide-react";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import kthLogo from "@/assets/kth-logo.png";

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
  const { track } = useTrackEvent();
  return (
    <section id="education" className="py-16 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Education
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            My academic background that shaped my technical expertise.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Academic Education</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 sm:mx-0">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className="card-gradient rounded-xl p-6 shadow-medium hover-lift h-full flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 relative">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                      {edu.degree}
                    </h3>
                    <a 
                      href="https://www.kth.se/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('institution_name_click', { institution: edu.school, source: 'education_section' })}
                      className="text-primary font-medium hover:text-primary/80 transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      {edu.school}
                      <ExternalLinkIcon className="h-3 w-3" />
                    </a>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mt-2 sm:mt-0">
                    Master's/Bachelor's
                  </span>
                </div>
                
                <div className="flex flex-col gap-2 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm">Completed</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                  {edu.description}
                </p>
                
                <div className="mt-auto">
                  <h5 className="text-sm font-semibold text-foreground mb-2">Key Coursework</h5>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded h-6 flex items-center"
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