import { MapPin, Calendar, Building } from "lucide-react";

const professionalRoles = [
  {
    id: 1,
    title: "Technical Account Manager",
    company: "EBV Elektronik",
    location: "Stockholm, SWEDEN",
    period: "June 2025 - Present",
    description: "Account management within semiconductors and electronic components, providing comprehensive technical support and business development services.",
    responsibilities: [
      "Account manager within semiconductors and electronic components",
      "Technical support for new and existing customers",
      "Business development and other related activities"
    ]
  },
  {
    id: 2,
    title: "Application Engineer",
    company: "Exeger Operations AB",
    location: "Stockholm, SWEDEN", 
    period: "October 2024 - June 2025",
    description: "Focused on prototype and product development for customer applications, combining electrical design with technical sales expertise.",
    responsibilities: [
      "Development of prototypes and products for customer applications",
      "Electrical design and rapid prototyping for product development",
      "Technical sales and customer support"
    ]
  },
  {
    id: 3,
    title: "Application Specialist",
    company: "Ascilion AB",
    location: "Stockholm, SWEDEN",
    period: "January 2024 - October 2024",
    description: "Specialized in R&D and product development with a focus on medical device development, ensuring compliance with industry standards.",
    responsibilities: [
      "R&D and product development/design",
      "Customer relations and business development",
      "Medical device product development (ISO 13485, IEC 60601-1, IEC 62304)"
    ]
  },
  {
    id: 4,
    title: "Development Engineer",
    company: "Ascilion AB",
    location: "Stockholm, SWEDEN",
    period: "February 2021 - January 2024",
    description: "Comprehensive engineering role involving semiconductor component development, software/hardware development, and test system design.",
    responsibilities: [
      "SPC, AOI and development of semiconductor components",
      "Software and hardware development",
      "Development and design of test systems and experiments"
    ]
  },
  {
    id: 5,
    title: "Process Engineer",
    company: "Bright Day Graphene AB",
    location: "Stockholm, SWEDEN",
    period: "June 2020 - January 2021",
    description: "Focused on process development and manufacturing scaling, with expertise in electrochemistry and materials characterization.",
    responsibilities: [
      "Process development and scaling of manufacturing",
      "Process design and analysis", 
      "Electrochemistry and materials characterization"
    ]
  }
];

export function Professional() {
  return (
    <section id="professional" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Professional Experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            My professional journey in semiconductor engineering, materials science, and technical sales.
          </p>
        </div>

        {/* Professional Roles */}
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            {professionalRoles.map((role, index) => (
              <div
                key={role.id}
                className="card-gradient rounded-2xl p-8 shadow-medium hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Role Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {role.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-muted-foreground">
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

                {/* Responsibilities */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Responsibilities</h4>
                  <ul className="space-y-2">
                    {role.responsibilities.map((responsibility, responsibilityIndex) => (
                      <li
                        key={responsibilityIndex}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{responsibility}</span>
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