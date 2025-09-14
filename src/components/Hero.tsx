import { ArrowDown, Download, Linkedin, Mail, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrackEvent } from "@/hooks/useTrackEvent";

export function Hero() {
  const { track } = useTrackEvent();
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient section-spacing"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/8 rounded-full blur-2xl animate-pulse-glow" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center content-spacing">
          <img 
            src="/lovable-uploads/9b0d7032-cf5a-41a6-bd1e-478738857d3e.png"
            alt="Alexander Engman professional headshot"
            className="mx-auto h-32 sm:h-40 lg:h-48 w-32 sm:w-40 lg:w-48 rounded-full object-cover shadow-xl ring-4 ring-white/20 hover:scale-105 transition-transform duration-300"
          />
          
          <div className="space-y-3 sm:space-y-4">
            <h1 className="hero-title animate-fade-in">
              <span className="block">Alexander</span>
              <span className="block text-gradient">Engman</span>
            </h1>
            <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Semiconductor Sales Professional
            </p>
            <p className="hero-description animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Bridging the gap between cutting-edge semiconductor technology and customer needs, 
              driving innovation in materials science and nanotechnology applications.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              variant="outline"
              className="hover-lift group border-2 hover:border-primary/50 bg-[#0A66C2] hover:bg-[#004182] border-[#0A66C2] text-white"
              onClick={() => {
                track('linkedin_click', { source: 'hero' });
                window.open('https://www.linkedin.com/in/alexanderengman', '_blank');
              }}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
            <Button 
              size="lg" 
              variant="default" 
              className="hover-lift group relative overflow-hidden"
              onClick={() => {
                track('contact_button_click', { source: 'hero' });
                window.location.href = 'mailto:alexander@engman.nu?subject=Contact from website&body=Hello Alexander,';
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Mail className="relative mr-2 h-4 w-4" />
              <span className="relative">Get In Touch</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="hover-lift group border-2 hover:border-primary/50"
              onClick={() => {
                track('cv_download_click', { source: 'hero' });
                const link = document.createElement('a');
                link.href = '/CV_Alexander_Engman_2025.pdf';
                link.download = 'CV_Alexander_Engman_2025.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Download Resume
            </Button>
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