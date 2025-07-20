import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants, staggerItemVariants, scaleInVariants } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const { ref: sectionRef, controls: sectionControls } = useScrollAnimation(0.1);
  const { ref: titleRef, controls: titleControls } = useScrollAnimation(0.2);
  const { ref: gridRef, controls: gridControls } = useScrollAnimation(0.2);
  const { ref: pubRef, controls: pubControls } = useScrollAnimation(0.3);

  const projects = [{
    id: 1,
    title: "Detecting Insider Threats in Healthcare's IT Infrastructure",
    period: "Jan 2023 - Aug 2023",
    organization: "University of Greenwich",
    description: "Framework leveraging Threat Actor TTPs mapping on MITRE ATT&CK kill chain matrix using Security Onion and Atomic Red Team to replicate attack scenarios. Developed advanced SIGMA rules for threat detection in healthcare infrastructure.",
    technologies: ["Security Onion", "Atomic Red Team", "SIGMA Rules", "MITRE ATT&CK", "Healthcare IT", "Threat Detection"],
    skills: ["DFIR", "Threat Hunting", "Rule Development"],
    githubLink: "#",
    liveLink: "#",
    type: "Research"
  }, {
    id: 2,
    title: "Intelligent Malware Detection Framework",
    period: "Sep 2018 - Apr 2019",
    organization: "Symbiosis International University",
    description: "Developed framework using concurrent classification algorithms for improved malware detection. Three-phase approach: data collection, algorithm optimization, and rigorous model training for accurate results.",
    technologies: ["Machine Learning", "Classification Algorithms", "Malware Analysis", "Python", "Data Science"],
    skills: ["Mitigation Strategies", "Analytical Skills", "Algorithm Development"],
    githubLink: "#",
    liveLink: "#",
    type: "Academic"
  }, {
    id: 3,
    title: "Research Paper Study on Ambient Backscattering",
    period: "Jul 2017 - Nov 2017",
    organization: "Symbiosis International University",
    description: "Research on ambient backscatter technology enabling communication without external power sources by backscattering ambient RF signals.",
    technologies: ["RF Communication", "Ambient Backscattering", "Wi-Fi Backscattering", "Communication Protocols"],
    skills: ["Research Methodology", "Technical Writing", "Communication Systems"],
    githubLink: "#",
    liveLink: "#",
    type: "Research"
  }, {
    id: 4,
    title: "CISCO Packet Tracer Hybrid Topology Implementation",
    period: "Jul 2017 - Aug 2017",
    organization: "Symbiosis International University",
    description: "Network simulation project implementing hybrid topologies with routing optimization, DNS/DHCP servers, and subnetting configurations.",
    technologies: ["Cisco Packet Tracer", "Network Design", "Routing Protocols", "DNS/DHCP", "Subnetting"],
    skills: ["Network Architecture", "Protocol Configuration", "System Administration"],
    githubLink: "#",
    liveLink: "#",
    type: "Technical"
  }];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Research":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Academic":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Technical":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={sectionControls}
      variants={fadeInUpVariants}
      id="projects" 
      className="py-24 bg-background"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Academic and research projects showcasing expertise in Response, threat detection, and cybersecurity frameworks.</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            ref={gridRef}
            initial="hidden"
            animate={gridControls}
            variants={staggerContainerVariants}
            className="grid lg:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div key={project.id} variants={staggerItemVariants}>
                <Card className="bg-gradient-card border-border/50 glow-purple hover:glow-purple transition-smooth h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`text-xs ${getTypeColor(project.type)}`}>
                            {project.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-primary mb-2 leading-tight">
                          {project.title}
                        </CardTitle>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{project.organization}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map(skill => (
                          <Badge key={skill} variant="outline" className="border-accent/30 text-accent">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Publications Section */}
          <motion.div 
            ref={pubRef}
            initial="hidden"
            animate={pubControls}
            variants={scaleInVariants}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 heading-primary">
                Publications
              </h3>
              <p className="text-lg text-muted-foreground">
                Research contributions to cybersecurity and technology advancement
              </p>
            </div>

            <Card className="bg-gradient-card border-border/50 glow-purple">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-6 lg:mb-0">
                    <h4 className="text-2xl font-bold text-primary mb-3">
                      "Implementing Blockchain in Electoral System to Decentralize and Prevent Tampering"
                    </h4>
                    <p className="text-lg text-muted-foreground mb-4">
                      Published in IEEE Conference Proceedings - Research on blockchain technology implementation for secure electoral systems.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>IEEE Conference</span>
                      <span>•</span>
                      <span>Published Research</span>
                      <span>•</span>
                      <span>Blockchain Security</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button className="btn-enhanced">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <a href="https://ieeexplore.ieee.org/document/8745404" target="_blank" rel="noopener noreferrer">
                        Read More
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;