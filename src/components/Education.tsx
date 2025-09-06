import { GraduationCap, Award, BookOpen } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Education() {
  const { t } = useLanguage();
  
  const education = [
    {
      id: 1,
      degree: "Master of Science in Engineering Physics - Nanotechnology",
      school: "KTH Royal Institute of Technology",
      location: "Stockholm, Sweden",
      period: "2019 - 2021",
      gpa: "4.2/5.0",
      description: "Specialized in nanotechnology, materials science, and advanced semiconductor physics. Completed thesis on novel materials for next-generation electronic devices.",
      coursework: ["Nanotechnology", "Quantum Physics", "Materials Science", "Semiconductor Devices", "Advanced Characterization"]
    },
    {
      id: 2,
      degree: "Bachelor of Science in Materials Science and Engineering",
      school: "KTH Royal Institute of Technology",
      location: "Stockholm, Sweden",
      period: "2016 - 2019",
      gpa: "4.0/5.0",
      description: "Comprehensive study of materials properties, processing, and applications. Strong foundation in chemistry, physics, and engineering fundamentals.",
      coursework: ["Materials Chemistry", "Solid State Physics", "Materials Processing", "Characterization Methods", "Engineering Mathematics"]
    }
  ];

  const certifications = [
    {
      title: "ISO 13485 Medical Devices Quality Management",
      issuer: "International Organization for Standardization",
      date: "2023",
      credential: "ISO-13485-2023"
    },
    {
      title: "IEC 60601-1 Medical Electrical Equipment",
      issuer: "International Electrotechnical Commission",
      date: "2022",
      credential: "IEC-60601-2022"
    },
    {
      title: "Clean Room Operations Certification",
      issuer: "Semiconductor Industry Association",
      date: "2021",
      credential: "SIA-CR-2021"
    }
  ];
  
  return (
    <section id="education" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("educationTitle")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("educationDescription")}
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Education Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">{t("academicEducation")}</h3>
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
                <h3 className="text-xl font-semibold text-foreground">{t("certifications")}</h3>
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
                  {t("continuousLearning")}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("continuousLearningDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}