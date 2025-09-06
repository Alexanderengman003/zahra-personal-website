import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "sv";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation strings
const translations = {
  en: {
    // Hero section
    hello: "Hello, I'm",
    name: "Alexander",
    title: "Semiconductor engineering & sales",
    description: "Passionate about advancing semiconductor technology and hardware innovation. I specialize in materials development, device fabrication, and bringing cutting-edge research from lab to production with precision and creativity.",
    getInTouch: "Get In Touch",
    downloadResume: "Download Resume",
    scrollExplore: "Scroll to explore",
    
    // Navigation
    home: "Home",
    about: "About",
    projects: "Projects",
    professional: "Professional",
    education: "Education",
    contact: "Contact",
    
    // Footer
    footerText: "Built with some AI and a lot of coding.",
  },
  sv: {
    // Hero section
    hello: "Hej, jag är",
    name: "Alexander",
    title: "Halvledarteknik & försäljning",
    description: "Passionerad om att utveckla halvledarteknik och hårdvaruinnovation. Jag specialiserar mig på materialutveckling, enhetstillverkning och att föra banbrytande forskning från labb till produktion med precision och kreativitet.",
    getInTouch: "Kontakta mig",
    downloadResume: "Ladda ner CV",
    scrollExplore: "Scrolla för att utforska",
    
    // Navigation
    home: "Hem",
    about: "Om mig",
    projects: "Projekt",
    professional: "Professionell",
    education: "Utbildning",
    contact: "Kontakt",
    
    // Footer
    footerText: "Byggd med lite AI och mycket kodning.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "sv")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}