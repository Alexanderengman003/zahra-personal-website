import { MapPin, Calendar, Building, Grid, List, ExternalLinkIcon } from "lucide-react";
import { useState } from "react";
import { useTrackEvent } from "@/hooks/useTrackEvent";

const voluntaryRoles = [
  {
    id: 1,
    title: "Mentor",
    organization: "CEMS - The Global Alliance in Management Education",
    location: "Education",
    period: "July 2019 – Current",
    duration: "6+ years",
    description: "Mentoring students and professionals in international management and business education as part of the global CEMS alliance.",
    type: "Education",
    achievements: [
      "Mentored students in international management",
      "Provided career guidance and professional development support",
      "Contributed to global education initiatives"
    ]
  },
  {
    id: 2,
    title: "Consultant",
    organization: "NGC - New Generation Consulting",
    location: "London, UK",
    period: "January 2018 – June 2018",
    duration: "6 months",
    description: "Pricing Strategy for a British peer-to-peer invoice financing company built on the Ethereum Blockchain.",
    type: "Consulting",
    achievements: [
      "Developed pricing strategy for blockchain-based fintech company",
      "Analyzed peer-to-peer invoice financing market",
      "Provided strategic consulting on Ethereum blockchain implementation"
    ]
  },
  {
    id: 3,
    title: "Teacher Assistant",
    organization: "Sharif University of Technology",
    location: "Tehran, Iran",
    period: "January 2012 – May 2017",
    duration: "5+ years",
    description: "Teaching assistant for various courses, focusing on entrepreneurship and business education.",
    type: "Education",
    achievements: [
      "Assisted in teaching entrepreneurship courses for 6 semesters",
      "Supported students in academic and practical learning",
      "Contributed to curriculum development and course materials"
    ]
  }
];

export function VoluntaryWork() {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const { track } = useTrackEvent();

  return (
    <section id="voluntary" className="py-16 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Voluntary Work
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            My contributions to education, mentoring, and consulting through voluntary engagements.
          </p>
        </div>

        <div className="mx-auto max-w-7xl mt-8">
          <div className="flex items-center justify-end mb-8">
            <div className="inline-flex rounded-lg bg-muted p-1">
              <button
                onClick={() => {
                  track('voluntary_view_toggle', { 
                    viewMode: 'card', 
                    previousMode: viewMode,
                    source: 'voluntary_section',
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
                  track('voluntary_view_toggle', { 
                    viewMode: 'list', 
                    previousMode: viewMode,
                    source: 'voluntary_section',
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
          
          <div className={viewMode === 'card' ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"}>
            {voluntaryRoles.map((role, index) => (
              <div
                key={role.id}
                className={`card-gradient rounded-xl shadow-medium hover-lift ${viewMode === 'card' ? 'h-full flex flex-col p-6' : 'p-4'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {viewMode === 'card' ? (
                  // Card View - Full Information
                  <>
                    <div className="flex flex-col mb-4">
                      <h4 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                        {role.title}
                      </h4>
                      <div className="flex flex-col gap-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <a 
                            href={role.organization.includes('CEMS') ? 'https://www.cems.org/' : role.organization.includes('Sharif') ? 'https://www.sharif.edu/' : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('voluntary_org_click', { organization: role.organization, source: 'voluntary_section' })}
                            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            {role.organization}
                            {(role.organization.includes('CEMS') || role.organization.includes('Sharif')) && (
                              <ExternalLinkIcon className="h-3 w-3" />
                            )}
                          </a>
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
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                      {role.description}
                    </p>
                    
                    <div className="mt-auto">
                      <h5 className="text-sm font-semibold text-foreground mb-2">Key Contributions</h5>
                      <ul className="space-y-1">
                        {role.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary text-xs mt-1">•</span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  // List View - Basic Information Only
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground leading-tight mb-1">
                        {role.title}
                      </h4>
                      <div className="flex flex-col gap-1 text-muted-foreground">
                        <a 
                          href={role.organization.includes('CEMS') ? 'https://www.cems.org/' : role.organization.includes('Sharif') ? 'https://www.sharif.edu/' : '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track('voluntary_org_click', { organization: role.organization, source: 'voluntary_section' })}
                          className="text-sm font-medium hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Building className="h-3 w-3" />
                          {role.organization}
                          {(role.organization.includes('CEMS') || role.organization.includes('Sharif')) && (
                            <ExternalLinkIcon className="h-3 w-3" />
                          )}
                        </a>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="text-sm">{role.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span className="text-sm">{role.period}</span>
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