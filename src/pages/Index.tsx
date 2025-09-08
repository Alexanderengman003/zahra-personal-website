import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Professional } from "@/components/Professional";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { useAnalytics } from "@/hooks/useAnalytics";
import ProtectedAnalytics from "@/components/ProtectedAnalytics";

const Index = () => {
  // Track page views automatically
  useAnalytics();
  
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Secret key combination: Ctrl + Shift + A (desktop) or tap sequence on mobile
  useEffect(() => {
    let tapCount = 0;
    let tapTimer: NodeJS.Timeout;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        
        // Track desktop analytics access
        import('@/hooks/useTrackEvent').then(({ useTrackEvent }) => {
          const { track } = useTrackEvent();
          track('analytics_access_desktop', { method: 'keyboard_shortcut', source: 'ctrl_shift_a' });
        });
        
        setShowAnalytics(true);
      }
    };

    const handleMobileTap = (event: TouchEvent) => {
      // Only trigger on footer taps to avoid interfering with normal usage
      const target = event.target as HTMLElement;
      if (target.closest('footer')) {
        tapCount++;
        
        if (tapCount === 1) {
          tapTimer = setTimeout(() => {
            tapCount = 0;
          }, 3000); // Reset after 3 seconds
        }
        
        if (tapCount === 7) { // 7 taps in footer area
          clearTimeout(tapTimer);
          tapCount = 0;
          
          // Track mobile analytics access
          import('@/hooks/useTrackEvent').then(({ useTrackEvent }) => {
            const { track } = useTrackEvent();
            track('analytics_access_mobile', { method: 'tap_sequence', source: 'footer' });
          });
          
          setShowAnalytics(true);
        }
      }
    };

    // Desktop: keyboard shortcut
    window.addEventListener('keydown', handleKeyPress);
    
    // Mobile: touch sequence
    window.addEventListener('touchstart', handleMobileTap);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleMobileTap);
      if (tapTimer) clearTimeout(tapTimer);
    };
  }, []);

  // Prevent body scroll when analytics is open
  useEffect(() => {
    if (showAnalytics) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAnalytics]);

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
      <footer className="bg-card border-t border-border/50 py-12 relative">
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
                href="mailto:alexander@engman.nu?subject=Contact from website"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Email
              </a>
            </div>
            {/* Hidden mobile instruction - only visible on small screens */}
            <div className="mt-2 text-xs text-muted-foreground/50 block sm:hidden">
              Tap 7 times here for analytics
            </div>
          </div>
        </div>
      </footer>
      
      {/* Hidden Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 z-50 overflow-auto">
          <ProtectedAnalytics onClose={() => setShowAnalytics(false)} />
        </div>
      )}
    </div>
  );
};

export default Index;
