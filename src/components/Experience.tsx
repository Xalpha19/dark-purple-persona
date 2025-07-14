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
      description: "Performing SOC analyst responsibilities conducting comprehensive alert investigations and forensics analysis across AWS, Azure, and GCP cloud environments. Executing proactive threat hunting using SIEM log correlation and developing custom detection rules.",
      technologies: ["Microsoft Defender XDR", "Splunk", "KQL", "Python", "PowerShell", "AWS", "Azure", "GCP", "Akamai", "Cofense"],
      achievements: [
        "Performed root cause analysis of complex security incidents through multi-cloud evidence correlation to identify APTs and insider threats",
        "Developed and refined custom threat hunting hypotheses and detection rules achieving 20% reduction in false positives",
        "Executed proactive threat hunting using KQL and Splunk queries with SIEM log correlation to identify detection rule gaps",
        "Led incident response efforts including containment, eradication, and recovery guidance for DDoS attacks using Akamai sensors",
        "Investigated phishing and email threats using OSINT methodologies, Cisco IronPort, and Cofense platforms",
        "Collaborated with SOC teams, Detection Engineering, and Intelligence teams on Purple Team exercises",
        "Automated threat detection processes using Python and PowerShell scripting"
      ]
    },
    {
      id: 2,
      title: "IT Security Engineer",
      company: "Dar Al-Handasah",
      location: "Pune, India",
      period: "January 2020 - August 2022",
      description: "Performed digital forensics analysis on disk, memory, and network artifacts while supporting incident response activities. Led enterprise estate threat hunting using intelligence-driven and TTP-based methodologies with MITRE ATT&CK framework.",
      technologies: ["MITRE ATT&CK", "SIEM", "Digital Forensics", "Deception Technology", "ISO 27001", "AWS", "Azure", "Penetration Testing"],
      achievements: [
        "Led enterprise estate threat hunting using intelligence-driven and TTP-based methodologies with MITRE ATT&CK framework, resulting in 30% improved coverage",
        "Led full-stack SIEM refresh project implementing hardware upgrades and software optimizations, resulting in reduced CAPEX costs and enhanced log fidelity",
        "Supervised external penetration testing engagements establishing test parameters and converting findings into actionable detection rule sets",
        "Deployed deception-based detection solutions enhancing early-stage threat visibility and reducing dwell time",
        "Implemented ISO 27001:2013 compliance with zero non-conformities enhancing cyber governance",
        "Implemented unified DDoS response framework for AWS and Azure SaaS infrastructure, resulting in 30% reduction in attack-related downtime"
      ]
    },
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
