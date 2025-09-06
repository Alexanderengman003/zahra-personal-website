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
    <section id="about" className="py-24 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About Me
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            I'm a materials science engineer with expertise in semiconductor technology and a passion for 
            developing innovative solutions in hardware and medical device manufacturing.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          {/* Journey Card - Full Width */}
          <div className="mb-8">
            <div className="card-gradient rounded-2xl p-8 shadow-medium hover-lift">
              <h3 className="text-xl font-semibold text-foreground mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                My background stems from a bachelor's degree in Materials Science and Engineering and a master's in nanotechnology from KTH Royal Institute of Technology in Stockholm. I've gained diverse experience in fields such as materials development, semiconductor fabrication, and medical device design. My key strengths include being a quick learner, possessing a creative mindset, and maintaining a keen eye for detail in all my work.
              </p>
            </div>
          </div>

          {/* Skills/Expertise Grid - 2 rows, 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-gradient rounded-xl p-6 shadow-subtle hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{feature.title}</h3>
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