import { useState } from "react";
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

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full pt-20 px-6">
              <nav className="flex flex-col space-y-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={handleNavClick}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border/50 last:border-b-0"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
}