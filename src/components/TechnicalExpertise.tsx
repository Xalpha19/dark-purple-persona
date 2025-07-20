
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, Lock } from "lucide-react";

const TechnicalExpertise = () => {
  const technicalExpertiseData = [
    {
      category: "🛡️ Governance, Risk & Compliance (GRC)",
      icon: Shield,
      skills: ["ISO 27001 ISMS implementation & audits", "PCI DSS assessments & compliance support", "SOX ITGC design & testing", "NIST CSF control mapping", "Cross-framework gap & risk analysis", "GRC tools: Archer, SNOW, Excel"]
    },
    {
      category: "🔍 Threat Intelligence & Analysis",
      icon: Search,
      skills: ["OSINT techniques & investigations", "IOC analysis & threat attribution", "Threat hunting methodologies", "MITRE ATT&CK framework mapping", "TTP analysis & behavioral profiling", "Tools: MISP, Maltego, Shodan, Virustotal"]
    },
    {
      category: "🔐 Digital Forensics & Incident Response",
      icon: Lock,
      skills: ["Evidence acquisition & chain of custody", "Memory & disk forensics analysis", "Network forensics & packet analysis", "Malware reverse engineering", "Incident containment & recovery", "Tools: Volatility, Wireshark, Autopsy, YARA"]
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
            Specialized knowledge and hands-on experience in cybersecurity domains.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {technicalExpertiseData.map((skillGroup, index) => {
              const IconComponent = skillGroup.icon;
              return (
                <Card key={index} className="bg-gradient-card border-border/50 glow-purple">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      {skillGroup.category}
                    </CardTitle>
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalExpertise;
