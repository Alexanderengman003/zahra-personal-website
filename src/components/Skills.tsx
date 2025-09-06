import { Progress } from "@/components/ui/progress";

const personalityTraits = [
  { left: "Introvert", right: "Extrovert", value: 75 },
  { left: "Practical", right: "Creative", value: 60 },
  { left: "Independent", right: "Collaborative", value: 70 },
  { left: "Analytical", right: "Intuitive", value: 80 },
  { left: "Detail", right: "Big picture", value: 45 },
  { left: "Feeling", right: "Thinking", value: 70 }
];

const itSkills = [
  { name: "MatLab", value: 100 },
  { name: "LaTeX", value: 100 },
  { name: "MS Office", value: 100 },
  { name: "Arduino", value: 90 },
  { name: "C++", value: 80 },
  { name: "C#/.NET", value: 75 },
  { name: "Python", value: 70 },
  { name: "Altium Designer", value: 70 },
  { name: "SolidWorks", value: 25 }
];

const languageSkills = [
  { name: "Swedish", value: 100 },
  { name: "English", value: 100 },
  { name: "Norwegian", value: 80 },
  { name: "French", value: 40 },
  { name: "Spanish", value: 20 },
  { name: "Farsi", value: 10 }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills & Personality
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A comprehensive overview of my technical abilities, language proficiency, and personality traits.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Personality Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
              Personality
            </h3>
            <div className="space-y-6">
              {personalityTraits.map((trait, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>{trait.left}</span>
                    <span>{trait.right}</span>
                  </div>
                  <div className="relative">
                    <Progress value={trait.value} className="h-3" />
                    <div 
                      className="absolute top-0 w-4 h-3 bg-primary rounded-full border-2 border-background shadow-sm"
                      style={{ left: `calc(${trait.value}% - 8px)` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IT Skills Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
              IT Skills
            </h3>
            <div className="space-y-6">
              {itSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm font-semibold text-primary">{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Language Skills Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
              Language Skills
            </h3>
            <div className="space-y-6">
              {languageSkills.map((language, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{language.name}</span>
                    <span className="text-sm font-semibold text-primary">{language.value}%</span>
                  </div>
                  <Progress value={language.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}