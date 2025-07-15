import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CoreCompetencies from "@/components/CoreCompetencies";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Research from "@/components/Research";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CoreCompetencies />
      <Experience />
      <Education />
      <Research />
      <BlogSection />
      <ContactSection />
    </div>
  );
};

export default Index;
