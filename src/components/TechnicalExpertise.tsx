import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

const TechnicalExpertise = () => {
  const grcData = [
    {
      category: "🛡️ Governance, Risk & Compliance (GRC)",
      skills: ["ISO 27001 ISMS implementation & audits", "PCI DSS assessments & compliance support", "SOX ITGC design & testing", "NIST CSF control mapping", "Cross-framework gap & risk analysis", "GRC tools: Archer, SNOW, Excel"]
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
            {grcData.map((skillGroup, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 glow-purple">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Shield className="w-5 h-5" />
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalExpertise;