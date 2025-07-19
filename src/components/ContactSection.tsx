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
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon."
    });
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return <section className="py-24 relative">
      
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
                        <a href="mailto:contact@ishaansrv.com" className="text-muted-foreground hover:text-primary transition-smooth">
                          contact@ishaansrv.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-purple">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Phone (WhatsApp)</p>
                        <a href="tel:+447394449386" className="text-muted-foreground hover:text-primary transition-smooth">07908791987</a>
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
                        <a href="https://calendly.com/ishaansr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-smooth">
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
                    <img 
                      src="/lovable-uploads/45f71e23-7955-4485-81aa-9112ced904d2.png" 
                      alt="QR Code" 
                      className="w-full rounded-lg"
                    />
                  </div>

                  {/* Professional Links */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold mb-4">Professional Links</h4>
                    <div className="flex gap-4 justify-center">
                      <a href="https://linkedin.com/in/ishaansri" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-smooth glow-purple" title="LinkedIn Profile">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a href="https://irepository.gitbook.io/defensive-security/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-smooth glow-purple" title="GitBook Repository">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10.802 17.77a.703.703 0 11-.002 1.406.703.703 0 01.002-1.406m11.024-4.347a.703.703 0 11.001-1.406.703.703 0 01-.001 1.406m0-2.876a2.176 2.176 0 00-2.174 2.174c0 .233.039.465.115.691l-7.181 3.823a2.165 2.165 0 00-1.784-.937c-.829 0-1.584.475-1.95 1.216l-6.451-3.402c-.682-.358-1.192-1.48-1.192-2.624 0-1.183.534-2.297 1.264-2.644L17.979 2.79c.73-.347 1.264.084 1.264 1.267v7.365c0 .4.152.77.399 1.067l1.535 1.325a2.167 2.167 0 012.174-2.174" />
                        </svg>
                      </a>
                      <a href="https://journal.ishaansrv.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-smooth glow-purple" title="Cyber Journal">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </a>
                      <a href="https://icybersec.wixsite.com/ishaans" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-smooth glow-purple" title="Technical Portfolio">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
                        </svg>
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
                    <Input id="quick-name" name="name" value={formData.name} onChange={handleChange} required className="bg-background/50 border-border focus:border-primary" placeholder="Your name" />
                  </div>
                  
                  <div>
                    <label htmlFor="quick-email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input id="quick-email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-background/50 border-border focus:border-primary" placeholder="your.email@example.com" />
                  </div>
                  
                  <div>
                    <label htmlFor="quick-message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea id="quick-message" name="message" value={formData.message} onChange={handleChange} required rows={4} className="bg-background/50 border-border focus:border-primary resize-none" placeholder="Tell me about your project..." />
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
      <div id="contact-bottom"></div>
    </section>;
};
export default ContactSection;