import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";

const personalityTraits = [
  { left: "Introvert", right: "Extrovert", value: 25 }, // 75% extrovert = 25% right of center
  { left: "Practical", right: "Creative", value: 10 }, // 60% creative = 10% right of center  
  { left: "Independent", right: "Collaborative", value: 20 }, // 70% collaborative = 20% right of center
  { left: "Analytical", right: "Intuitive", value: 30 }, // 80% analytical = 30% left of center
  { left: "Detail", right: "Big picture", value: -5 }, // 45% big picture = 5% left of center
  { left: "Feeling", right: "Thinking", value: 20 } // 70% thinking = 20% right of center
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 bg-muted/30" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
            Skills & Personality
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            A comprehensive overview of my technical abilities, language proficiency, and personality traits.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Personality Section */}
          <div className="card-gradient rounded-3xl p-8 shadow-large">
            <h3 className="text-2xl font-semibold text-foreground mb-10 text-center">
              Personality
            </h3>
            <div className="space-y-8">
              {personalityTraits.map((trait, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>{trait.left}</span>
                    <span>{trait.right}</span>
                  </div>
                  <div className="relative bg-muted/50 rounded-full h-4">
                    {/* Center line */}
                    <div className="absolute left-1/2 top-0 w-px h-4 bg-border transform -translate-x-0.5" />
                    {/* Animated slider */}
                    <div 
                      className={`absolute top-1 w-6 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-md transition-all duration-1000 ease-out ${
                        isVisible ? '' : 'left-1/2 transform -translate-x-3'
                      }`}
                      style={{ 
                        left: isVisible 
                          ? `calc(50% + ${trait.value * 1.5}px - 12px)` 
                          : 'calc(50% - 12px)',
                        transitionDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IT Skills Section */}
          <div className="card-gradient rounded-3xl p-8 shadow-large">
            <h3 className="text-2xl font-semibold text-foreground mb-10 text-center">
              IT Skills
            </h3>
            <div className="space-y-6">
              {itSkills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm font-semibold text-primary">{skill.value}%</span>
                  </div>
                  <div className="relative bg-muted/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isVisible ? `${skill.value}%` : '0%',
                        transitionDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Skills Section */}
          <div className="card-gradient rounded-3xl p-8 shadow-large">
            <h3 className="text-2xl font-semibold text-foreground mb-10 text-center">
              Language Skills
            </h3>
            <div className="space-y-6">
              {languageSkills.map((language, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{language.name}</span>
                    <span className="text-sm font-semibold text-primary">{language.value}%</span>
                  </div>
                  <div className="relative bg-muted/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isVisible ? `${language.value}%` : '0%',
                        transitionDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}