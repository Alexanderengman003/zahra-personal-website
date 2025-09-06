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
    // Navigation
    home: "Home",
    about: "About",
    projects: "Projects",
    professional: "Professional",
    education: "Education",
    contact: "Contact",
    
    // Hero section
    hello: "Hello, I'm",
    name: "Alexander",
    title: "Semiconductor engineering & sales",
    description: "Passionate about advancing semiconductor technology and hardware innovation. I specialize in materials development, device fabrication, and bringing cutting-edge research from lab to production with precision and creativity.",
    getInTouch: "Get In Touch",
    downloadResume: "Download Resume",
    scrollExplore: "Scroll to explore",
    
    // About section
    aboutTitle: "About Me",
    aboutDescription: "I'm a materials science engineer with expertise in semiconductor technology and a passion for developing innovative solutions in hardware and medical device manufacturing.",
    myJourney: "My Journey",
    journeyDescription: "My background stems from a bachelor's degree in Materials Science and Engineering and a master's in nanotechnology from KTH Royal Institute of Technology in Stockholm. I've gained diverse experience in fields such as materials development, semiconductor fabrication, and medical device design. My key strengths include being a quick learner, possessing a creative mindset, and maintaining a keen eye for detail in all my work.",
    semiconductors: "Semiconductors",
    semiconductorsDesc: "Experience in MEMS, CMOS design, semiconductor physics, and cleanroom fabrication processes.",
    medicalTech: "Medical technology",
    medicalTechDesc: "Developing medical devices from concept to market, ensuring ISO 13485 and MDR compliance.",
    projectManagement: "Project management",
    projectManagementDesc: "Leading cross-functional teams using AGILE methodology to deliver innovative products on time.",
    businessDev: "Business development",
    businessDevDesc: "Engaging with customers, forging strategic partnerships, and expanding market reach for growth.",
    softwareDev: "Software development",
    softwareDevDesc: "Programming experience in multiple languages for standalone projects and hardware interfacing.",
    sales: "Sales",
    salesDesc: "Building customer relationships, identifying market opportunities, and driving revenue through strategic sales initiatives.",
    
    // Projects section
    projectsTitle: "Featured Projects",
    projectsDescription: "A collection of projects that showcase my skills and passion for building innovative solutions.",
    searchProjects: "Search projects, technologies...",
    allCategories: "All",
    noResults: "No projects found matching your criteria. Try adjusting your search or filter.",
    
    // Professional section
    professionalTitle: "Professional Experience",
    professionalDescription: "My professional journey in semiconductor engineering, materials science, and technical sales.",
    keyResponsibilities: "Key Responsibilities",
    
    // Education section
    educationTitle: "Education & Certifications",
    educationDescription: "My academic background and professional certifications that shaped my technical expertise.",
    academicEducation: "Academic Education",
    certifications: "Certifications",
    continuousLearning: "Continuous Learning",
    continuousLearningDesc: "Actively pursuing additional certifications in cloud architecture, DevOps practices, and emerging technologies to stay current with industry trends.",
     
    // Contact section
    contactTitle: "Let's Work Together",
    contactDescription: "Have a project in mind or just want to chat? I'd love to hear from you.",
    getInTouchTitle: "Get in touch",
    responseTime: "Response Time",
    responseTimeDesc: "I typically respond to messages within 24 hours. For urgent matters, feel free to reach out via phone or LinkedIn.",
    formName: "Name",
    namePlaceholder: "Your name",
    formEmail: "Email",
    emailPlaceholder: "your@email.com",
    subject: "Subject",
    subjectPlaceholder: "Project inquiry, collaboration, etc.",
    message: "Message",
    messagePlaceholder: "Tell me about your project or what you'd like to discuss...",
    sendMessage: "Send Message",
    sending: "Sending...",
    
    // Footer
    footerText: "Built with some AI and a lot of coding.",
  },
  sv: {
    // Navigation
    home: "Hem",
    about: "Om mig",
    projects: "Projekt",
    professional: "Professionell",
    education: "Utbildning",
    contact: "Kontakt",
    
    // Hero section
    hello: "Hej, jag är",
    name: "Alexander",
    title: "Halvledarteknik & försäljning",
    description: "Passionerad om att utveckla halvledarteknik och hårdvaruinnovation. Jag specialiserar mig på materialutveckling, enhetstillverkning och att föra banbrytande forskning från labb till produktion med precision och kreativitet.",
    getInTouch: "Kontakta mig",
    downloadResume: "Ladda ner CV",
    scrollExplore: "Scrolla för att utforska",
    
    // About section
    aboutTitle: "Om mig",
    aboutDescription: "Jag är en materialvetenskapsingenjör med expertis inom halvledarteknik och en passion för att utveckla innovativa lösningar inom hårdvara och medicinteknisk tillverkning.",
    myJourney: "Min resa",
    journeyDescription: "Min bakgrund kommer från en kandidatexamen i Materialvetenskap och Teknik och en master i nanoteknik från KTH Kungliga Tekniska högskolan i Stockholm. Jag har fått mångsidig erfarenhet inom områden som materialutveckling, halvledartillverkning och medicinteknisk design. Mina huvudstyrkor inkluderar att vara en snabb inlärare, ha ett kreativt tänk och upprätthålla ett skarpt öga för detaljer i allt mitt arbete.",
    semiconductors: "Halvledare",
    semiconductorsDesc: "Erfarenhet inom MEMS, CMOS-design, halvledarfysik och renrumsprocesser.",
    medicalTech: "Medicinsk teknik",
    medicalTechDesc: "Utveckling av medicintekniska produkter från koncept till marknad, säkerställande av ISO 13485 och MDR-efterlevnad.",
    projectManagement: "Projektledning",
    projectManagementDesc: "Leder tvärfunktionella team med AGILE-metodik för att leverera innovativa produkter i tid.",
    businessDev: "Affärsutveckling",
    businessDevDesc: "Engagerar kunder, skapar strategiska partnerskap och utökar marknadsräckvidd för tillväxt.",
    softwareDev: "Mjukvaruutveckling",
    softwareDevDesc: "Programmeringsexperiens i flera språk för fristående projekt och hårdvarugränssnitt.",
    sales: "Försäljning",
    salesDesc: "Bygger kundrelationer, identifierar marknadsmöjligheter och driver intäkter genom strategiska försäljningsinitiativ.",
    
    // Projects section
    projectsTitle: "Utvalda projekt",
    projectsDescription: "En samling projekt som visar mina färdigheter och passion för att bygga innovativa lösningar.",
    searchProjects: "Sök projekt, teknologier...",
    allCategories: "Alla",
    noResults: "Inga projekt hittades som matchar dina kriterier. Prova att justera din sökning eller filter.",
    
    // Professional section
    professionalTitle: "Professionell erfarenhet",
    professionalDescription: "Min professionella resa inom halvledarteknik, materialvetenskap och teknisk försäljning.",
    keyResponsibilities: "Huvudansvar",
    
    // Education section
    educationTitle: "Utbildning & certifieringar",
    educationDescription: "Min akademiska bakgrund och professionella certifieringar som formade min tekniska expertis.",
    academicEducation: "Akademisk utbildning",
    certifications: "Certifieringar",
    continuousLearning: "Kontinuerlig inlärning",
    continuousLearningDesc: "Aktivt strävar efter ytterligare certifieringar inom molnarkitektur, DevOps-praxis och nya teknologier för att hålla sig uppdaterad med branschtrender.",
    
    // Contact section
    contactTitle: "Låt oss arbeta tillsammans",
    contactDescription: "Har du ett projekt i åtanke eller vill bara prata? Jag skulle gärna höra från dig.",
    getInTouchTitle: "Kom i kontakt",
    responseTime: "Svarstid",
    responseTimeDesc: "Jag svarar vanligtvis på meddelanden inom 24 timmar. För brådskande ärenden, tveka inte att kontakta mig via telefon eller LinkedIn.",
    formName: "Namn",
    namePlaceholder: "Ditt namn",
    formEmail: "E-post",
    emailPlaceholder: "din@email.com",
    subject: "Ämne",
    subjectPlaceholder: "Projektförfrågan, samarbete, etc.",
    message: "Meddelande",
    messagePlaceholder: "Berätta om ditt projekt eller vad du skulle vilja diskutera...",
    sendMessage: "Skicka meddelande",
    sending: "Skickar...",
    
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