import { MapPin, Calendar, Building, Grid, List, ExternalLinkIcon, ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const professionalRoles = [
  {
    id: 1,
    title: "Senior Product Manager",
    company: "PayPal",
    logo: "/company-logos/paypal-logo.png",
    location: "Stockholm, Sweden",
    period: "October 2024 – Current",
    description: "Led a team of 20+ cross-functionally to unify PayPal and Zettle back-office experience across all markets.",
    technologies: ["Product Management", "Finance", "Product Vision", "Team Leadership", "Cross-functional Collaboration", "Stakeholder Management", "Business Strategy"],
    software: ["Salesforce", "Jira", "Confluence", "Analytics Tools"],
    achievements: [
      "Led team of 20+ professionals across multiple functions",
      "Unified PayPal and Zettle back-office experience",
      "Managed cross-market implementation strategy"
    ],
    area: "Product"
  },
  {
    id: 2,
    title: "Co-Founder",
    company: "Puls Health Research",
    logo: "/company-logos/puls-health-research.jpg",
    location: "Sweden",
    period: "May 2024 – April 2025",
    description: "Empowering patient-centric health research through innovative SaaS solutions.",
    technologies: ["Entrepreneurship", "Health Tech", "Product Development", "Business Strategy", "Software as a Service (SaaS)", "Business Planning"],
    software: ["SaaS Platforms", "Product Design Tools"],
    achievements: [
      "Co-founded health research platform",
      "Developed patient-centric research solutions",
      "Built SaaS product from ground up"
    ],
    area: "Product"
  },
  {
    id: 3,
    title: "Entrepreneur in Residence",
    company: "Antler",
    logo: "/company-logos/antler-logo.png",
    location: "Sweden",
    period: "February 2024 – June 2024",
    description: "Venture development and startup incubation focused on business strategy and product management.",
    technologies: ["Business Strategy", "Product Management", "Venture Development", "Startup Incubation", "Strategic Planning"],
    software: ["Business Planning Tools", "Market Research Platforms"],
    achievements: [
      "Developed venture strategies for early-stage startups",
      "Mentored entrepreneurs in product development",
      "Conducted market analysis and business planning"
    ],
    area: "Product"
  },
  {
    id: 4,
    title: "Product Manager and Team Lead",
    company: "Klarna",
    logo: "/company-logos/klarna-logo.png",
    location: "Stockholm, Sweden",
    period: "March 2022 – February 2024",
    description: "Led the Personal Finance Insight team, driving development and execution of innovative financial products that empowered users to make informed personal finance decisions.",
    technologies: ["Product Management", "Finance", "Product Launch", "Stakeholder Management", "Product Strategy", "Product Vision", "Software Product Management", "Performance Metrics", "Key Performance Indicators", "Market Analysis", "Agile Methodologies", "Leadership"],
    software: ["Analytics Platforms", "A/B Testing Tools", "Product Management Software", "Data Visualization Tools", "SQL", "Microsoft Excel", "Microsoft Power BI"],
    achievements: [
      "Led Personal Finance Insight team to successful product launches",
      "Developed innovative financial products and insights",
      "Drove user engagement through data-driven product decisions"
    ],
    area: "Product"
  },
  {
    id: 5,
    title: "Senior Product Analyst",
    company: "Klarna",
    logo: "/company-logos/klarna-logo.png",
    location: "Stockholm, Sweden", 
    period: "November 2020 – March 2022",
    description: "Analyzed personal finance products performance and provided strategic insights for product development.",
    technologies: ["Product Analysis", "Stakeholder Management", "Analytical Skills", "Performance Metrics", "Key Performance Indicators", "Agile Methodologies", "Data Analytics"],
    software: ["SQL", "Python", "Tableau", "Analytics Tools", "A/B Testing Platforms", "Microsoft Excel", "Business Intelligence (BI)"],
    achievements: [
      "Improved personal finance product performance through data analysis",
      "Provided strategic insights for product roadmap decisions",
      "Collaborated with cross-functional teams on product optimization"
    ],
    area: "Product"
  },
  {
    id: 6,
    title: "Business Analyst", 
    company: "Klarna",
    logo: "/company-logos/klarna-logo.png",
    location: "Stockholm, Sweden",
    period: "July 2019 – November 2020",
    description: "Supported business control and co-marketing teams with data analysis and performance insights.",
    technologies: ["Data Analysis", "Marketing Analytics", "Analytical Skills", "Performance Metrics", "Business Intelligence", "Marketing", "Digital Marketing"],
    software: ["SQL", "Excel", "Microsoft Power BI", "Marketing Analytics Tools", "Microsoft Office"],
    achievements: [
      "Enhanced business control processes through data analysis",
      "Supported co-marketing initiatives with performance insights", 
      "Developed reporting frameworks for business metrics"
    ],
    area: "Analytics"
  },
  {
    id: 7,
    title: "Business Controller",
    company: "H&M",
    logo: "/company-logos/hm-logo.png",
    location: "Sweden",
    period: "June 2018 – August 2018",
    description: "Reviewed, mapped, and evaluated 50+ high-level activities and processes in stores through creating a Power BI dashboard.",
    technologies: ["Business Analysis", "Process Analysis", "Product Analysis", "Data Visualization", "Business Intelligence", "Process Improvement"],
    software: ["Microsoft Power BI", "Microsoft Excel", "Data Analysis Tools", "Microsoft Office"],
    achievements: [
      "Mapped and evaluated 50+ store processes",
      "Created comprehensive Power BI dashboard",
      "Improved operational efficiency through process analysis"
    ],
    area: "Analytics"
  },
  {
    id: 8,
    title: "Project Manager",
    company: "Bamilo",
    logo: null,
    location: "Tehran, Iran",
    period: "September 2016 – July 2017", 
    description: "Regional group for Rocket Internet. Responsible for defining, planning and executing strategic projects.",
    technologies: ["Project Management", "Software as a Service (SaaS)", "Stakeholder Management", "Analytical Skills", "Strategic Planning", "Business Development", "E-commerce"],
    software: ["Project Management Tools", "SaaS Platforms", "Microsoft Office"],
    achievements: [
      "Defined and executed strategic projects for Rocket Internet portfolio",
      "Managed stakeholder relationships across regional markets",
      "Delivered projects on time and within budget"
    ],
    area: "Product"
  },
  {
    id: 9,
    title: "Category Manager",
    company: "Solico Group", 
    logo: null,
    location: "Tehran, Iran",
    period: "September 2015 – August 2016",
    description: "Frozen Kebabs and Vegetables Category Manager responsible for product strategy and market analysis.",
    technologies: ["Category Management", "Marketing Analytics", "Competitive Analysis", "Product Launch", "Analytical Skills", "Marketing Strategy", "Business Analytics"],
    software: ["Marketing Analytics Tools", "Competitive Intelligence Platforms", "Microsoft Excel", "Microsoft Office"],
    achievements: [
      "Managed frozen kebabs and vegetables product category",
      "Conducted competitive analysis and market research",
      "Successfully launched new products in the category"
    ],
    area: "Analytics"
  }
];

export function Professional() {
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const { track } = useTrackEvent();
  
  const areas = ["All", "Product", "Analytics"];
  
  // Extract all unique technologies and software from all roles
  const allTechnologies = professionalRoles.flatMap(role => role.technologies);
  const uniqueTechnologies = Array.from(new Set(allTechnologies));
  
  const allSoftware = professionalRoles.flatMap(role => role.software);
  const uniqueSoftware = Array.from(new Set(allSoftware));
  
  // Filter by area, technologies and software
  const filteredRoles = professionalRoles.filter(role => {
    const areaMatch = selectedArea === "All" || role.area.includes(selectedArea);
    const techMatch = selectedTechnologies.length === 0 || 
      selectedTechnologies.every(tech => role.technologies.includes(tech));
    const softwareMatch = selectedSoftware.length === 0 || 
      selectedSoftware.every(software => role.software.includes(software));
    return areaMatch && techMatch && softwareMatch;
  });

  const handleTechnologyToggle = (tech: string) => {
    const newTechnologies = selectedTechnologies.includes(tech) 
      ? selectedTechnologies.filter(t => t !== tech)
      : [...selectedTechnologies, tech];
    
    setSelectedTechnologies(newTechnologies);
    
    // Track filter state
    track('professional_filters_applied', {
      area: selectedArea,
      technologies: newTechnologies,
      software: selectedSoftware,
      totalResults: professionalRoles.filter(role => {
        const areaMatch = selectedArea === "All" || role.area.includes(selectedArea);
        const techMatch = newTechnologies.length === 0 || 
          newTechnologies.every(tech => role.technologies.includes(tech));
        const softwareMatch = selectedSoftware.length === 0 || 
          selectedSoftware.every(software => role.software.includes(software));
        return areaMatch && techMatch && softwareMatch;
      }).length,
      source: 'professional_section',
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    });
  };

  const clearAllTechnologies = () => {
    setSelectedTechnologies([]);
    
    // Track filter clear
    track('professional_filters_applied', {
      area: selectedArea,
      technologies: [],
      software: selectedSoftware,
      totalResults: professionalRoles.filter(role => {
        const areaMatch = selectedArea === "All" || role.area.includes(selectedArea);
        const softwareMatch = selectedSoftware.length === 0 || 
          selectedSoftware.every(software => role.software.includes(software));
        return areaMatch && softwareMatch;
      }).length,
      source: 'professional_section',
      action: 'clear_technologies',
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    });
  };

  const handleSoftwareToggle = (software: string) => {
    const newSoftware = selectedSoftware.includes(software) 
      ? selectedSoftware.filter(s => s !== software)
      : [...selectedSoftware, software];
    
    setSelectedSoftware(newSoftware);
    
    // Track filter state
    track('professional_filters_applied', {
      area: selectedArea,
      technologies: selectedTechnologies,
      software: newSoftware,
      totalResults: professionalRoles.filter(role => {
        const areaMatch = selectedArea === "All" || role.area.includes(selectedArea);
        const techMatch = selectedTechnologies.length === 0 || 
          selectedTechnologies.every(tech => role.technologies.includes(tech));
        const softwareMatch = newSoftware.length === 0 || 
          newSoftware.every(software => role.software.includes(software));
        return areaMatch && techMatch && softwareMatch;
      }).length,
      source: 'professional_section',
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    });
  };

  const clearAllSoftware = () => {
    setSelectedSoftware([]);
    
    // Track filter clear
    track('professional_filters_applied', {
      area: selectedArea,
      technologies: selectedTechnologies,
      software: [],
      totalResults: professionalRoles.filter(role => {
        const areaMatch = selectedArea === "All" || role.area.includes(selectedArea);
        const techMatch = selectedTechnologies.length === 0 || 
          selectedTechnologies.every(tech => role.technologies.includes(tech));
        return areaMatch && techMatch;
      }).length,
      source: 'professional_section',
      action: 'clear_software',
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    });
  };

  return (
    <section id="professional" className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Professional Experience
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A journey through my professional career in product management, entrepreneurship, and business development.
          </p>
        </div>

        {/* Filter and View Controls */}
        <div className="mx-auto max-w-7xl mt-8">
          <div className="flex flex-row mb-8 gap-2 items-start justify-between">
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              {/* Area Filter */}
              <div className="inline-flex rounded-lg bg-muted p-1">
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      track('professional_filter_click', { 
                        area, 
                        source: 'professional_section',
                        timestamp: Date.now(),
                        userAgent: navigator.userAgent
                      });
                      setSelectedArea(area);
                      
                      // Track comprehensive filter state
                      track('professional_filters_applied', {
                        area: area,
                        technologies: selectedTechnologies,
                        software: selectedSoftware,
                        totalResults: professionalRoles.filter(role => {
                          const areaMatch = area === "All" || role.area.includes(area);
                          const techMatch = selectedTechnologies.length === 0 || 
                            selectedTechnologies.every(tech => role.technologies.includes(tech));
                          const softwareMatch = selectedSoftware.length === 0 || 
                            selectedSoftware.every(software => role.software.includes(software));
                          return areaMatch && techMatch && softwareMatch;
                        }).length,
                        source: 'professional_section',
                        timestamp: Date.now(),
                        userAgent: navigator.userAgent
                      });
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
              
              {/* Filter Dropdowns - Hidden on mobile */}
              <div className="hidden sm:flex flex-row gap-2">
                {/* Technology Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-all h-10">
                      <Filter className="h-4 w-4" />
                      Skills {selectedTechnologies.length > 0 && `(${selectedTechnologies.length})`}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-background border shadow-md z-50">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        clearAllTechnologies();
                      }}
                      className="cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                      Clear All
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {uniqueTechnologies.map((tech) => (
                      <DropdownMenuCheckboxItem
                        key={tech}
                        checked={selectedTechnologies.includes(tech)}
                        onSelect={(e) => {
                          e.preventDefault();
                        }}
                        onCheckedChange={(checked) => {
                          track('professional_tech_filter_click', { 
                            technology: tech, 
                            source: 'professional_section',
                            timestamp: Date.now(),
                            userAgent: navigator.userAgent
                          });
                          handleTechnologyToggle(tech);
                        }}
                        className="cursor-pointer"
                      >
                        {tech}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Software Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-all h-10">
                      <Filter className="h-4 w-4" />
                      Software {selectedSoftware.length > 0 && `(${selectedSoftware.length})`}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-background border shadow-md z-50">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        clearAllSoftware();
                      }}
                      className="cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                      Clear All
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {uniqueSoftware.map((software) => (
                      <DropdownMenuCheckboxItem
                        key={software}
                        checked={selectedSoftware.includes(software)}
                        onSelect={(e) => {
                          e.preventDefault();
                        }}
                        onCheckedChange={(checked) => {
                          track('professional_software_filter_click', { 
                            software: software, 
                            source: 'professional_section',
                            timestamp: Date.now(),
                            userAgent: navigator.userAgent
                          });
                          handleSoftwareToggle(software);
                        }}
                        className="cursor-pointer"
                      >
                        {software}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* View Mode Toggle - Always visible on right */}
            <div className="inline-flex rounded-lg bg-muted p-1 flex-shrink-0">
              <button
                onClick={() => {
                  track('professional_view_toggle', { 
                    viewMode: 'card', 
                    previousMode: viewMode,
                    source: 'professional_section',
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
                  track('professional_view_toggle', { 
                    viewMode: 'list', 
                    previousMode: viewMode,
                    source: 'professional_section',
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
          
          <div className={viewMode === 'card' ? "grid grid-cols-1 lg:grid-cols-2 gap-8" : "space-y-4"}>
            {filteredRoles.map((role, index) => (
              <div
                key={role.id}
                className={`card-gradient rounded-xl shadow-medium hover-lift ${viewMode === 'card' ? 'h-full flex flex-col p-6' : 'p-4'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {viewMode === 'card' ? (
                  // Card View - Full Information
                  <>
                    {/* Role Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 relative">
                      <div className="w-full">
                        <h3 className="text-xl font-semibold text-foreground mb-2 leading-tight flex items-center gap-3 min-h-[3.5rem]">
                          {role.logo && (
                            <div className="flex-shrink-0">
                              <img 
                                src={role.logo} 
                                alt={role.company}
                                className={`h-6 w-6 rounded-md object-contain p-1 ${
                                  role.company === "H&M" ? "bg-white" : "bg-white/10"
                                }`}
                              />
                            </div>
                          )}
                          <span className="flex-1">{role.title}</span>
                        </h3>
                        <div className="flex flex-col gap-2 text-muted-foreground min-h-[4.5rem]">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <a 
                              href={
                                role.company === "PayPal" ? "https://www.paypal.com/" :
                                role.company === "Klarna" ? "https://www.klarna.com/" :
                                role.company === "Antler" ? "https://www.antler.co/" :
                                role.company === "H&M" ? "https://www2.hm.com/" :
                                role.company === "Bamilo" ? "#" :
                                role.company === "Solico Group" ? "#" :
                                role.company === "Puls Health Research" ? "#" :
                                "#"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => track('company_name_click', { company: role.company, source: 'professional_section' })}
                              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1"
                            >
                              {role.company}
                              <ExternalLinkIcon className="h-3 w-3" />
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
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                      {role.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Technologies & Skills</h4>
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
                    
                    {/* Software */}
                    {role.software.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Software & Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {role.software.map((software) => (
                            <span
                              key={software}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/50 text-secondary-foreground"
                            >
                              {software}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Achievements */}
                    <div className="mt-auto">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {role.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary text-xs mt-1 flex-shrink-0">•</span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  // List View - Basic Information Only
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between relative">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight flex items-center gap-2 min-h-[2rem]">
                        {role.logo && (
                          <div className="flex-shrink-0">
                            <img 
                              src={role.logo} 
                              alt={role.company}
                              className={`h-5 w-5 rounded-md object-contain p-0.5 ${
                                role.company === "H&M" ? "bg-white" : "bg-white/10"
                              }`}
                            />
                          </div>
                        )}
                        <span className="flex-1">{role.title}</span>
                      </h3>
                      <div className="flex flex-col gap-1 text-muted-foreground min-h-[3.5rem]">
                        <a 
                          href={
                            role.company === "PayPal" ? "https://www.paypal.com/" :
                            role.company === "Klarna" ? "https://www.klarna.com/" :
                            role.company === "Antler" ? "https://www.antler.co/" :
                            role.company === "H&M" ? "https://www2.hm.com/" :
                            role.company === "Bamilo" ? "#" :
                            role.company === "Solico Group" ? "#" :
                            role.company === "Puls Health Research" ? "#" :
                            "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track('company_name_click', { company: role.company, source: 'professional_section' })}
                          className="text-sm font-medium hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Building className="h-3 w-3" />
                          {role.company}
                          <ExternalLinkIcon className="h-3 w-3" />
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