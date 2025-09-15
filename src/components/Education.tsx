import { Building, MapPin, Calendar, ExternalLinkIcon, Grid, List } from "lucide-react";
import { useState } from "react";
import { useTrackEvent } from "@/hooks/useTrackEvent";


const education = [
  {
    id: 1,
    degree: "Master of Science in International Management",
    school: "CEMS - The Global Alliance in Management Education",
    location: "Stockholm, Sweden",
    period: "2017 - 2019",
    description: "Part of the CEMS global alliance, focusing on international management and cross-cultural business practices.",
    coursework: ["International Management", "Cross-Cultural Business", "Global Strategy", "Leadership", "Corporate Finance"]
  },
  {
    id: 2,
    degree: "Master of Science in International Business",
    school: "Stockholm School of Economics",
    location: "Stockholm, Sweden", 
    period: "2017 - 2019",
    description: "Comprehensive business education focusing on international markets and global business strategies.",
    coursework: ["International Business", "Global Markets", "Strategic Management", "Business Analytics", "Marketing"]
  },
  {
    id: 3,
    degree: "Master of Business Administration",
    school: "Sharif University of Technology",
    location: "Tehran, Iran",
    period: "2013 - 2016",
    description: "MBA with focus on business administration and entrepreneurship. Served as Teachers' Assistant for Entrepreneurship for 6 semesters.",
    coursework: ["Entrepreneurship", "Business Strategy", "Operations Management", "Finance", "Marketing", "Leadership"]
  },
  {
    id: 4,
    degree: "Bachelor of Science in Industrial Engineering",
    school: "Sharif University of Technology",
    location: "Tehran, Iran",
    period: "2009 - 2013",
    description: "Industrial Engineering with strong foundation in operations research, systems engineering, and management.",
    coursework: ["Operations Research", "Systems Engineering", "Production Planning", "Quality Control", "Statistics", "Management"]
  }
];

export function Education() {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const { track } = useTrackEvent();
  return (
    <section id="education" className="py-16 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Education
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            My academic journey across international business and engineering disciplines.
          </p>
        </div>

        <div className="mx-auto max-w-7xl mt-8">
          <div className="flex items-center justify-end mb-8">
            <div className="inline-flex rounded-lg bg-muted p-1">
              <button
                onClick={() => {
                  track('education_view_toggle', { 
                    viewMode: 'card', 
                    previousMode: viewMode,
                    source: 'education_section',
                    timestamp: Date.now(),
                    sessionDuration: performance.now()
                  });
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
                  track('education_view_toggle', { 
                    viewMode: 'list', 
                    previousMode: viewMode,
                    source: 'education_section',
                    timestamp: Date.now(),
                    sessionDuration: performance.now()
                  });
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
          
          <div className={viewMode === 'card' ? "grid grid-cols-1 xl:grid-cols-2 gap-8" : "space-y-4"}>
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`card-gradient rounded-xl shadow-medium hover-lift ${viewMode === 'card' ? 'h-full flex flex-col px-2 py-6' : 'p-2'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {viewMode === 'card' ? (
                  // Card View - Full Information
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 relative">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                          {edu.degree}
                        </h4>
                        <div className="flex flex-col gap-2 text-muted-foreground">
                           <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <a 
                              href={edu.school.includes('CEMS') ? 'https://www.cems.org/' : edu.school.includes('Handelshögskolan') ? 'https://www.hhs.se/' : 'https://www.sharif.edu/'}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => track('institution_name_click', { institution: edu.school, source: 'education_section' })}
                              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1"
                            >
                              {edu.school}
                              <ExternalLinkIcon className="h-3 w-3" />
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{edu.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{edu.period}</span>
                          </div>
                        </div>
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
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                      {(edu as any).activities && (
                        <div className="mt-4">
                          <h5 className="text-sm font-semibold text-foreground mb-2">Activities & Organizations</h5>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {(edu as any).activities.map((activity: string, idx: number) => (
                              <li key={idx} className="leading-relaxed">• {activity}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  // List View - Basic Information Only
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-1 leading-tight">
                        {edu.degree}
                      </h4>
                      <div className="flex flex-col gap-1 text-muted-foreground">
                        <a 
                          href={edu.school.includes('CEMS') ? 'https://www.cems.org/' : edu.school.includes('Handelshögskolan') ? 'https://www.hhs.se/' : 'https://www.sharif.edu/'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track('institution_name_click', { institution: edu.school, source: 'education_section' })}
                          className="text-sm font-medium hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Building className="h-3 w-3" />
                          {edu.school}
                          <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span className="text-sm">{edu.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}