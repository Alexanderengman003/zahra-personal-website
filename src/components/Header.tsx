import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Professional", href: "/#professional" },
  { name: "Voluntary", href: "/#voluntary" },
  // { name: "Projects", href: "/#projects" },
  { name: "Education", href: "/#education" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  return (
    <header className="sm:fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/#home" className="-m-1.5 p-1.5 group">
            <img 
              src="/zahra-logo.png" 
              alt="Zahra Farimani"
              className="h-12 w-auto transition-all duration-300 group-hover:opacity-80"
            />
          </a>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Theme toggle */}
        <div className="flex lg:flex-1 lg:justify-end">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}