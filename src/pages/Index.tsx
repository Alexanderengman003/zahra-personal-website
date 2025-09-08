import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Professional } from "@/components/Professional";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { useAnalytics } from "@/hooks/useAnalytics";

const Index = () => {
  // Track page views automatically
  useAnalytics();

  return (
    <div className="smooth-scroll">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Professional />
        <Skills />
        <Education />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border/50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Alexander Engman. Built with some AI and a lot of coding.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/in/alexanderengman"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="mailto:alexander@engman.nu"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
