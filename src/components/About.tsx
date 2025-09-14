import { Code, Cpu, Heart, Users, TrendingUp, DollarSign } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Semiconductors",
    description: "Experience in MEMS, CMOS design, semiconductor physics, and cleanroom fabrication processes."
  },
  {
    icon: Heart,
    title: "Medical technology",
    description: "Developing medical devices from concept to market, ensuring ISO 13485 and MDR compliance."
  },
  {
    icon: Users,
    title: "Project management",
    description: "Leading cross-functional teams using AGILE methodology to deliver innovative products on time."
  },
  {
    icon: TrendingUp,
    title: "Business development",
    description: "Engaging with customers, forging strategic partnerships, and expanding market reach for growth."
  },
  {
    icon: Code,
    title: "Software development",
    description: "Programming experience in multiple languages for standalone projects and hardware interfacing."
  },
  {
    icon: DollarSign,
    title: "Sales",
    description: "Building customer relationships, identifying market opportunities, and driving revenue through strategic sales initiatives."
  }
];

export function About() {
  return (
    <section id="about" className="section-spacing bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="section-header">About Me</h2>
          <p className="section-subheader">
            My professional journey and core expertise areas
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Journey Card - Full Width */}
          <div className="mb-8 sm:mb-12">
            <div className="card-gradient rounded-2xl card-spacing shadow-medium hover-lift">
              <h3 className="card-title mb-4 sm:mb-6">My Journey</h3>
              <p className="card-description text-justify">
                With a background in Materials Science and Engineering (B.Sc.) and Nanotechnology (M.Sc.) from KTH Royal Institute of Technology, I have built a strong foundation in materials development, semiconductor fabrication, and hardware/software design. Throughout my career, semiconductors have been the red thread, from research and product development to practical applications in advanced hardware. Over my career which started in engineering, I transition into a business-oriented and customer-facing role, leveraging my technical expertise to drive growth in sales, connect technology with customer needs, and contribute to advancing semiconductor innovation.
              </p>
            </div>
          </div>

          {/* Skills/Expertise Grid - 2 rows, 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-gradient rounded-xl card-spacing shadow-subtle hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="card-subtitle mt-4 sm:mt-6">{feature.title}</h3>
                <p className="card-description mt-2 sm:mt-3">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}