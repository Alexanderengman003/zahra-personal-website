import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Professional", href: "/#professional" },
  { name: "Contact", href: "/#contact" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative z-50 transition-all duration-200 hover:bg-secondary ${
          isOpen ? 'bg-secondary' : ''
        }`}
        aria-label="Toggle navigation menu"
      >
        <div className="relative w-6 h-6">
          <Menu 
            className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
              isOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'
            }`} 
          />
          <X 
            className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
              isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'
            }`} 
          />
        </div>
      </Button>

      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu panel */}
        <div className={`fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] glass border-l border-border/50 transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-2">
                {navigation.map((item, index) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={handleNavClick}
                      className={`flex items-center px-4 py-3 rounded-xl text-foreground font-medium hover:bg-secondary/50 transition-all duration-200 transform hover:translate-x-1 group ${
                        isOpen ? 'animate-fade-in' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-muted-foreground mr-3 group-hover:text-primary transition-colors">
                        •
                      </span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                Alexander Engman Portfolio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}