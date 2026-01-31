
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from "@/hooks/useScrollAnimation";

interface Position {
  title: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

interface Experience {
  id: number;
  company: string;
  location: string;
  period: string;
  positions: Position[];
}

const Experience = () => {
  const { ref: sectionRef, controls: sectionControls } = useScrollAnimation(0.1);
  const { ref: titleRef, controls: titleControls } = useScrollAnimation(0.2);
  const { ref: timelineRef, controls: timelineControls } = useScrollAnimation(0.2);

  const experiences: Experience[] = [
    {
      id: 1,
      company: "NatWest Group",
      location: "Edinburgh, UK",
      period: "January 2024 - Present",
      positions: [
        {
          title: "Security Analyst (Detection Engineer)",
          description: "Focused on developing and optimizing high-fidelity threat detection rules and SOAR playbooks within enterprise SIEM environments. Daily work spans threat hunting, rule testing/CI/CD deployment, playbook automation, system integrations, and cross-team tuning to ensure scalable MDR operations.",
          technologies: ["SIEM", "SOAR", "CI/CD", "Detection Engineering", "Threat Hunting", "MDR", "Splunk", "SPL", "KQL", "Python"],
          achievements: [
            "Designed and implemented advanced detection rule logic for new and evolving threat use cases within enterprise SIEM platforms",
            "Performed proactive threat hunts to validate the existence, relevance, and performance of detection rules against real-world attacker behaviours",
            "Integrated subsidiary and partner organisations' security systems into the central SOC, unifying alert pipelines, event sources, and detection logic",
            "Served as a subject matter expert (SME) for SOC operations and incident response, providing technical guidance on investigation workflows",
            "Analysed and documented existing detection workflows across business units to identify coverage gaps and standardise alert tuning methodologies",
            "Collaborated with SOC analysts to refine detection correlation, reduce false positives, and optimise response efficiency",
            "Developed and maintained SOAR playbooks to automate triage actions, contextual data enrichments, and incident workflow standardisation",
            "Automated rule deployment and change control using CI/CD and SOAR workflows, enabling consistent and auditable detection management"
          ]
        },
        {
          title: "Cybersecurity Analyst",
          description: "Performing SOC analyst responsibilities conducting comprehensive alert investigations and forensic analysis across AWS, Azure, and GCP cloud environments. Executing proactive threat hunting using SIEM log correlation and developing custom detection rules.",
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
        }
      ]
    },
    {
      id: 2,
      company: "Dar Al-Handasah",
      location: "Pune, India",
      period: "January 2020 - August 2022",
      positions: [
        {
          title: "IT Security Engineer",
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
        }
      ]
    },
  ];

  const renderPosition = (position: Position, isLast: boolean) => (
    <div key={position.title}>
      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 text-center lg:text-left">
        {position.title}
      </h3>
      
      <p className="text-muted-foreground mb-6 leading-relaxed text-center lg:text-left">
        {position.description}
      </p>
      
      {/* Technologies */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-center lg:text-left">Technologies Used:</h4>
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {position.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 text-xs sm:text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Achievements */}
      <div>
        <h4 className="font-semibold mb-3 text-center lg:text-left">Key Achievements:</h4>
        <ul className="space-y-2">
          {position.achievements.map((achievement, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm sm:text-base">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-center lg:text-left">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {!isLast && (
        <Separator className="my-8 bg-primary/20" />
      )}
    </div>
  );

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={sectionControls}
      variants={fadeInUpVariants}
      id="experience" 
      className="py-16 sm:py-24 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={fadeInUpVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 glow-text">
            Work Experience
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            5+ years of expertise in detection engineering, digital forensics, incident response, and threat hunting across global organizations.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div 
            ref={timelineRef}
            initial="hidden"
            animate={timelineControls}
            variants={staggerContainerVariants}
            className="relative"
          >
            {/* Timeline line - hidden on mobile, visible on desktop */}
            <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-glow to-primary opacity-60"></div>
            
            <div className="space-y-8 sm:space-y-12">
              {experiences.map((exp) => (
                <motion.div 
                  key={exp.id} 
                  variants={staggerItemVariants}
                  className="relative w-full"
                >
                  {/* Timeline dot - hidden on mobile, visible on desktop */}
                  <div className="hidden lg:block absolute left-6 w-4 h-4 bg-primary rounded-full glow-purple"></div>
                  
                  {/* Content */}
                  <div className="lg:ml-20 w-full">
                    <Card className="bg-gradient-card border-border/50 glow-purple hover:glow-purple transition-smooth w-full max-w-full overflow-hidden">
                      <CardContent className="p-6 sm:p-8">
                        {/* Company Header */}
                        <div className="flex flex-col space-y-4 mb-6">
                          <div className="text-center lg:text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-2 sm:gap-4 text-base sm:text-lg font-medium mb-2">
                              <div className="flex items-center justify-center lg:justify-start gap-2">
                                <Building2 className="w-5 h-5 text-muted-foreground" />
                                <span className="text-xl sm:text-2xl font-bold">{exp.company}</span>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-2 sm:gap-4 text-sm sm:text-base text-muted-foreground mb-6">
                              <div className="flex items-center justify-center lg:justify-start gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{exp.period}</span>
                              </div>
                              <div className="flex items-center justify-center lg:justify-start gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{exp.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Positions */}
                        {exp.positions.map((position, index) => 
                          renderPosition(position, index === exp.positions.length - 1)
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
