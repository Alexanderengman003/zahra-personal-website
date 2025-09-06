import { useState } from "react";
import { ExternalLink, Github, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/use-language";
import ecommerceImg from "@/assets/project-ecommerce.jpg";
import tasksImg from "@/assets/project-tasks.jpg";
import dashboardImg from "@/assets/project-dashboard.jpg";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
    image: ecommerceImg,
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/alexander/ecommerce",
    liveUrl: "https://ecommerce-demo.alexander.dev",
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: tasksImg,
    technologies: ["Vue.js", "Firebase", "TypeScript", "Socket.io"],
    githubUrl: "https://github.com/alexander/taskmanager",
    liveUrl: "https://tasks.alexander.dev",
    category: "Frontend",
  },
  {
    id: 3,
    title: "API Gateway Service",
    description: "A high-performance API gateway built with Go, featuring rate limiting, authentication, and load balancing for microservices architecture.",
    image: dashboardImg,
    technologies: ["Go", "Redis", "Docker", "Kubernetes", "gRPC"],
    githubUrl: "https://github.com/alexander/api-gateway",
    liveUrl: null,
    category: "Backend",
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for data visualization and analytics, featuring real-time charts, filters, and export capabilities.",
    image: dashboardImg,
    technologies: ["React", "D3.js", "Python", "FastAPI", "Chart.js"],
    githubUrl: "https://github.com/alexander/data-dashboard",
    liveUrl: "https://dashboard.alexander.dev",
    category: "Data Science",
  },
  {
    id: 5,
    title: "Mobile Weather App",
    description: "A cross-platform mobile weather application with location-based forecasts, weather alerts, and beautiful animations.",
    image: ecommerceImg,
    technologies: ["React Native", "Expo", "Weather API", "Redux"],
    githubUrl: "https://github.com/alexander/weather-app",
    liveUrl: null,
    category: "Mobile",
  },
  {
    id: 6,
    title: "DevOps Automation Suite",
    description: "A comprehensive DevOps toolkit for CI/CD pipeline automation, infrastructure as code, and deployment management.",
    image: tasksImg,
    technologies: ["Python", "Terraform", "AWS", "Jenkins", "Ansible"],
    githubUrl: "https://github.com/alexander/devops-suite",
    liveUrl: null,
    category: "DevOps",
  },
];

export function Projects() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t("allCategories"));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === t("allCategories") || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("projectsTitle")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("projectsDescription")}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("searchProjects")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[t("allCategories"), "Full Stack", "Frontend", "Backend", "Mobile", "Data Science", "DevOps"].map((category) => (
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
                      <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                        <ExternalLink className="h-4 w-4" />
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
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Github className="mr-2 h-3 w-3" />
                      Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" variant="default" className="flex-1">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Live Demo
                    </Button>
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
              {t("noResults")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}