import { ArrowDown, Download, Linkedin, Mail } from "lucide-react";
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
            <div className="animate-fade-up space-y-4 mb-8" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-3">
                <p className="text-xl font-medium text-primary tracking-wide font-modern">Hello, I'm</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[0.9] font-handwritten">
                  Alexander Engman
                </h1>
              </div>
              <div className="pt-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gradient leading-[1.2] tracking-wide font-modern">
                  Semiconductor Engineering & Sales
                </h2>
              </div>
            </div>

            {/* Description */}
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-modern">
                Passionate about advancing semiconductor technology and hardware innovation. 
                I specialize in materials development, device fabrication, and bringing 
                cutting-edge research from lab to production with precision and creativity.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8" style={{ animationDelay: "0.3s" }}>
              <Button 
                size="lg" 
                variant="default" 
                className="hover-lift font-modern"
                onClick={() => {
                  import('@/lib/analytics').then(({ trackEvent }) => {
                    trackEvent('contact_button_click', { source: 'hero' });
                  });
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="hover-lift font-modern"
                onClick={() => {
                  import('@/lib/analytics').then(({ trackEvent }) => {
                    trackEvent('cv_download_click', { source: 'hero' });
                  });
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="animate-fade-up flex justify-center lg:justify-start gap-6 mt-8" style={{ animationDelay: "0.4s" }}>
              <a href="https://www.linkedin.com/in/alexanderengman" target="_blank" rel="noopener noreferrer">
                <div className="h-12 w-12 bg-[#0077B5] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  <Linkedin className="h-6 w-6 text-white" />
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}