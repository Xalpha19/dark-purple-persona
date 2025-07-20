import { ArrowDown, Linkedin, Mail, Shield, Search, Lock, MapPin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import codeSpaceAnimation from "@/assets/code-space-animation.jpg";

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('experience');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center">
      {/* Animated Code Space Background */}
      <div className="absolute inset-0">
        <img 
          src={codeSpaceAnimation}
          alt="Code Animation in Space"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div>
      
      {/* Clean CSS Gradient Background with Tech Patterns */}
      <div className="absolute inset-0 hero-gradient-bg opacity-50">
        {/* DFIR themed floating icons */}
        <div className="absolute top-1/3 left-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <Shield className="w-12 h-12 text-primary/30" />
        </div>
        <div className="absolute bottom-1/3 left-1/6 animate-float" style={{ animationDelay: '3s' }}>
          <Search className="w-10 h-10 text-accent/30" />
        </div>
        <div className="absolute top-3/4 left-1/3 animate-float" style={{ animationDelay: '5s' }}>
          <Lock className="w-8 h-8 text-primary/30" />
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6 items-center min-h-screen py-12">
          {/* Left Column - Content */}
          <div className="text-left animate-slide-up">
            <div className="bg-gradient-to-r from-background/40 via-background/35 to-background/30 backdrop-blur-sm rounded-2xl p-12 border-4 border-primary/30 w-[150%] relative overflow-hidden -translate-y-32">
              {/* Content Overlay */}
              <div className="relative z-10">
                {/* Professional Tagline */}
                <div className="mb-6">
                  <span className="text-primary font-medium text-base tracking-wide">
                    SENIOR THREAT HUNTING AND INCIDENCE RESPONSE ANALYST
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
                  Ishaan
                  <span className="block heading-primary">
                    Srivastava
                  </span>
                </h1>
                
                {/* Location */}
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg text-muted-foreground">Edinburgh, Scotland, 🇬🇧</span>
                </div>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  "Protecting digital assets through advanced forensics and proactive threat detection"
                </p>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
                <div className="flex gap-6">
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
          </div>
          
          {/* Right Column - Photo */}
          <div className="flex justify-center lg:justify-end animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl transform rotate-3"></div>
              <img 
                src="/lovable-uploads/0e5e242a-c425-4668-acb8-5dda74e3b6ef.png"
                alt="Ishaan Srivastava"
                className="relative w-80 h-96 md:w-96 md:h-[32rem] object-cover rounded-3xl shadow-2xl border border-primary/20 -translate-y-24"
              />
            </div>
          </div>
        </div>
      </div>
      

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
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