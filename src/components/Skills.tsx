import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import { AnimatedCounter } from "./AnimatedCounter";

const personalityTraits = [
  { left: "Introvert", right: "Extrovert", value: 75 }, // 75% extrovert - leadership roles
  { left: "Practical", right: "Creative", value: 70 }, // 70% creative - product innovation
  { left: "Independent", right: "Collaborative", value: 80 }, // 80% collaborative - team leadership
  { left: "Analytical", right: "Intuitive", value: 65 }, // 65% intuitive - product vision
  { left: "Detail", right: "Big picture", value: 75 }, // 75% big picture - strategic thinking
  { left: "Feeling", right: "Thinking", value: 70 } // 70% thinking - data-driven decisions
];

const itSkills = [
  { name: "SQL", value: 90 },
  { name: "Microsoft Power BI", value: 85 },
  { name: "Microsoft Excel", value: 95 },
  { name: "Python", value: 70 },
  { name: "Tableau", value: 80 },
  { name: "Jira", value: 85 },
  { name: "Confluence", value: 80 },
  { name: "Analytics Tools", value: 90 },
  { name: "A/B Testing", value: 85 }
];

const languageSkills = [
  { name: "Persian", value: 100 },
  { name: "English", value: 100 },
  { name: "Swedish", value: 70 },
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
    <section id="skills" className="py-8 md:py-16 bg-muted/30" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills & Personality
          </h2>
          <p className="mt-2 md:mt-4 text-base md:text-lg leading-7 md:leading-8 text-muted-foreground">
            A comprehensive overview of my technical abilities, language proficiency, and personality traits.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-16 mt-6 md:mt-8">
          {/* Personality Section */}
          <div className="card-gradient rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-large">
            <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-4 md:mb-10 text-center">
              Personality
            </h3>
            <div className="space-y-4 md:space-y-8">
              {personalityTraits.map((trait, index) => (
                <div key={index} className="space-y-2 md:space-y-4">
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
                            ? 'linear-gradient(to right, hsl(270 75% 55%), hsl(270 75% 65%))' 
                            : 'linear-gradient(to left, hsl(270 75% 55%), hsl(270 75% 65%))',
                         borderRadius: trait.value >= 50 ? '0 9999px 9999px 0' : '9999px 0 0 9999px',
                         transitionDelay: `${index * 200}ms`
                       }}
                     />
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* IT Skills Section */}
          <div className="card-gradient rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-large">
            <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-4 md:mb-10 text-center">
              IT Skills
            </h3>
            <div className="space-y-3 md:space-y-6">
              {itSkills.map((skill, index) => (
                <div key={index} className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm font-semibold text-primary">
                      {animateValues ? <AnimatedCounter end={skill.value} suffix="%" delay={index * 150} /> : '0%'}
                    </span>
                  </div>
                  <div className="relative bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-1000 ease-out`}
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
          <div className="card-gradient rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-large">
            <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-4 md:mb-10 text-center">
              Language Skills
            </h3>
            <div className="space-y-3 md:space-y-6">
              {languageSkills.map((language, index) => (
                <div key={index} className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{language.name}</span>
                    <span className="text-sm font-semibold text-primary">
                      {animateValues ? <AnimatedCounter end={language.value} suffix="%" delay={index * 150} /> : '0%'}
                    </span>
                  </div>
                  <div className="relative bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-1000 ease-out`}
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