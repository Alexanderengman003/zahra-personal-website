import { TrendingUp, Users, Target, Lightbulb, BarChart3, Globe } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Product Management",
    description: "Leading product strategy and vision, driving cross-functional teams to deliver innovative solutions that meet customer needs and business objectives."
  },
  {
    icon: TrendingUp,
    title: "Business Strategy",
    description: "Developing strategic plans, conducting market analysis, and identifying growth opportunities in fintech and health tech sectors."
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Managing and mentoring teams of 20+ professionals, fostering collaboration and driving results through effective leadership."
  },
  {
    icon: Lightbulb,
    title: "Entrepreneurship",
    description: "Co-founding startups, developing innovative business models, and bringing patient-centric health research solutions to market."
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Leveraging data-driven insights for product decisions, utilizing SQL, Power BI, and advanced analytics to optimize performance."
  },
  {
    icon: Globe,
    title: "International Business",
    description: "Expertise in global markets, cross-cultural business practices, and international management through CEMS education and experience."
  }
];

export function About() {
  return (
    <section id="about" className="py-12 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto mt-8 max-w-7xl">
          {/* Journey Card - Full Width */}
          <div className="mb-8">
            <div className="card-gradient rounded-2xl p-5 shadow-medium hover-lift">
              <h3 className="text-xl font-semibold text-foreground mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed text-justify">
                My career journey spans product management, entrepreneurship, and business development across fintech and health tech industries. From my early days as a business analyst at Klarna to leading cross-functional teams at PayPal, I've consistently focused on building innovative products that deliver real value to users. My international business education from CEMS and Stockholm School of Economics, combined with my entrepreneurial experience as co-founder of Puls Health Research, has shaped my strategic thinking and global perspective on business challenges.
              </p>
            </div>
          </div>

          {/* Skills/Expertise Grid - 2 rows, 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-gradient rounded-xl p-5 shadow-subtle hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
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