import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Shield } from "lucide-react";

const TechnicalExpertise = () => {
  const expertise = [
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
    {
      id: "grc",
      title: "GRC",
      icon: Shield,
      items: [
        {
          category: "🛡️ Governance, Risk & Compliance (GRC)",
          skills: ["ISO 27001 ISMS implementation & audits", "PCI DSS assessments & compliance support", "SOX ITGC design & testing", "NIST CSF control mapping", "Cross-framework gap & risk analysis", "GRC tools: Archer, SNOW, Excel"]
        }
      ]
    }
  ];

  return (
    <section id="technical-expertise" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Technical Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced technical skills and specialized knowledge in cybersecurity and digital forensics.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-border">
              {expertise.map((section) => (
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

            {expertise.map((section) => (
              <TabsContent key={section.id} value={section.id} className="mt-8">
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
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TechnicalExpertise;