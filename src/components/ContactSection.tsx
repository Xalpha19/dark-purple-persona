import { Mail, Phone, MapPin, Send, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-24 relative">
      {/* Spline 3D Background for Contact Section */}
      <div className="absolute inset-0">
        <iframe 
          src="https://app.spline.design/file/9120bf79-3ddc-4d9d-8efa-a386dd7a353b"
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="absolute inset-0 opacity-30"
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Open for cybersecurity consulting, DFIR projects, and collaboration opportunities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-gradient-card border-border/50 glow-purple">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                  <div className="space-y-6">
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-purple">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <a 
                          href="mailto:contact@ishaansrv.com" 
                          className="text-muted-foreground hover:text-primary transition-smooth"
                        >
                          contact@ishaansrv.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-purple">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <a 
                          href="tel:+447394449386" 
                          className="text-muted-foreground hover:text-primary transition-smooth"
                        >
                          07394 449 386
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-purple">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">Edinburgh, Scotland, UK</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-purple">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Calendly</p>
                        <a 
                          href="https://calendly.com/ishaansr" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-smooth"
                        >
                          Schedule a Meeting
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-border space-y-3">
                    <a href="https://calendly.com/ishaansr" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-primary glow-purple mb-3" size="lg">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule a Meeting
                      </Button>
                    </a>
                    <Button variant="outline" className="w-full btn-outline-enhanced" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                  </div>

                  {/* Professional Links */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold mb-4">Professional Links</h4>
                    <div className="space-y-3">
                      <a 
                        href="https://linkedin.com/in/ishaansri" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-muted-foreground hover:text-primary transition-smooth"
                      >
                        LinkedIn Profile
                      </a>
                      <a 
                        href="https://irepository.gitbook.io/defensive-security/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-muted-foreground hover:text-primary transition-smooth"
                      >
                        GitBook Repository
                      </a>
                      <a 
                        href="https://journal.ishaansrv.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-muted-foreground hover:text-primary transition-smooth"
                      >
                        Cyber Journal
                      </a>
                      <a 
                        href="https://icybersec.wixsite.com/ishaans" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-muted-foreground hover:text-primary transition-smooth"
                      >
                        Technical Portfolio
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Contact Form */}
            <Card className="bg-gradient-card border-border/50 glow-purple">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Quick Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="quick-name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="quick-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-border focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="quick-email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="quick-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-border focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="quick-message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="quick-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="bg-background/50 border-border focus:border-primary resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-primary glow-purple" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;