import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section 
      id="home" 
      className="bg-background pt-24 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <div className="animate-fade-up">
            <div className="relative">
              <img
                src="/lovable-uploads/fc819219-43d3-4817-b8da-08b472acd701.png"
                alt="Alexander - Professional Headshot"
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-large"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Animated greeting */}
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <p className="text-lg font-medium text-primary mb-1">Hello, I'm</p>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Alexander
              </h1>
              <div className="mt-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gradient">
                  Materials Science Engineer
                </h2>
              </div>
            </div>

            {/* Description */}
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <p className="mt-8 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Passionate about advancing semiconductor technology and hardware innovation. 
                I specialize in materials development, device fabrication, and bringing 
                cutting-edge research from lab to production with precision and creativity.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-10" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" variant="default" className="hover-lift">
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" className="hover-lift">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="animate-fade-up flex justify-center lg:justify-start gap-6 mt-8" style={{ animationDelay: "0.4s" }}>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full hover:bg-accent">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full hover:bg-accent">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full hover:bg-accent">
                <Mail className="h-5 w-5" />
              </Button>
            </div>

            {/* Scroll indicator */}
            <div className="animate-fade-up mt-12" style={{ animationDelay: "0.5s" }}>
              <a
                href="#about"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowDown className="h-4 w-4 mr-2" />
                Scroll to explore
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}