import { ArrowDown, Linkedin, Mail, Shield, Search, Lock, MapPin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('experience');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center">
      {/* Clean CSS Gradient Background with Tech Patterns */}
      <div className="absolute inset-0 hero-gradient-bg">
        {/* DFIR themed floating icons */}
        <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <Shield className="w-12 h-12 text-primary/30" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: '3s' }}>
          <Search className="w-10 h-10 text-accent/30" />
        </div>
        <div className="absolute top-3/4 right-1/3 animate-float" style={{ animationDelay: '5s' }}>
          <Lock className="w-8 h-8 text-primary/30" />
        </div>
      </div>
      
      {/* Content with Professional Information */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-slide-up bg-gradient-to-r from-background/18 via-background/12 to-background/8 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
          {/* Professional Tagline */}
          <div className="mb-6">
            <span className="text-primary font-medium text-base tracking-wide">
              SENIOR THREAT HUNTING AND INCIDENCE RESPONSE ANALYST
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text">
            Ishaan
            <span className="block heading-primary">
              Srivastava
            </span>
          </h1>
          
          {/* Location */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-lg text-muted-foreground">Edinburgh, Scotland, 🇬🇧</span>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            "Protecting digital assets through advanced forensics and proactive threat detection"
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="btn-enhanced text-lg px-8 py-6"
              onClick={scrollToNextSection}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-outline-enhanced text-lg px-8 py-6"
              asChild
            >
              <a 
                href="/lovable-uploads/Ishaan_Srivastava_Resume.pdf" 
                download="Ishaan_Srivastava_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </Button>
          </div>
          
          {/* Professional Links */}
          <div className="flex justify-center gap-6">
            <a 
              href="https://linkedin.com/in/ishaansri" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 card-enhanced rounded-lg flex items-center justify-center cyber-hover group"
            >
              <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="mailto:contact@ishaansrv.com"
              className="w-12 h-12 card-enhanced rounded-lg flex items-center justify-center cyber-hover group"
            >
              <Mail className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://x.com/X19Alpha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 card-enhanced rounded-lg flex items-center justify-center cyber-hover group"
            >
              <Twitter className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToNextSection}
          className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center pt-2 hover:border-primary hover:shadow-purple-glow transition-smooth cyber-hover"
        >
          <ArrowDown className="w-4 h-4 text-primary animate-pulse" />
        </button>
      </div>
    </section>
  );
};

export default Hero;