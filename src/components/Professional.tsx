import { MapPin, Calendar, Building, Grid, List, ExternalLinkIcon } from "lucide-react";
import { useState } from "react";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import ascilionLogo from "@/assets/ascilion-logo.png";
import brightDayGrapheneLogo from "@/assets/bright-day-graphene-logo.png";
import exegerLogo from "@/assets/exeger-logo.png";
import ebvLogo from "@/assets/ebv-logo.png";

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
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
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

        {/* Filter and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
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
          
          <div className="inline-flex rounded-lg bg-muted p-1">
            <button
              onClick={() => {
                track('professional_view_toggle', { viewMode: 'card', source: 'professional_section' });
                setViewMode('card');
              }}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                viewMode === 'card'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                track('professional_view_toggle', { viewMode: 'list', source: 'professional_section' });
                setViewMode('list');
              }}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                viewMode === 'list'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Professional Roles Grid/List */}
        <div className={`mx-auto mt-16 max-w-7xl ${viewMode === 'card' ? 'grid grid-cols-1 gap-8 lg:grid-cols-2' : 'space-y-4'}`}>
          {filteredRoles.map((role, index) => (
            <div
              key={role.id}
              className={`card-gradient rounded-xl overflow-hidden shadow-medium hover-lift group ${
                viewMode === 'card' 
                  ? 'h-full flex flex-col p-6' 
                  : 'flex flex-col sm:flex-row gap-4 p-4 mx-4 sm:mx-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Current Role Badge */}
              {role.period.includes("Currently ongoing") && (
                <div className={`absolute ${viewMode === 'card' ? '-top-2 -right-2' : '-top-2 -right-2'} z-10`}>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Currently ongoing
                  </span>
                </div>
              )}

              {/* Company Logo */}
              <div className={`${
                viewMode === 'card' 
                  ? 'aspect-video mb-4' 
                  : 'w-full sm:w-16 aspect-video sm:aspect-square'
              } bg-muted relative overflow-hidden flex-shrink-0 flex items-center justify-center p-2 rounded-lg`}>
                {role.company === "EBV Elektronik" && (
                  <a 
                    href="https://my.avnet.com/ebv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('company_logo_click', { company: 'EBV Elektronik', source: 'professional_section' })}
                    className="hover:opacity-80 transition-opacity h-full w-full flex items-center justify-center"
                  >
                    <img 
                      src={ebvLogo} 
                      alt="EBV Elektronik" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </a>
                )}
                {role.company === "Ascilion AB" && (
                  <a 
                    href="https://www.ascilion.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('company_logo_click', { company: 'Ascilion AB', source: 'professional_section' })}
                    className="hover:opacity-80 transition-opacity h-full w-full flex items-center justify-center"
                  >
                    <img 
                      src={ascilionLogo} 
                      alt="Ascilion" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </a>
                )}
                {role.company === "Bright Day Graphene AB" && (
                  <a 
                    href="https://www.brightdaygraphene.se/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('company_logo_click', { company: 'Bright Day Graphene AB', source: 'professional_section' })}
                    className="hover:opacity-80 transition-opacity h-full w-full flex items-center justify-center"
                  >
                    <img 
                      src={brightDayGrapheneLogo} 
                      alt="Bright Day Graphene" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </a>
                )}
                {role.company === "Exeger Operations AB" && (
                  <a 
                    href="https://www.exeger.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('company_logo_click', { company: 'Exeger Operations AB', source: 'professional_section' })}
                    className="hover:opacity-80 transition-opacity h-full w-full flex items-center justify-center"
                  >
                    <img 
                      src={exegerLogo} 
                      alt="Exeger" 
                      className="max-h-full max-w-full object-contain dark:invert"
                    />
                  </a>
                )}
              </div>

              {/* Role Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className={`${viewMode === 'card' ? 'text-lg' : 'text-base'} font-semibold text-foreground group-hover:text-primary transition-colors leading-tight ${viewMode === 'list' ? 'mb-1' : 'mb-2'}`}>
                      {role.title}
                    </h3>
                    <a 
                      href={
                        role.company === "EBV Elektronik" ? "https://my.avnet.com/ebv/" :
                        role.company === "Ascilion AB" ? "https://www.ascilion.com/" :
                        role.company === "Bright Day Graphene AB" ? "https://www.brightdaygraphene.se/" :
                        role.company === "Exeger Operations AB" ? "https://www.exeger.com/" :
                        "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('company_name_click', { company: role.company, source: 'professional_section' })}
                      className="text-primary font-medium hover:text-primary/80 transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      {role.company}
                      <ExternalLinkIcon className="h-3 w-3" />
                    </a>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {role.area}
                  </span>
                </div>
                
                {viewMode === 'card' && (
                  <div className="flex flex-col gap-2 text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{role.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{role.period}</span>
                    </div>
                  </div>
                )}

                {viewMode === 'list' && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground mb-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{role.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{role.location}</span>
                    </div>
                  </div>
                )}
                
                <p className={`text-sm text-muted-foreground leading-relaxed ${
                  viewMode === 'card' 
                    ? 'mb-4 flex-grow min-h-[5rem]' 
                    : 'mb-3 line-clamp-2'
                }`}>
                  {viewMode === 'list' 
                    ? role.description.length > 120 
                      ? role.description.substring(0, 120) + '...'
                      : role.description
                    : role.description
                  }
                </p>

                {/* Technologies */}
                {viewMode === 'card' && (
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-foreground mb-2">Technologies</h5>
                    <div className="flex flex-wrap gap-1">
                      {role.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded h-6 flex items-center"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {viewMode === 'list' && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {role.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded h-6 flex items-center"
                        >
                          {tech}
                        </span>
                      ))}
                      {role.technologies.length > 3 && (
                        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded h-6 flex items-center">
                          +{role.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {viewMode === 'card' && (
                  <div className="mt-auto">
                    <h5 className="text-sm font-semibold text-foreground mb-2">Key Achievements</h5>
                    <ul className="space-y-1">
                      {role.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {viewMode === 'list' && (
                  <div>
                    <ul className="space-y-1">
                      {role.achievements.slice(0, 1).map((achievement, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}