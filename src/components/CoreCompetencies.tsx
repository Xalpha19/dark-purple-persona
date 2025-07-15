import { Card, CardContent } from "@/components/ui/card";

const CoreCompetencies = () => {
  return (
    <section id="core-competencies" className="py-20 bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 heading-primary">
            Core Competency Areas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Multi-disciplinary expertise across digital forensics, threat hunting, and cybersecurity operations
          </p>
        </div>

        {/* Core Competency Image */}
        <div className="flex justify-center mb-16">
          <Card className="card-enhanced overflow-hidden max-w-4xl">
            <CardContent className="p-8">
              <img 
                src="/lovable-uploads/4600c8fb-6193-4594-9950-a4c63cc2214f.png" 
                alt="Core Competency Areas Diagram"
                className="w-full h-auto rounded-lg"
              />
            </CardContent>
          </Card>
        </div>

        {/* Technical Expertise Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Threat Hunting & Detection Engineering */}
          <Card className="card-enhanced">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🔍</span>
                <h3 className="text-2xl font-bold text-primary">
                  Threat Hunting & Detection Engineering
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Core Competencies:</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Threat Hunting (TTP, Hypothesis-Driven, IOC-Based)</li>
                    <li>• MITRE ATT&CK Framework Mapping</li>
                    <li>• Detection Rule Development (EDR, SIEM, XDR)</li>
                    <li>• Custom Dashboards & Visualisation (Splunk, ELK)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Query Languages:</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• KQL (Kusto Query Language)</li>
                    <li>• Splunk SPL</li>
                    <li>• SQL</li>
                    <li>• Log Correlation & Behavioural Analysis</li>
                    <li>• Anomaly Detection</li>
                    <li>• Threat Actor Attribution</li>
                    <li>• Purple Team Exercises & Detection Gap Analysis</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Tools & Platforms:</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Microsoft Defender XDR</li>
                    <li>• Trellix / Carbon Black / FireEye / CyberReason</li>
                    <li>• Splunk, ELK Stack, QRadar</li>
                    <li>• Azure Sentinel, AWS GuardDuty</li>
                    <li>• Cofense, Cisco IronPort (email threat analysis)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Forensics & Incident Response */}
          <Card className="card-enhanced">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🧪</span>
                <h3 className="text-2xl font-bold text-primary">
                  Digital Forensics & Incident Response (DFIR)
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Core Competencies:</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Disk, Memory, and Network Forensics</li>
                    <li>• Cloud Artifact Forensics (AWS, Azure, GCP)</li>
                    <li>• Email & Phishing Investigation</li>
                    <li>• Forensic Chain of Custody & Evidence Handling</li>
                    <li>• Host-Based Intrusion Analysis</li>
                    <li>• Root Cause Analysis & Post-Incident Reviews</li>
                    <li>• DDoS Incident Response & Mitigation</li>
                    <li>• Deception-Based Detection Techniques</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Tools & Techniques:</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• EnCase, Autopsy, FTK, Volatility</li>
                    <li>• Network forensic tools (Wireshark, Zeek)</li>
                    <li>• OSINT-based Forensic Investigation</li>
                    <li>• PowerShell & Python Scripting for Automation</li>
                    <li>• SOAR Playbooks Development</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cloud & Endpoint Security */}
          <Card className="card-enhanced">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">☁️</span>
                <h3 className="text-2xl font-bold text-primary">
                  Cloud & Endpoint Security
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Cloud Security Expertise:</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Threat Hunting in AWS, Azure, GCP</li>
                    <li>• AWS GuardDuty, Azure Sentinel, Google SCC</li>
                    <li>• Cloud SaaS Forensics & Logging</li>
                    <li>• DDoS Response Strategy in Multi-Cloud Infrastructure</li>
                    <li>• Cloud Security Governance & Risk Mitigation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Endpoint Security Expertise:</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Host Telemetry Analysis</li>
                    <li>• EDR Tuning & Policy Customisation</li>
                    <li>• Advanced Persistent Threat (APT) Detection</li>
                    <li>• Insider Threat Investigation</li>
                    <li>• Incident Containment & Recovery</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Platforms:</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Microsoft Defender for Endpoint</li>
                    <li>• Trellix / Carbon Black / FireEye / CyberReason</li>
                    <li>• SIEM + EDR Integration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Automation, Scripting & Threat Intelligence */}
          <Card className="card-enhanced">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🛠️</span>
                <h3 className="text-2xl font-bold text-primary">
                  Automation, Scripting & Threat Intelligence
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Automation & Tooling:</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Python & PowerShell for Automated Threat Detection</li>
                    <li>• SOAR Integration & Playbook Creation</li>
                    <li>• Detection Rule Testing and Simulation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Threat Intelligence (CTI):</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• OSINT & Dark Web Investigation</li>
                    <li>• Threat Feed Integration with SIEM</li>
                    <li>• Threat Actor Profiling</li>
                    <li>• Emerging Threat Research</li>
                    <li>• IOC Enrichment and Correlation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-accent mb-3">Custom Development:</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Automation Scripts for Forensics and Detection</li>
                    <li>• Deployed deception solutions to improve MTTD</li>
                    <li>• Developed internal tools for triage and incident scoping</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CoreCompetencies;