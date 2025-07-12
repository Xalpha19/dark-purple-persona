import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Leading development of modern web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting scalable solutions for enterprise clients.",
      technologies: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL", "Docker"],
      achievements: [
        "Improved application performance by 40% through optimization",
        "Led a team of 5 developers on a major product redesign",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ]
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Digital Innovation Labs",
      location: "New York, NY",
      period: "2020 - 2022",
      description: "Developed responsive web applications and mobile-first designs. Collaborated with UX/UI designers to create intuitive user experiences and implemented modern frontend architectures.",
      technologies: ["React", "Vue.js", "JavaScript", "SASS", "Webpack", "Jest"],
      achievements: [
        "Built 15+ responsive web applications",
        "Reduced bundle size by 35% through optimization techniques",
        "Implemented design system used across 8 products"
      ]
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "StartupFlow",
      location: "Austin, TX",
      period: "2019 - 2020",
      description: "Started my professional journey building dynamic websites and learning modern development practices. Gained experience in full-stack development and agile methodologies.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "WordPress"],
      achievements: [
        "Delivered 10+ client websites on time and within budget",
        "Improved website loading speed by 50% through optimization",
        "Learned and implemented responsive design principles"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Work Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey building innovative solutions and growing as a developer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-glow to-primary opacity-60"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full glow-purple"></div>
                  
                  {/* Content */}
                  <div className="ml-20">
                    <Card className="bg-gradient-card border-border/50 glow-purple hover:glow-purple transition-smooth">
                      <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-primary mb-2">{exp.title}</h3>
                            <div className="flex items-center gap-2 text-lg font-medium mb-2">
                              <Building2 className="w-5 h-5 text-muted-foreground" />
                              <span>{exp.company}</span>
                            </div>
                            <div className="flex items-center gap-4 text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{exp.period}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{exp.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {exp.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Technologies Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Achievements */}
                        <div>
                          <h4 className="font-semibold mb-3">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;