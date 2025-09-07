import { ArrowDown, Download, Linkedin, Mail, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "./TypewriterEffect";

export function Hero() {
  return (
    <section 
      id="home" 
      className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-primary/10 py-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/8 rounded-full blur-2xl animate-pulse-glow" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative">
              <img
                src="/lovable-uploads/fc819219-43d3-4817-b8da-08b472acd701.png"
                alt="Alexander - Professional Headshot"
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl ring-4 ring-white/10 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-primary/10 group-hover:to-primary/20 transition-all duration-500" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Animated greeting */}
            <div className="animate-fade-up space-y-6 mb-8" style={{ animationDelay: "0.2s" }}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <p className="text-sm font-medium text-primary tracking-wide">Available for opportunities</p>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.9]">
                  <TypewriterEffect 
                    text="Alexander Engman" 
                    speed={150}
                    className="block text-gradient font-handwritten"
                  />
                </h1>
              </div>
              
              <div className="relative">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground whitespace-nowrap">
                  Semiconductor engineering and sales
                </h2>
                <div className="absolute -bottom-2 left-0 lg:left-0 mx-auto lg:mx-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
              </div>
            </div>

            {/* Description */}
            <div className="animate-fade-up mb-8" style={{ animationDelay: "0.4s" }}>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Passionate about advancing semiconductor technology and hardware innovation. 
                I specialize in materials development, device fabrication, and bringing 
                cutting-edge research from lab to production with precision and creativity.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8" style={{ animationDelay: "0.6s" }}>
              <Button 
                size="lg" 
                variant="default" 
                className="hover-lift font-modern group relative overflow-hidden"
                onClick={() => {
                  import('@/lib/analytics').then(({ trackEvent }) => {
                    trackEvent('contact_button_click', { source: 'hero' });
                  });
                  window.location.href = 'mailto:hello@alexander.dev';
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Mail className="relative mr-2 h-4 w-4" />
                <span className="relative">Get In Touch</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="hover-lift font-modern group border-2 hover:border-primary/50"
                onClick={() => {
                  import('@/lib/analytics').then(({ trackEvent }) => {
                    trackEvent('cv_download_click', { source: 'hero' });
                  });
                }}
              >
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="animate-fade-up flex justify-center lg:justify-start gap-6" style={{ animationDelay: "0.8s" }}>
              <a 
                href="https://www.linkedin.com/in/alexanderengman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="relative h-14 w-14 bg-[#0A66C2] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2] to-[#004182] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center">
                    <span className="text-white font-bold text-lg">in</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
}