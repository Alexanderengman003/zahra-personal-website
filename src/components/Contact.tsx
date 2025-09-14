import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTrackEvent } from "@/hooks/useTrackEvent";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "alexander@engman.nu",
    href: "mailto:alexander@engman.nu",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+46 73 322 43 78",
    href: "tel:+46733224378",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Stockholm, Sweden",
    href: "#",
  },
];

// Get EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

// Get reCAPTCHA site key from environment variables
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

export function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();
  const { track } = useTrackEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      toast({
        title: "Security check required",
        description: "Please complete the reCAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Track form submission attempt
      await track('contact_form_submission', {
        hasPhone: !!formData.phone,
        subjectLength: formData.subject.length,
        messageLength: formData.message.length,
        source: 'contact_form'
      });

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          to_email: "alexander@engman.nu",
        },
        EMAILJS_PUBLIC_KEY
      );

      // Track successful submission
      await track('contact_form_success', {
        source: 'contact_form'
      });

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      
      // Track form submission error
      await track('contact_form_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'contact_form'
      });

      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-spacing bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-header">Let's Work Together</h2>
          <p className="section-subheader">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 grid max-w-5xl grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h3 className="card-title mb-6 sm:mb-8">Get in touch</h3>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    <a
                      href={item.label === "Email" ? "mailto:alexander@engman.nu?subject=Contact from website" : item.href}
                      className="text-foreground hover:text-primary transition-colors"
                      onClick={() => {
                        if (item.label === "Email") {
                          track('contact_info_click', { type: 'email', source: 'contact_section' });
                        } else if (item.label === "Phone") {
                          track('contact_info_click', { type: 'phone', source: 'contact_section' });
                        }
                      }}
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 card-gradient rounded-2xl card-spacing">
              <h4 className="card-subtitle mb-3 sm:mb-4">
                Response Time
              </h4>
              <p className="card-description">
                I typically respond to messages within 24 hours. For urgent matters, 
                feel free to reach out via phone or LinkedIn.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-gradient rounded-2xl card-spacing shadow-medium">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2"
                  placeholder="+46 (0) 701234567"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-2"
                  placeholder="Project inquiry, collaboration, etc."
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2"
                  placeholder="Tell me about your project or what you'd like to discuss..."
                />
              </div>

              <div className="flex flex-col gap-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={setRecaptchaToken}
                  theme="light"
                />
                
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading || !recaptchaToken}
                  className="w-full hover-lift"
                >
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}