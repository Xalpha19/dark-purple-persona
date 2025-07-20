import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, Code, Shield } from "lucide-react";

const Education = () => {
  const education = [
    {
      id: "degree",
      title: "Formal Education",
      icon: GraduationCap,
      items: [
        {
          degree: "Master of Science in Computer Forensics and Cybersecurity",
          school: "University of Greenwich",
          period: "2023",
          location: "London, UK",
          gpa: "Distinction",
          description: "Advanced degree focusing on digital forensics methodologies, cybersecurity frameworks, and incident response protocols.",
          coursework: ["Digital Forensics", "Malware Analysis", "Network Security", "Incident Response", "Computer Law"]
        },
        {
          degree: "Post Graduate Diploma in Advanced Computing",
          school: "Center of Development in Advanced Computing",
          period: "2020",
          location: "Noida, India",
          gpa: "Merit",
          description: "Specialized training in advanced computing concepts with focus on cybersecurity applications.",
          coursework: ["Advanced Programming", "System Security", "Network Protocols", "Database Security", "Cryptography"]
        },
        {
          degree: "Bachelor's in Technology - Information Technology",
          school: "Symbiosis International University",
          period: "2019",
          location: "Pune, India",
          gpa: "First Class",
          description: "Foundation in information technology with specialization in security frameworks and system administration.",
          coursework: ["Computer Networks", "Operating Systems", "Database Management", "Information Security", "Software Engineering"]
        }
      ]
    },
    {
      id: "courses",
      title: "Specialized Training",
      icon: BookOpen,
      items: [
        {
          name: "Recorded Future Threat Intelligence Analyst Training",
          issuer: "Recorded Future",
          issued: "2021",
          expires: "N/A",
          credential: "RF-TIA-2021",
          description: "Advanced threat intelligence analysis methodologies and adversary tracking techniques for proactive defense strategies",
          skills: ["Threat Intelligence", "Adversary Tracking", "TTP Analysis", "IOC Development"]
        },
        {
          name: "AttackIQ MITRE ATT&CK Security Stack for AWS",
          issuer: "AttackIQ",
          issued: "2023",
          expires: "N/A",
          credential: "AIQ-AWS-2023",
          description: "Defending against MITRE TTPs on AWS services with automated security validation and continuous monitoring",
          skills: ["MITRE ATT&CK", "AWS Security", "Security Validation", "Cloud Defense"]
        },
        {
          name: "AWS Security Essentials",
          issuer: "Amazon Web Services",
          issued: "2024",
          expires: "2026",
          credential: "AWS-SE-2024",
          description: "Comprehensive cloud security fundamentals and best practices for AWS infrastructure protection",
          skills: ["AWS Security", "Cloud Architecture", "IAM", "Security Monitoring"]
        },
        {
          name: "Microsoft Defender XDR Administration Training",
          issuer: "Microsoft",
          issued: "2025",
          expires: "2027",
          credential: "MS-XDR-2025",
          description: "Advanced endpoint detection and response administration for enterprise security operations",
          skills: ["Microsoft Defender", "EDR", "XDR", "Threat Detection"]
        }
      ]
    },
    {
      id: "skills",
      title: "Technical Expertise",
      icon: Code,
      items: [
        {
          category: "🔍 Threat Hunting & Analysis",
          skills: ["Threat Hunting & Detection Engineering", "Advanced TTP and hypothesis-driven threat hunting", "Custom detection rule development (SIEM, EDR, XDR)", "MITRE ATT&CK alignment and use-case mapping", "Behavioral and anomaly-based detection", "Query development using KQL, Splunk SPL, and SQL", "Dashboard creation and threat visualisation", "Detection gap analysis via purple teaming exercises"]
        },
        {
          category: "🧪 Digital Forensics & DFIR",
          skills: ["Disk, memory, network, and cloud forensics (AWS, Azure, GCP)", "Root cause analysis and incident triage", "Email and phishing analysis using OSINT and threat platforms", "Incident containment, eradication, and recovery procedures", "Evidence handling, forensic tooling, and chain of custody", "Automated forensic data acquisition and triage scripting", "Deception-based detection to reduce dwell time"]
        },
        {
          category: "☁️ Cloud & Endpoint Security",
          skills: ["Endpoint threat detection using Trellix, Carbon Black, Defender XDR, etc.", "Host-based and behavioural intrusion analysis", "Cloud-native security tooling (AWS GuardDuty, Azure Sentinel, GCP SCC)", "Multi-cloud detection and response across SaaS environments", "Unified DDoS incident response and mitigation framework", "Cloud log analysis and cross-platform threat correlation"]
        },
        {
          category: "⚙️ Security Automation",
          skills: ["Automation, Scripting for ingestion of Threat Intelligence using REST API", "Python, PowerShell, and JavaScript scripting", "Custom SOAR playbooks for threat response orchestration", "Automated ingestion and enrichment of threat intel feeds", "OSINT investigation and threat actor profiling", "Adversary simulation and malware behavioral research", "Integration of CTI into SOC workflows and detections", "Tool development for automated triage and IOC processing"]
        }
      ]
    },
  ];

  return (
    <section id="education" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Education & Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development throughout my career.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="degree" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-border">
              {education.map((section) => (
                <TabsTrigger 
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <section.icon className="w-4 h-4" />
                  <span className="hidden sm:block">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {education.map((section) => (
              <TabsContent key={section.id} value={section.id} className="mt-8">
                {section.id === "skills" ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    {section.items.map((skillGroup, index) => (
                      <Card key={index} className="bg-gradient-card border-border/50 glow-purple">
                        <CardHeader>
                          <CardTitle className="text-xl">{skillGroup.category}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {skillGroup.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="bg-primary/20 text-primary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {section.items.map((item, index) => (
                      <Card key={index} className="bg-gradient-card border-border/50 glow-purple hover:glow-purple transition-smooth animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                        <CardContent className="p-8">
                          {section.id === "degree" ? (
                            <div>
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-primary mb-2">{item.degree}</h3>
                                  <p className="text-lg font-medium mb-2">{item.school}</p>
                                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                                    <span>{item.period}</span>
                                    <span>•</span>
                                    <span>{item.location}</span>
                                    <span>•</span>
                                    <span>GPA: {item.gpa}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-6">{item.description}</p>
                              <div>
                                <h4 className="font-semibold mb-3">Relevant Coursework:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.coursework.map((course) => (
                                    <Badge key={course} variant="secondary" className="bg-primary/20 text-primary">
                                      {course}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : section.id === "certifications" ? (
                            <div>
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-primary mb-2">{item.name}</h3>
                                  <p className="text-lg font-medium mb-2">{item.issuer}</p>
                                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                                    <span>Issued: {item.issued}</span>
                                    <span>•</span>
                                    <span>Expires: {item.expires}</span>
                                    <span>•</span>
                                    <span>ID: {item.credential}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-6">{item.description}</p>
                              <div>
                                <h4 className="font-semibold mb-3">Key Skills:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="bg-primary/20 text-primary">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : section.id === "courses" ? (
                            <div>
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-primary mb-2">{item.name}</h3>
                                  <p className="text-lg font-medium mb-2">{item.issuer}</p>
                                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                                    <span>Issued: {item.issued}</span>
                                    <span>•</span>
                                    <span>Expires: {item.expires}</span>
                                    <span>•</span>
                                    <span>ID: {item.credential}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-6">{item.description}</p>
                              <div>
                                <h4 className="font-semibold mb-3">Key Skills:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="bg-primary/20 text-primary">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-primary mb-2">{item.name}</h3>
                                  <p className="text-lg font-medium mb-2">{item.platform}</p>
                                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                                    <span>Completed: {item.completed}</span>
                                    <span>•</span>
                                    <span>Instructor: {item.instructor}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-6">{item.description}</p>
                              <div>
                                <h4 className="font-semibold mb-3">Topics Covered:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.topics.map((topic) => (
                                    <Badge key={topic} variant="secondary" className="bg-primary/20 text-primary">
                                      {topic}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Education;