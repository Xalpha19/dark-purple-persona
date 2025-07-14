import { ArrowDown, Github, Linkedin, Mail, Shield, Search, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('experience');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center">
      {/* Spline 3D Background */}
      <div className="absolute inset-0">
        <iframe 
          src="https://community.spline.design/file/7506882b-6fe6-4305-9c2c-00cb12cc4c42" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="absolute inset-0 opacity-70"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-background/60"></div>
        
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
      
      {/* Content Overlay with Enhanced Readability */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-slide-up bg-gradient-to-r from-background/95 via-background/70 to-background/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
          <div className="mb-4">
            <span className="text-accent font-medium text-lg tracking-wider">SENIOR DFIR SPECIALIST</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text">
            Ishaan
            <span className="block heading-primary">
              Srivastava
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            Digital Forensics & Incident Response
          </h2>
          
          <h3 className="text-xl md:text-2xl text-accent mb-8">
            Threat Hunting Researcher
          </h3>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            "Protecting digital assets through advanced forensics and proactive threat detection"
          </p>
          
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
            >
              Download Resume
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a 
              href="https://github.com/ishaansrivastava" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 card-enhanced rounded-lg flex items-center justify-center cyber-hover group"
            >
              <Github className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://linkedin.com/in/ishaan-srivastava" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 card-enhanced rounded-lg flex items-center justify-center cyber-hover group"
            >
              <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="mailto:ishaansrivastava@proton.me"
              className="w-12 h-12 card-enhanced rounded-lg flex items-center justify-center cyber-hover group"
            >
              <Mail className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
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