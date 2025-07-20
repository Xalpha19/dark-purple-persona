import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { SecureForm } from "@/components/SecureForm";
import { Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const handleFormSubmit = async (data: any) => {
    // In a real application, this would send data to your backend
    console.log('Secure form submission:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold glow-text">
                  Secure Contact
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Protected communication channel for cybersecurity consultations, 
                research collaboration, and professional inquiries.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Secure Contact Form */}
              <Card className="bg-gradient-card border-border/20 glow-purple">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Secure Message Form</h2>
                  </div>
                  
                  <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-primary">Security Features:</strong><br/>
                      • Input validation & sanitization<br/>
                      • Rate limiting protection<br/>
                      • Bot detection & honeypot filtering<br/>
                      • End-to-end form security
                    </p>
                  </div>
                  
                  <SecureForm onSubmit={handleFormSubmit} />
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="bg-gradient-card border-border/20 glow-purple">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Direct Contact</h2>
                    
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
                          <a href="tel:+447908791987" className="text-muted-foreground hover:text-primary transition-smooth">
                            07908791987
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
                          <p className="font-medium">Schedule Meeting</p>
                          <a href="https://calendly.com/ishaansr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-smooth">
                            Book a consultation
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border">
                      <a href="https://calendly.com/ishaansr" target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-gradient-primary glow-purple" size="lg">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule a Meeting
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Notice */}
                <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-primary mb-2">Security & Privacy</h3>
                        <p className="text-sm text-muted-foreground">
                          All communications are treated with strict confidentiality. 
                          For sensitive discussions, encrypted communication channels can be arranged.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;