
import { ArrowDown, Linkedin, Mail, Shield, Search, Lock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUpVariants, fadeInLeftVariants, fadeInRightVariants } from "@/hooks/useScrollAnimation";
import codeSpaceAnimation from "@/assets/code-space-animation.jpg";

const Hero = () => {
  const {
    ref: heroRef,
    controls: heroControls
  } = useScrollAnimation(0.2);
  const {
    ref: contentRef,
    controls: contentControls
  } = useScrollAnimation(0.3);
  const {
    ref: imageRef,
    controls: imageControls
  } = useScrollAnimation(0.3);
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('experience');
    nextSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <motion.section 
      ref={heroRef} 
      initial="hidden" 
      animate={heroControls} 
      variants={fadeInUpVariants} 
      className="min-h-screen min-h-[100dvh] relative flex items-center justify-center overflow-hidden"
    >
      {/* Animated Code Space Background */}
      <div className="absolute inset-0">
        <img 
          src={codeSpaceAnimation} 
          alt="Code Animation in Space" 
          className="w-full h-full object-cover animate-slow-zoom" 
        />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm"></div>
      </div>
      
      {/* Clean CSS Gradient Background with Tech Patterns */}
      <div className="absolute inset-0 hero-gradient-bg opacity-50">
        {/* DFIR themed floating icons - hidden on mobile for better performance */}
        <div className="hidden md:block absolute top-1/3 left-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <Shield className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-primary/30" />
        </div>
        <div className="hidden md:block absolute bottom-1/3 left-1/6 animate-float" style={{ animationDelay: '3s' }}>
          <Search className="w-4 h-4 md:w-6 md:h-6 lg:w-10 lg:h-10 text-accent/30" />
        </div>
        <div className="hidden md:block absolute top-3/4 left-1/3 animate-float" style={{ animationDelay: '5s' }}>
          <Lock className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-primary/30" />
        </div>
      </div>
      
      {/* Responsive Container with Enhanced Mobile Support */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 max-w-7xl w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center justify-center min-h-[90vh] min-h-[90dvh] py-4 sm:py-6 lg:py-8">
          
          {/* Content Column - Responsive Layout */}
          <motion.div 
            ref={contentRef} 
            initial="hidden" 
            animate={contentControls} 
            variants={fadeInLeftVariants} 
            className="order-2 lg:order-1 w-full flex items-center justify-center"
          >
            <div className="bg-gradient-to-r from-background/70 via-background/65 to-background/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 border border-primary/20 sm:border-2 sm:border-primary/30 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none relative overflow-hidden">
              {/* Content */}
              <div className="relative z-10 text-center lg:text-left">
                {/* Professional Tagline */}
                <div className="mb-3 sm:mb-4 lg:mb-6">
                  <span className="text-primary font-medium text-xs sm:text-sm lg:text-base xl:text-lg tracking-wide block leading-tight">
                    SENIOR THREAT HUNTING AND INCIDENT RESPONSE ANALYST
                  </span>
                </div>
                
                {/* Name - Responsive Typography */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 glow-text leading-tight">
                  Ishaan
                  <span className="block heading-primary">
                    Srivastava
                  </span>
                </h1>
                
                {/* Location */}
                <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-2 mb-3 sm:mb-4 lg:mb-6">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm lg:text-base xl:text-lg text-muted-foreground">Edinburgh, Scotland, 🇬🇧</span>
                </div>
                
                {/* Tagline */}
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                  "Protecting digital assets through advanced forensics and proactive threat detection"
                </p>
                
                {/* CTAs - Responsive Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 justify-center lg:justify-start">
                  <Button 
                    size="sm" 
                    className="btn-enhanced text-xs sm:text-sm lg:text-base px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 w-full sm:w-auto min-h-[44px]" 
                    onClick={scrollToNextSection}
                  >
                    View My Work
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="btn-outline-enhanced text-xs sm:text-sm lg:text-base px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 w-full sm:w-auto min-h-[44px]" 
                    asChild
                  >
                    <a href="/lovable-uploads/Ishaan_Srivastava_Resume.pdf" download="Ishaan_Srivastava_Resume.pdf" target="_blank" rel="noopener noreferrer">
                      Download Resume
                    </a>
                  </Button>
                </div>
                
                {/* Professional Links - Touch-Friendly */}
                <div className="flex gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start">
                  <a 
                    href="https://linkedin.com/in/ishaansri" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 sm:w-12 sm:h-12 card-enhanced rounded-lg flex items-center justify-center cyber-hover group min-h-[44px] min-w-[44px]"
                  >
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <a 
                    href="mailto:contact@ishaansrv.com" 
                    className="w-10 h-10 sm:w-12 sm:h-12 card-enhanced rounded-lg flex items-center justify-center cyber-hover group min-h-[44px] min-w-[44px]"
                  >
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <a 
                    href="https://calendly.com/ishaansr/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 card-enhanced rounded-lg flex items-center justify-center cyber-hover group min-h-[44px] min-w-[44px]"
                  >
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Image Column - Responsive Image Container */}
          <motion.div 
            ref={imageRef} 
            initial="hidden" 
            animate={imageControls} 
            variants={fadeInRightVariants} 
            className="order-1 lg:order-2 w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl blur-xl transform rotate-3"></div>
              <img 
                src="/lovable-uploads/0e5e242a-c425-4668-acb8-5dda74e3b6ef.png" 
                alt="Ishaan Srivastava" 
                className="relative w-full h-auto aspect-[4/5] object-cover rounded-2xl sm:rounded-3xl shadow-2xl border border-primary/20 mx-auto" 
                loading="eager"
                style={{ 
                  maxHeight: '70vh',
                  objectFit: 'cover',
                  objectPosition: 'center top'
                }}
              />
            </div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Enhanced scroll indicator - Touch-friendly */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <button 
          onClick={scrollToNextSection} 
          className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-primary/50 rounded-full flex justify-center pt-1 sm:pt-2 hover:border-primary hover:shadow-purple-glow transition-smooth cyber-hover min-h-[44px] min-w-[44px]"
          aria-label="Scroll to next section"
        >
          <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-pulse" />
        </button>
      </div>
    </motion.section>
  );
};

export default Hero;
