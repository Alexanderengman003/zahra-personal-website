import { ArrowDown, Download, Linkedin, Mail, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrackEvent } from "@/hooks/useTrackEvent";

export function Hero() {
  const { track } = useTrackEvent();
  
  return (
    <section 
      id="home" 
      className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-primary/10 pt-8 sm:pt-32 pb-12"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/8 rounded-full blur-2xl animate-pulse-glow" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Profile Image */}
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl group-hover:blur-2xl group-hover:scale-110 transition-all duration-700" />
            <div className="relative transform group-hover:scale-105 transition-transform duration-500 ease-out">
              <img
                src="/zahra-profile.jpg"
                alt="Zahra Farimani - Senior Product Manager at PayPal, Fintech and Health Tech Expert based in Stockholm, Sweden"
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl ring-4 ring-white/10 group-hover:ring-primary/30 group-hover:shadow-3xl transition-all duration-500"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-primary/10 group-hover:to-primary/25 transition-all duration-500" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-left max-w-2xl">
            {/* Animated greeting */}
            <div className="animate-fade-up space-y-8 mb-8" style={{ animationDelay: "0.2s" }}>
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight font-modern mb-4">
                  <span className="block text-gradient">Zahra Farimani</span>
                </h1>
              
                <div className="relative">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-muted-foreground">
                    Senior Product Manager | Fintech & Health Tech Expert
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-base text-muted-foreground">Stockholm</span>
                  </div>
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="animate-fade-up mb-6" style={{ animationDelay: "0.4s" }}>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl text-justify">
                Senior Product Manager at PayPal with expertise in leading cross-functional teams, driving product strategy, and building innovative solutions in fintech and health tech. Passionate about creating products that make a meaningful impact on users' lives.
              </p>
            </div>

            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-start" style={{ animationDelay: "0.6s" }}>
              <Button
                size="lg" 
                className="hover-lift font-modern group bg-purple-800 hover:bg-purple-900 border-purple-800 text-white"
                onClick={() => {
                  track('linkedin_click', { source: 'hero' });
                  window.open('https://www.linkedin.com/in/zahra-farimani/', '_blank');
                }}
              >
                LinkedIn
              </Button>
              <Button 
                size="lg" 
                className="hover-lift font-modern group bg-purple-600 hover:bg-purple-700 text-white relative overflow-hidden rounded-md"
                onClick={() => {
                  track('contact_button_click', { source: 'hero' });
                  window.location.href = 'mailto:zahra.farimani@gmail.com?subject=Contact from website&body=Hello Zahra,';
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
                <Mail className="relative mr-2 h-4 w-4" />
                <span className="relative">Get In Touch</span>
              </Button>
              <Button 
                size="lg" 
                className="hover-lift font-modern group bg-purple-400 hover:bg-purple-500 text-white"
                onClick={() => {
                  track('cv_download_click', { source: 'hero' });
                  const link = document.createElement('a');
                  link.href = '/CV_Zahra_Farimani_2025.pdf';
                  link.download = 'Zahra_Farimani_CV_2025.pdf';
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
      </div>

    </section>
  );
}