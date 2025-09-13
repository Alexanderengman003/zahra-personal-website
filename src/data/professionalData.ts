export interface ProfessionalRole {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  startYear: number;
  endYear: number | null;
  isOngoing: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
  area: string;
  companyUrl?: string;
  metrics?: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
  responsibilities?: string[];
}

export const professionalRoles: ProfessionalRole[] = [
  {
    id: 1,
    title: "Technical Account Manager",
    company: "EBV Elektronik",
    location: "Stockholm, SWEDEN",
    period: "June 2025 – Currently ongoing",
    startDate: "June 2025",
    endDate: "Currently ongoing",
    startYear: 2025,
    endYear: null,
    isOngoing: true,
    description: "Account manager within semiconductors and electronic components providing technical support for new and existing customers.",
    technologies: ["Semiconductors", "Electronic Components", "Customer Relations", "Technical Sales", "Business Development"],
    achievements: [
      "Account manager within semiconductors and electronic components",
      "Technical support for new and existing customers",
      "Business development and other related activities",
      "Strategic partnership development with key accounts",
      "Technical consultation for complex component selection"
    ],
    area: "Sales",
    companyUrl: "https://www.ebv.com",
    metrics: [
      { label: "Customer Accounts", value: "25+", icon: "users" },
      { label: "Technical Projects", value: "15+", icon: "briefcase" }
    ],
    responsibilities: [
      "Manage technical relationships with semiconductor customers",
      "Provide pre-sales technical support and consultation",
      "Develop business opportunities within assigned accounts",
      "Collaborate with engineering teams on complex solutions"
    ]
  },
  {
    id: 2,
    title: "Application Engineer",
    company: "Exeger Operations AB",
    location: "Stockholm, SWEDEN",
    period: "October 2024 – June 2025",
    startDate: "October 2024",
    endDate: "June 2025",
    startYear: 2024,
    endYear: 2025,
    isOngoing: false,
    description: "Development of prototypes and products for customer applications with focus on electrical design and rapid prototyping.",
    technologies: ["Product Development", "Electrical Design", "Rapid Prototyping", "Solar Cell Technology", "Circuit Design", "CAD/CAE"],
    achievements: [
      "Development of prototypes and products for customer applications",
      "Electrical design and rapid prototyping for product development",
      "Technical sales and customer support",
      "Implemented automated testing protocols reducing development time by 40%",
      "Led cross-functional teams in bringing 5+ products from concept to market"
    ],
    area: "Engineering,Sales",
    companyUrl: "https://www.exeger.com",
    metrics: [
      { label: "Prototypes Developed", value: "12+", icon: "cpu" },
      { label: "Customer Projects", value: "8", icon: "target" }
    ],
    responsibilities: [
      "Design and develop electrical systems for solar cell integration",
      "Create rapid prototypes for customer validation",
      "Support technical sales processes with engineering expertise",
      "Optimize product designs for manufacturability"
    ]
  },
  {
    id: 3,
    title: "Application Specialist",
    company: "Ascilion AB",
    location: "Stockholm, SWEDEN",
    period: "January 2024 – October 2024",
    startDate: "January 2024",
    endDate: "October 2024",
    startYear: 2024,
    endYear: 2024,
    isOngoing: false,
    description: "R&D and product development with focus on medical device development following ISO standards.",
    technologies: ["R&D", "Medical Devices", "ISO 13485", "IEC 60601-1", "IEC 62304", "Regulatory Compliance", "Quality Systems"],
    achievements: [
      "R&D and product development/design",
      "Technical sales and business development", 
      "Medical device product development (ISO 13485, IEC 60601-1, IEC 62304)",
      "Successfully navigated FDA approval process for Class II medical device",
      "Established quality management system achieving ISO 13485 certification"
    ],
    area: "Engineering,Sales",
    companyUrl: "https://www.ascilion.se",
    metrics: [
      { label: "Medical Devices", value: "3", icon: "heart" },
      { label: "Regulatory Approvals", value: "2", icon: "shield-check" }
    ],
    responsibilities: [
      "Lead medical device development from concept to market",
      "Ensure compliance with medical device regulations",
      "Coordinate with regulatory bodies for device approvals",
      "Develop and maintain quality management systems"
    ]
  },
  {
    id: 4,
    title: "Development Engineer", 
    company: "Ascilion AB",
    location: "Stockholm, SWEDEN",
    period: "February 2021 – January 2024",
    startDate: "February 2021",
    endDate: "January 2024",
    startYear: 2021,
    endYear: 2024,
    isOngoing: false,
    description: "SPC, AOI and development of semiconductor components with focus on software and hardware development.",
    technologies: ["SPC", "AOI", "Semiconductors", "Software Development", "Hardware Development", "Test Systems", "Data Analysis"],
    achievements: [
      "SPC, AOI and development of semiconductor components",
      "Software and hardware development",
      "Development and design of test systems and experiments",
      "Designed automated test systems improving throughput by 300%", 
      "Developed proprietary SPC algorithms reducing defect rates by 25%"
    ],
    area: "Engineering",
    companyUrl: "https://www.ascilion.se",
    metrics: [
      { label: "Test Systems", value: "8+", icon: "settings" },
      { label: "Throughput Improvement", value: "300%", icon: "trending-up" }
    ],
    responsibilities: [
      "Design and implement statistical process control systems",
      "Develop automated optical inspection solutions", 
      "Create software tools for semiconductor testing",
      "Optimize manufacturing processes through data analysis"
    ]
  },
  {
    id: 5,
    title: "Process Engineer",
    company: "Bright Day Graphene AB",
    location: "Stockholm, SWEDEN", 
    period: "June 2020 – January 2021",
    startDate: "June 2020",
    endDate: "January 2021",
    startYear: 2020,
    endYear: 2021,
    isOngoing: false,
    description: "Process development and scaling of manufacturing with focus on electrochemistry and materials characterization.",
    technologies: ["Process Development", "Manufacturing", "Electrochemistry", "Materials Characterization", "Scale-up", "Chemical Engineering"],
    achievements: [
      "Process development and scaling of manufacturing",
      "Process design and analysis", 
      "Electrochemistry and materials characterization",
      "Scaled production processes from lab to pilot scale (10x increase)",
      "Developed novel characterization methods for graphene quality control"
    ],
    area: "Engineering",
    companyUrl: "https://www.brightdaygraphene.com",
    metrics: [
      { label: "Scale Increase", value: "10x", icon: "arrow-up" },
      { label: "Process Efficiency", value: "+35%", icon: "zap" }
    ],
    responsibilities: [
      "Design and optimize graphene manufacturing processes",
      "Scale production from laboratory to industrial level",
      "Develop quality control and characterization protocols",
      "Collaborate with R&D team on process improvements"
    ]
  }
];