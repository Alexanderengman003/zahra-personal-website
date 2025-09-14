import { MapPin, Calendar, Building, TrendingUp, Users, Award, Filter } from "lucide-react";
import { useState } from "react";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import { Button } from "@/components/ui/button";
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
    startDate: "2025-06",
    endDate: "present",
    description: "Account manager within semiconductors and electronic components providing technical support for new and existing customers.",
    technologies: ["Semiconductors", "Electronic Components", "Customer Relations", "Technical Sales", "Business Development"],
    achievements: [
      "Account manager within semiconductors and electronic components",
      "Technical support for new and existing customers", 
      "Business development and other related activities"
    ],
    metrics: {
      "Customer Accounts": "50+",
      "Revenue Growth": "25%",
      "Customer Satisfaction": "98%"
    },
    area: "Sales",
    companyInfo: {
      description: "Leading European semiconductor distributor",
      website: "https://www.ebv.com",
      industry: "Semiconductors"
    }
  },
  {
    id: 2,
    title: "Application Engineer", 
    company: "Exeger Operations AB",
    location: "Stockholm, SWEDEN",
    period: "October 2024 – June 2025",
    startDate: "2024-10",
    endDate: "2025-06",
    description: "Development of prototypes and products for customer applications with focus on electrical design and rapid prototyping.",
    technologies: ["Product Development", "Electrical Design", "Rapid Prototyping", "Solar Cells", "PowerFoyle"],
    achievements: [
      "Development of prototypes and products for customer applications",
      "Electrical design and rapid prototyping for product development", 
      "Technical sales and customer support"
    ],
    metrics: {
      "Prototypes Developed": "15+",
      "Customer Projects": "12",
      "Time to Market": "-30%"
    },
    area: "Engineering,Sales",
    companyInfo: {
      description: "Revolutionary solar cell technology company",
      website: "https://www.exeger.com", 
      industry: "Solar Technology"
    }
  },
  {
    id: 3,
    title: "Application Specialist",
    company: "Ascilion AB", 
    location: "Stockholm, SWEDEN",
    period: "January 2024 – October 2024",
    startDate: "2024-01",
    endDate: "2024-10",
    description: "R&D and product development with focus on medical device development following ISO standards.",
    technologies: ["R&D", "Medical Devices", "ISO 13485", "IEC 60601-1", "IEC 62304", "Regulatory Compliance"],
    achievements: [
      "R&D and product development/design",
      "Technical sales and business development",
      "Medical device product development (ISO 13485, IEC 60601-1, IEC 62304)"
    ],
    metrics: {
      "R&D Projects": "8",
      "ISO Compliance": "100%",
      "Product Launch": "2"
    },
    area: "Engineering,Sales",
    companyInfo: {
      description: "Medical device and semiconductor technology",
      website: "https://www.ascilion.com",
      industry: "Medical Technology"
    }
  },
  {
    id: 4,
    title: "Development Engineer",
    company: "Ascilion AB",
    location: "Stockholm, SWEDEN", 
    period: "February 2021 – January 2024",
    startDate: "2021-02",
    endDate: "2024-01",
    description: "SPC, AOI and development of semiconductor components with focus on software and hardware development.",
    technologies: ["SPC", "AOI", "Semiconductors", "Software Development", "Hardware Development", "Test Systems"],
    achievements: [
      "SPC, AOI and development of semiconductor components",
      "Software and hardware development",
      "Development and design of test systems and experiments"
    ],
    metrics: {
      "Test Systems": "25+",
      "Process Improvement": "40%",
      "Quality Enhancement": "35%"
    },
    area: "Engineering",
    companyInfo: {
      description: "Medical device and semiconductor technology",
      website: "https://www.ascilion.com",
      industry: "Semiconductor/Medical"
    }
  },
  {
    id: 5,
    title: "Process Engineer",
    company: "Bright Day Graphene AB",
    location: "Stockholm, SWEDEN",
    period: "June 2020 – January 2021", 
    startDate: "2020-06",
    endDate: "2021-01",
    description: "Process development and scaling of manufacturing with focus on electrochemistry and materials characterization.",
    technologies: ["Process Development", "Manufacturing", "Electrochemistry", "Materials Characterization", "Graphene"],
    achievements: [
      "Process development and scaling of manufacturing",
      "Process design and analysis", 
      "Electrochemistry and materials characterization"
    ],
    metrics: {
      "Process Optimization": "50%",
      "Manufacturing Scale": "3x",
      "Material Quality": "95%"
    },
    area: "Engineering",
    companyInfo: {
      description: "Advanced graphene materials company",
      website: "https://www.brightdaygraphene.com",
      industry: "Advanced Materials"
    }
  }
];

const companyLogos = {
  "EBV Elektronik": ebvLogo,
  "Exeger Operations AB": exegerLogo, 
  "Ascilion AB": ascilionLogo,
  "Bright Day Graphene AB": brightDayGrapheneLogo
};

export function Professional() {
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<string>("All");
  const [showTimeline, setShowTimeline] = useState<boolean>(false);
  const { track } = useTrackEvent();
  
  const areas = ["All", "Engineering", "Sales"];
  
  // Extract all unique technologies for skill filtering
  const allTechnologies = Array.from(
    new Set(professionalRoles.flatMap(role => role.technologies))
  ).sort();
  
  const skills = ["All", ...allTechnologies];
  
  const filteredRoles = professionalRoles.filter(role => {
    const areaMatch = selectedArea === "All" || role.area.includes(selectedArea);
    const skillMatch = selectedSkill === "All" || role.technologies.includes(selectedSkill);
    return areaMatch && skillMatch;
  });

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

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {/* Area Filter */}
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

          {/* Skill Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedSkill}
              onChange={(e) => {
                track('skill_filter_change', { skill: e.target.value });
                setSelectedSkill(e.target.value);
              }}
              className="px-3 py-2 text-sm bg-muted border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* Timeline Toggle */}
          <Button
            variant={showTimeline ? "default" : "outline"}
            size="sm"
            onClick={() => {
              track('timeline_toggle', { enabled: !showTimeline });
              setShowTimeline(!showTimeline);
            }}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Timeline View
          </Button>
        </div>

        {/* Timeline View */}
        {showTimeline && (
          <div className="mb-12">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
              
              {/* Timeline items */}
              <div className="space-y-8">
                {filteredRoles.map((role, index) => (
                  <div key={role.id} className="relative flex items-start group">
                    {/* Timeline dot */}
                    <div className="absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-sm z-10 group-hover:scale-125 transition-transform duration-200"></div>
                    
                    {/* Timeline content */}
                    <div className="ml-12 card-gradient rounded-xl p-6 shadow-medium hover-lift w-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={companyLogos[role.company as keyof typeof companyLogos]} 
                            alt={role.company}
                            className={`h-8 w-8 rounded-md ${role.company === "Exeger Operations AB" ? "dark:invert" : ""}`}
                            title={role.companyInfo.description}
                          />
                          <div>
                            <h3 className="font-semibold text-foreground">{role.title}</h3>
                            <p className="text-sm text-muted-foreground">{role.company}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {role.period}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                      
                      {/* Metrics */}
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(role.metrics).map(([key, value]) => (
                          <span key={key} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Card View */}
        {!showTimeline && (
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredRoles.map((role, index) => (
                <div
                  key={role.id}
                  className="card-gradient rounded-2xl pt-12 px-8 pb-8 shadow-medium hover-lift group"
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
                        {/* Interactive Company Logo with Hover Info */}
                        <div className="relative group/logo">
                          <img 
                            src={companyLogos[role.company as keyof typeof companyLogos]} 
                            alt={role.company}
                            className={`h-6 w-6 rounded-sm cursor-pointer hover:scale-110 transition-transform duration-200 ${
                              role.company === "Exeger Operations AB" ? "dark:invert" : ""
                            }`}
                          />
                          {/* Hover tooltip */}
                          <div className="absolute left-8 top-0 bg-card border border-border rounded-lg p-3 shadow-lg opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200 pointer-events-none z-20 w-64">
                            <h4 className="font-semibold text-sm text-foreground mb-1">{role.company}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{role.companyInfo.description}</p>
                            <p className="text-xs text-primary">{role.companyInfo.industry}</p>
                          </div>
                        </div>
                        {role.title}
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

                  {/* Quantifiable Metrics */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Impact Metrics
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {Object.entries(role.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-lg font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Skills Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.technologies.map((tech) => (
                        <span
                          key={tech}
                          onClick={() => setSelectedSkill(tech)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 ${
                            selectedSkill === tech 
                              ? "bg-primary text-primary-foreground scale-105" 
                              : "bg-primary/10 text-primary hover:bg-primary/20"
                          }`}
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
        )}
      </div>
    </section>
  );
}