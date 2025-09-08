import { useState } from "react";
import { ExternalLink, Github, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import stretchableImg from "@/assets/stretchable-microsupercapacitors.jpg";

const projects = [
  {
    id: 1,
    title: "Stretchable Microsupercapacitors",
    description: "Master's thesis research developing novel Direct Ink Writing method for 3D printing intrinsically stretchable energy storage devices. Achieved 80% stretchability with 740 µF cm⁻² capacitance using PEDOT:PSS conductive inks on TPU substrates.",
    image: "/lovable-uploads/b2cdba2a-95c9-40fa-8794-4965fa31a5bb.png",
    technologies: ["3D Printing", "PEDOT:PSS", "Direct Ink Writing", "Electrochemical Analysis", "Materials Science", "TPU Substrates"],
    githubUrl: null,
    liveUrl: "https://www.diva-portal.org/smash/get/diva2:1479859/FULLTEXT01.pdf", // Link to thesis
    category: "Research",
    date: "Jan 2020 - Jun 2020",
    institution: "KTH Royal Institute of Technology"
  },
  {
    id: 2,
    title: "Optical MEMS Switch",
    description: "Course project designing and fabricating a mechanical multi-stable optical in-plane switch. Created electrostatic comb drive actuator movable ±15 μm in two directions with locking mechanism using Silicon-on-Insulator wafer fabrication.",
    image: "/lovable-uploads/5e81c449-7442-4078-b624-b4f8d6a2390b.png",
    technologies: ["MEMS", "COMSOL Simulation", "Silicon Fabrication", "DRIE", "Photolithography", "SEM Analysis"],
    githubUrl: null,
    liveUrl: "#", // Link to project report
    category: "Research",
    date: "Jan 2020 - Jun 2020",
    institution: "KTH Royal Institute of Technology"
  },
  {
    id: 3,
    title: "MOSFET Interconnect Deposition and Reactive Ion Etching",
    description: "Hands-on CMOS fabrication project completing the final step in MOSFET preparation by adding metal contacts for transistor communication. Involved cleanroom work including photolithography, metal deposition via sputtering, and reactive ion etching to achieve 450nm metal layer thickness with 0.8μm resolution.",
    image: "/lovable-uploads/fc819219-43d3-4817-b8da-08b472acd701.png",
    technologies: ["MOSFET", "CMOS", "Photolithography", "Metal Deposition", "Reactive Ion Etching", "Sputtering", "Cleanroom Fabrication", "HF Etching"],
    githubUrl: null,
    liveUrl: "#", // Link to project report
    category: "Research",
    date: "Feb 2019",
    institution: "KTH Royal Institute of Technology"
  },
];

const categories = ["All", "Research"];

export function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedTechs, setExpandedTechs] = useState<Record<number, boolean>>({});

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Research Work
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Academic research project showcasing expertise in materials science, 
            nanotechnology, and advanced fabrication techniques.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects, technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="card-gradient rounded-xl overflow-hidden shadow-medium hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    {project.githubUrl && (
                      <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30 flex-1" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          <span className="text-xs">Read {project.id === 1 ? 'Thesis' : 'Report'}</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                
                {project.date && (
                  <p className="text-xs text-muted-foreground mb-2">{project.date} • {project.institution}</p>
                )}
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4 h-12 overflow-hidden">
                  {(expandedTechs[project.id] ? project.technologies : project.technologies.slice(0, 6)).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded h-6 flex items-center"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 6 && !expandedTechs[project.id] && (
                    <button
                      onClick={() => setExpandedTechs(prev => ({ ...prev, [project.id]: !prev[project.id] }))}
                      className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded hover:bg-primary/20 transition-colors flex items-center gap-1 h-6"
                    >
                      +{project.technologies.length - 6} more
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  )}
                  {expandedTechs[project.id] && project.technologies.length > 6 && (
                    <button
                      onClick={() => setExpandedTechs(prev => ({ ...prev, [project.id]: false }))}
                      className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded hover:bg-primary/20 transition-colors flex items-center gap-1 h-6 w-full justify-center mt-1"
                    >
                      Show less
                      <ChevronUp className="h-3 w-3" />
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              No projects found matching your criteria. Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}