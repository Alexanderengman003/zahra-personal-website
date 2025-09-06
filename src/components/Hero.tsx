import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

export function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 hero-gradient opacity-90" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* Animated greeting */}
          <div className="animate-fade-up">
            <p className="text-lg font-medium text-primary-light mb-4">Hello, I'm</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Alexander
            </h1>
            <div className="mt-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gradient">
                Software Developer & Problem Solver
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <p className="mt-8 text-lg leading-8 text-gray-200 max-w-2xl mx-auto">
              Passionate about creating elegant solutions to complex problems. 
              I build web applications that are both beautiful and functional, 
              with a focus on user experience and clean code.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center mt-10" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" variant="hero" className="hover-lift">
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
            <Button variant="outline" size="lg" className="hover-lift border-white/30 text-white hover:bg-white/10">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="animate-fade-up flex justify-center gap-6 mt-8" style={{ animationDelay: "0.6s" }}>
            <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full hover:bg-white/10 text-white">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full hover:bg-white/10 text-white">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full hover:bg-white/10 text-white">
              <Mail className="h-5 w-5" />
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-fade-up mt-16" style={{ animationDelay: "0.8s" }}>
            <a
              href="#about"
              className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors animate-float"
            >
              <ArrowDown className="h-4 w-4 mr-2" />
              Scroll to explore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}