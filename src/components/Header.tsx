import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Professional", href: "/#professional" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 hidden lg:block">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 group">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg shadow-subtle group-hover:shadow-glow transition-all duration-300 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">A</span>
                </div>
              </div>
              <span className="text-xl font-bold text-gradient tracking-tight">Alexander</span>
            </div>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="-m-2.5 p-2.5"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            item.href.startsWith('#') ? (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            )
          ))}
        </div>

        {/* Theme toggle */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div 
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm shadow-2xl border-l border-border lg:hidden animate-slide-in-right"
          >
            <div className="flex items-center justify-between mb-6">
              <a href="/" className="-m-1.5 p-1.5 group">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg shadow-subtle group-hover:shadow-glow transition-all duration-300 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">A</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gradient tracking-tight">Alexander</span>
                </div>
              </a>
              <Button
                variant="ghost"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 p-2.5"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            
            <nav className="flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}