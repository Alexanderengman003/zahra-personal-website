import { MapPin, Calendar, Building } from "lucide-react";
import { useState } from "react";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import ascilionLogo from "@/assets/ascilion-logo.png";

const professionalRoles = [
  {
    id: 1,
    title: "Technical Account Manager",
    company: "EBV Elektronik",
    location: "Stockholm, SWEDEN",
    period: "June 2025 – Currently ongoing",
    description: "Account manager within semiconductors and electronic components providing technical support for new and existing customers.",
    technologies: ["Semiconductors", "Electronic Components", "Customer Relations"],
    achievements: [
      "Account manager within semiconductors and electronic components",
      "Technical support for new and existing customers",
      "Business development and other related activities"
    ],
    area: "Sales"
  },
  {
    id: 2,
    title: "Application Engineer",
    company: "Exeger Operations AB",
    location: "Stockholm, SWEDEN",
    period: "October 2024 – June 2025",
    description: "Development of prototypes and products for customer applications with focus on electrical design and rapid prototyping.",
    technologies: ["Product Development", "Electrical Design", "Rapid Prototyping"],
    achievements: [
      "Development of prototypes and products for customer applications",
      "Electrical design and rapid prototyping for product development",
      "Technical sales and customer support"
    ],
    area: "Engineering,Sales"
  },
  {
    id: 3,
    title: "Application Specialist",
    company: "Ascilion AB",
    location: "Stockholm, SWEDEN",
    period: "January 2024 – October 2024",
    description: "R&D and product development with focus on medical device development following ISO standards.",
    technologies: ["R&D", "Medical Devices", "ISO 13485", "IEC 60601-1", "IEC 62304"],
    achievements: [
      "R&D and product development/design",
      "Technical sales and business development",
      "Medical device product development (ISO 13485, IEC 60601-1, IEC 62304)"
    ],
    area: "Engineering,Sales"
  },
  {
    id: 4,
    title: "Development Engineer",
    company: "Ascilion AB",
    location: "Stockholm, SWEDEN",
    period: "February 2021 – January 2024",
    description: "SPC, AOI and development of semiconductor components with focus on software and hardware development.",
    technologies: ["SPC", "AOI", "Semiconductors", "Software Development", "Hardware Development"],
    achievements: [
      "SPC, AOI and development of semiconductor components",
      "Software and hardware development",
      "Development and design of test systems and experiments"
    ],
    area: "Engineering"
  },
  {
    id: 5,
    title: "Process Engineer",
    company: "Bright Day Graphene AB",
    location: "Stockholm, SWEDEN",
    period: "June 2020 – January 2021",
    description: "Process development and scaling of manufacturing with focus on electrochemistry and materials characterization.",
    technologies: ["Process Development", "Manufacturing", "Electrochemistry", "Materials Characterization"],
    achievements: [
      "Process development and scaling of manufacturing",
      "Process design and analysis",
      "Electrochemistry and materials characterization"
    ],
    area: "Engineering"
  }
];

export function Professional() {
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const { track } = useTrackEvent();
  
  const areas = ["All", "Engineering", "Sales"];
  const filteredRoles = selectedArea === "All" 
    ? professionalRoles 
    : professionalRoles.filter(role => role.area.includes(selectedArea));

  return (
    <section id="professional" className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Professional Experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A journey through my professional career in semiconductor engineering and technology development.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-muted p-1">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => {
                  track('professional_filter_click', { area, source: 'professional_section' });
                  setSelectedArea(area);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedArea === area
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Professional Roles */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredRoles.map((role, index) => (
              <div
                key={role.id}
                className="card-gradient rounded-2xl pt-12 px-8 pb-8 shadow-medium hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Role Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 relative">
                  {/* Current Role Badge */}
                  {role.period.includes("Currently ongoing") && (
                    <div className="absolute -top-8 -right-2 z-10">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Currently ongoing
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 leading-tight flex items-center gap-2">
                      {role.title}
                      {role.company === "Ascilion AB" && (
                        <img 
                          src={ascilionLogo} 
                          alt="Ascilion" 
                          className="h-5 w-5 rounded-sm"
                        />
                      )}
                    </h3>
                    <div className="flex flex-col gap-2 text-muted-foreground">
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
                  <h4 className="text-sm font-semibold text-foreground mb-3">Skills Used</h4>
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