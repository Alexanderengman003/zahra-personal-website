import { Code, Cpu, Heart, Users, TrendingUp, Box } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Semiconductors",
    description: "Previous experience in semiconductor design and manufacturing such as MEMS and CMOS, semiconductor physics and quantum devices, with an emphasis on cleanroom fabrication."
  },
  {
    icon: Heart,
    title: "Medical technology",
    description: "Developing innovative medical devices from concept to market, ensuring compliance with ISO 13485 and MDR standards throughout the R&D, design, and manufacturing processes."
  },
  {
    icon: Users,
    title: "Project management",
    description: "Experienced in AGILE methodology, leading cross-functional teams to deliver innovative products. Skilled in balancing stakeholder needs, managing resources, and ensuring timely project completion."
  },
  {
    icon: TrendingUp,
    title: "Business development",
    description: "Actively engaging with customers and prospects, forging strategic partnerships, and expanding market reach to drive sustainable business expansion and revenue growth."
  },
  {
    icon: Code,
    title: "Software development",
    description: "Development experience in several common programming languages, for stand-alone software projects as well as interfacing with hardware of various kinds."
  },
  {
    icon: Box,
    title: "Product design",
    description: "Guiding products from concept to market, within hardware and software, including prototyping, design and manufacturing and product life-cycle management, with user needs in mind."
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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Bio Section */}
            <div className="lg:pr-8">
              <div className="card-gradient rounded-2xl p-8 shadow-medium hover-lift">
                <h3 className="text-xl font-semibold text-foreground mb-4">My Journey</h3>
                <div className="prose prose-gray dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    My background stems from a bachelor's degree in Materials Science and Engineering and a master's in nanotechnology from KTH Royal Institute of Technology in Stockholm. I've gained diverse experience in fields such as materials development, semiconductor fabrication, and medical device design. My key strengths include being a quick learner, possessing a creative mindset, and maintaining a keen eye for detail in all my work.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills/Values Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
      </div>
    </section>
  );
}