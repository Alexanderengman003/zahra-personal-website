import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import { AnimatedCounter } from "./AnimatedCounter";

const personalityTraits = [
  { left: "Introvert", right: "Extrovert", value: 70 }, // 70% extrovert
  { left: "Practical", right: "Creative", value: 40 }, // 40% creative
  { left: "Independent", right: "Collaborative", value: 45 }, // 45% collaborative
  { left: "Analytical", right: "Intuitive", value: 30 }, // 30% intuitive
  { left: "Detail", right: "Big picture", value: 40 }, // 40% big picture
  { left: "Feeling", right: "Thinking", value: 60 } // 60% thinking
];

const itSkills = [
  { name: "MatLab", value: 100 },
  { name: "LaTeX", value: 100 },
  { name: "MS Office", value: 100 },
  { name: "Arduino", value: 90 },
  { name: "C++", value: 80 },
  { name: "C#/.NET", value: 75 },
  { name: "Python", value: 50 },
  { name: "Altium Designer", value: 40 },
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
  const [animateValues, setAnimateValues] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setIsVisible(true);
          // Start number animation slightly after bar animation
          setTimeout(() => setAnimateValues(true), 300);
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
    <section id="skills" className="py-16 bg-muted/30" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills & Personality
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A comprehensive overview of my technical abilities, language proficiency, and personality traits.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 mt-12">
          {/* Personality Section */}
          <div className="card-gradient rounded-3xl p-8 shadow-large">
            <h3 className="text-2xl font-semibold text-foreground mb-10 text-center">
              Personality
            </h3>
            <div className="space-y-8">
              {personalityTraits.map((trait, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between text-sm font-medium text-foreground">
                    <span>{trait.left}</span>
                    <span>{trait.right}</span>
                  </div>
                   <div className="relative bg-muted rounded-full h-6 overflow-hidden">
                     {/* Animated bar from center */}
                     <div 
                       className="absolute h-full transition-all duration-1000 ease-out"
                       style={{ 
                         left: isVisible ? (trait.value >= 50 ? '50%' : `${trait.value}%`) : '50%',
                         width: isVisible ? `${Math.abs(trait.value - 50)}%` : '0%',
                         background: trait.value >= 50 
                           ? 'linear-gradient(to right, rgb(96 165 250), rgb(59 130 246))' 
                           : 'linear-gradient(to left, rgb(96 165 250), rgb(59 130 246))',
                         borderRadius: trait.value >= 50 ? '0 9999px 9999px 0' : '9999px 0 0 9999px',
                         transitionDelay: `${index * 200}ms`
                       }}
                     />
                     {/* Center line - placed after bar to appear on top */}
                     <div className="absolute left-1/2 top-0 w-px h-6 bg-border transform -translate-x-0.5 z-10" />
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
                    <span className="text-sm font-semibold text-primary">
                      {animateValues ? <AnimatedCounter end={skill.value} suffix="%" delay={index * 150} /> : '0%'}
                    </span>
                  </div>
                  <div className="relative bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000 ease-out`}
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
                    <span className="text-sm font-semibold text-primary">
                      {animateValues ? <AnimatedCounter end={language.value} suffix="%" delay={index * 150} /> : '0%'}
                    </span>
                  </div>
                  <div className="relative bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000 ease-out`}
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