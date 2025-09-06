import { Code, Cpu, Heart, Users, TrendingUp, DollarSign } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function About() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Cpu,
      title: t("semiconductors"),
      description: t("semiconductorsDesc")
    },
    {
      icon: Heart,
      title: t("medicalTech"),
      description: t("medicalTechDesc")
    },
    {
      icon: Users,
      title: t("projectManagement"),
      description: t("projectManagementDesc")
    },
    {
      icon: TrendingUp,
      title: t("businessDev"),
      description: t("businessDevDesc")
    },
    {
      icon: Code,
      title: t("softwareDev"),
      description: t("softwareDevDesc")
    },
    {
      icon: DollarSign,
      title: t("sales"),
      description: t("salesDesc")
    }
  ];
  
  return (
    <section id="about" className="py-24 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("aboutTitle")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("aboutDescription")}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          {/* Journey Card - Full Width */}
          <div className="mb-8">
            <div className="card-gradient rounded-2xl p-8 shadow-medium hover-lift">
              <h3 className="text-xl font-semibold text-foreground mb-4">{t("myJourney")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("journeyDescription")}
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