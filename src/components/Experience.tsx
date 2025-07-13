import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Cybersecurity Analyst",
      company: "NatWest Group",
      location: "Edinburgh, UK",
      period: "February 2024 - Present",
      description: "Leading advanced threat detection and digital forensics across multi-cloud environments (AWS, Azure, GCP). Spearheading incident response initiatives and developing custom detection rules to enhance security posture.",
      technologies: ["Trellix EDR", "Carbon Black", "FireEye", "Splunk", "KQL", "Python", "AWS", "Azure", "GCP"],
      achievements: [
        "Achieved 20% reduction in false positives through custom detection rules",
        "Led digital forensics investigations for critical security incidents",
        "Implemented advanced threat hunting methodologies across cloud infrastructure",
        "Mentored junior analysts on DFIR best practices"
      ]
    },
    {
      id: 2,
      title: "IT Security Engineer",
      company: "Dar Al-Handasah",
      location: "Pune, India",
      period: "January 2020 - August 2022",
      description: "Managed enterprise SIEM operations and conducted sophisticated threat hunting campaigns. Led Red Team engagements and adversary simulation exercises to strengthen organizational security posture.",
      technologies: ["SIEM", "Splunk", "QRadar", "Metasploit", "Burp Suite", "Nessus", "Wireshark", "PowerShell"],
      achievements: [
        "Reduced organizational risk by 40% through comprehensive security assessments",
        "Successfully implemented ISO 27001:2013 with zero non-conformities",
        "Conducted 25+ Red Team engagements and penetration tests",
        "Developed threat intelligence program improving detection capabilities"
      ]
    },
    {
      id: 3,
      title: "Junior Security Analyst",
      company: "InfoSec Solutions",
      location: "Mumbai, India",
      period: "June 2019 - December 2019",
      description: "Started my cybersecurity journey focusing on SOC operations, malware analysis, and incident response. Gained foundational experience in digital forensics and threat detection methodologies.",
      technologies: ["Splunk", "OSSEC", "Volatility", "Autopsy", "Wireshark", "Python", "PowerShell"],
      achievements: [
        "Analyzed 200+ security incidents and malware samples",
        "Developed automated scripts reducing analysis time by 30%",
        "Completed advanced training in digital forensics and incident response",
        "Contributed to threat intelligence feed improving detection rates"
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
            4+ years of expertise in digital forensics, incident response, and threat hunting across global organizations.
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