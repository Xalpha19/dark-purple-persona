import { Mail, Phone, MapPin, Send, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUpVariants, fadeInLeftVariants, fadeInRightVariants } from "@/hooks/useScrollAnimation";
const ContactSection = () => {
  const {
    ref: sectionRef,
    controls: sectionControls
  } = useScrollAnimation(0.1);
  const {
    ref: titleRef,
    controls: titleControls
  } = useScrollAnimation(0.2);
  const {
    ref: formRef,
    controls: formControls
  } = useScrollAnimation(0.2);
  const {
    ref: infoRef,
    controls: infoControls
  } = useScrollAnimation(0.2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [captcha, setCaptcha] = useState({
    question: "",
    answer: 0
  });
  const [captchaInput, setCaptchaInput] = useState("");
  const {
    toast
  } = useToast();

  // Generate random math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let answer;
    let question;
    switch (operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        answer = num1 - num2;
        question = `${num1} - ${num2}`;
        break;
      case '*':
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
    }
    setCaptcha({
      question,
      answer
    });
  };

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate captcha
    if (parseInt(captchaInput) !== captcha.answer) {
      toast({
        title: "Captcha Failed",
        description: "Please solve the math problem correctly.",
        variant: "destructive"
      });
      generateCaptcha(); // Generate new captcha
      setCaptchaInput("");
      return;
    }

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
    setCaptchaInput("");
    generateCaptcha(); // Generate new captcha for next submission
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return <motion.section ref={sectionRef} initial="hidden" animate={sectionControls} variants={fadeInUpVariants} id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div ref={titleRef} initial="hidden" animate={titleControls} variants={fadeInUpVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Open to cybersecurity consultation, research engagements, and professional partnerships.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Quick Contact Form - Moved Left */}
            <motion.div ref={formRef} initial="hidden" animate={formControls} variants={fadeInLeftVariants} className="lg:order-1">
              <Card className="bg-gradient-card border-border/20 glow-purple">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Quick Message</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    For detailed inquiries, please use the <Link to="/contact" className="text-primary hover:underline">secure contact form</Link>.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Professional Consultation</h4>
                      <p className="text-sm text-muted-foreground">
                        For cybersecurity consultation, threat hunting services, or incident response support.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                      <h4 className="font-semibold text-secondary mb-2">Research Collaboration</h4>
                      <p className="text-sm text-muted-foreground">
                        Academic partnerships, research projects, and knowledge sharing opportunities.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2">Speaking Engagements</h4>
                      <p className="text-sm text-muted-foreground">
                        Conference presentations, workshops, and cybersecurity training sessions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <Link to="/contact">
                      <Button className="w-full bg-gradient-primary glow-purple" size="lg">
                        <Send className="w-4 h-4 mr-2" />
                        Open Secure Contact Form
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info - Moved Right */}
            <motion.div ref={infoRef} initial="hidden" animate={infoControls} variants={fadeInRightVariants} className="lg:order-2 space-y-8">
              <Card className="bg-gradient-card border-border/50 glow-purple">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
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

                    
                  </div>

                  <div className="mt-8 pt-8 border-t border-border space-y-3">
                    <a href="https://calendly.com/ishaansr/30min" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-primary glow-purple mb-3" size="lg">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule a Meeting
                      </Button>
                    </a>
                    <a href="https://linktr.ee/ishaansri" target="_blank" rel="noopener noreferrer">
                      <img src="/lovable-uploads/45f71e23-7955-4485-81aa-9112ced904d2.png" alt="QR Code" className="w-2/5 rounded-lg mx-auto cursor-pointer hover:opacity-80 transition-opacity" />
                    </a>
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
                      <a href="https://discordapp.com/users/636054320575414273" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-smooth glow-purple" title="Discord Profile">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.191.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                        </svg>
                      </a>
                      <a href="https://x.com/X19Alpha" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-smooth glow-purple" title="Twitter X Profile">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <div id="contact-bottom"></div>
    </motion.section>;
};
export default ContactSection;