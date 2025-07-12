import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, FileText, Github, Award, Users, Calendar } from "lucide-react";

const Research = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Neural Network Optimization for Edge Computing",
      type: "Research Paper",
      status: "Published",
      venue: "IEEE International Conference on Machine Learning",
      year: "2023",
      authors: ["John Doe", "Dr. Jane Smith", "Prof. Michael Johnson"],
      abstract: "This paper presents a novel approach to optimizing neural networks for edge computing devices, achieving 40% improvement in inference speed while maintaining accuracy.",
      fullDescription: "Edge computing has become increasingly important as IoT devices proliferate. This research addresses the challenge of running complex neural networks on resource-constrained edge devices. We developed a new pruning algorithm combined with quantization techniques that significantly reduces model size and computational requirements without sacrificing accuracy. Our approach was tested on various edge devices and showed consistent improvements across different neural network architectures.",
      technologies: ["Python", "TensorFlow", "PyTorch", "CUDA", "ARM"],
      impact: [
        "40% improvement in inference speed",
        "60% reduction in model size",
        "Adopted by 3 major tech companies",
        "150+ citations within first year"
      ],
      links: {
        paper: "https://arxiv.org/paper123",
        github: "https://github.com/project",
        demo: "https://demo.project.com"
      },
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Distributed Web Application Architecture",
      type: "Open Source Project",
      status: "Active Development",
      venue: "GitHub",
      year: "2023",
      authors: ["John Doe", "Community Contributors"],
      abstract: "A scalable microservices architecture framework for modern web applications, featuring automatic load balancing and fault tolerance.",
      fullDescription: "This open-source project provides a comprehensive framework for building distributed web applications. It includes service discovery, API gateway, load balancing, and monitoring capabilities out of the box. The framework is designed to be cloud-agnostic and supports deployment on AWS, GCP, and Azure. It has gained significant traction in the developer community with over 5,000 GitHub stars.",
      technologies: ["Node.js", "Docker", "Kubernetes", "Redis", "PostgreSQL"],
      impact: [
        "5,000+ GitHub stars",
        "Used by 50+ companies",
        "Active community of 200+ contributors",
        "Downloaded 100K+ times"
      ],
      links: {
        github: "https://github.com/distributed-app",
        docs: "https://docs.distributed-app.com",
        demo: "https://demo.distributed-app.com"
      },
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Real-time Collaboration Platform",
      type: "Patent Application",
      status: "Under Review",
      venue: "US Patent Office",
      year: "2023",
      authors: ["John Doe", "Sarah Wilson"],
      abstract: "A novel system for real-time collaborative editing with conflict resolution and distributed synchronization.",
      fullDescription: "This patent application describes a new approach to handling real-time collaboration in document editing systems. Our solution uses operational transformation combined with vector clocks to ensure consistency across distributed clients. The system can handle thousands of concurrent users while maintaining sub-100ms latency for most operations.",
      technologies: ["WebRTC", "CRDT", "WebSockets", "Redis", "MongoDB"],
      impact: [
        "Patent pending (Application #12345678)",
        "Implemented in production system",
        "Supports 10,000+ concurrent users",
        "Licensed by 2 major software companies"
      ],
      links: {
        patent: "https://patents.uspto.gov/12345678",
        demo: "https://collab-demo.com"
      },
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Machine Learning for Code Quality Assessment",
      type: "Conference Presentation",
      status: "Presented",
      venue: "ACM SIGSOFT International Symposium",
      year: "2022",
      authors: ["John Doe", "Dr. Emily Chen"],
      abstract: "An ML-based approach to automatically assess code quality and predict maintenance effort using static analysis and historical data.",
      fullDescription: "This research introduces a machine learning model that can automatically assess code quality by analyzing various metrics including complexity, maintainability, and technical debt. The model was trained on thousands of open-source repositories and can predict future maintenance effort with 85% accuracy.",
      technologies: ["Python", "Scikit-learn", "AST Analysis", "Git Mining"],
      impact: [
        "85% accuracy in maintenance prediction",
        "Integrated into 5 development tools",
        "200+ attendees at presentation",
        "Featured in Software Engineering Journal"
      ],
      links: {
        slides: "https://slides.com/ml-code-quality",
        paper: "https://arxiv.org/paper456",
        github: "https://github.com/ml-code-quality"
      },
      image: "/api/placeholder/400/250"
    }
  ];

  const publications = [
    {
      title: "Optimizing Deep Learning Models for Mobile Deployment",
      authors: "J. Doe, M. Smith, L. Johnson",
      venue: "Nature Machine Intelligence",
      year: "2023",
      type: "Journal Article",
      citations: 89
    },
    {
      title: "Scalable Microservices Architecture Patterns",
      authors: "J. Doe, S. Wilson",
      venue: "ACM Computing Surveys",
      year: "2022", 
      type: "Survey Paper",
      citations: 156
    },
    {
      title: "Real-time Collaborative Systems: A Survey",
      authors: "J. Doe, E. Chen, R. Martinez",
      venue: "IEEE Computer",
      year: "2022",
      type: "Review Article",
      citations: 203
    }
  ];

  return (
    <section id="research" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Research & Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative research projects and publications in computer science and software engineering.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="max-w-6xl mx-auto mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center">Featured Projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={project.id} className="bg-gradient-card border-border/50 glow-purple hover:glow-purple transition-smooth animate-slide-up group" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      {project.type}
                    </Badge>
                    <Badge variant={project.status === "Published" ? "default" : project.status === "Active Development" ? "secondary" : "outline"}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.venue}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.abstract}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="border-primary/30 text-primary/80">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="border-primary/30 text-primary/80">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-primary glow-purple flex-1">
                          Learn More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-card border-border">
                        <DialogHeader>
                          <div className="flex items-start justify-between mb-4">
                            <Badge variant="secondary" className="bg-primary/20 text-primary">
                              {project.type}
                            </Badge>
                            <Badge variant={project.status === "Published" ? "default" : project.status === "Active Development" ? "secondary" : "outline"}>
                              {project.status}
                            </Badge>
                          </div>
                          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                          <DialogDescription className="text-base">
                            {project.venue} • {project.year}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Authors
                            </h4>
                            <p className="text-muted-foreground">{project.authors.join(", ")}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Abstract</h4>
                            <p className="text-muted-foreground">{project.abstract}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Full Description</h4>
                            <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              Impact & Achievements
                            </h4>
                            <ul className="space-y-2">
                              {project.impact.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                            {Object.entries(project.links).map(([type, url]) => (
                              <Button key={type} variant="outline" size="sm" asChild className="glow-purple">
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                  {type === 'github' ? <Github className="w-4 h-4 mr-2" /> : 
                                   type === 'paper' ? <FileText className="w-4 h-4 mr-2" /> :
                                   <ExternalLink className="w-4 h-4 mr-2" />}
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </a>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {project.links.github && (
                      <Button variant="outline" size="icon" asChild className="glow-purple">
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">Recent Publications</h3>
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 glow-purple hover:glow-purple transition-smooth animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      {pub.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{pub.citations} citations</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2 hover:text-primary transition-smooth cursor-pointer">
                    {pub.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    {pub.authors}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <span className="font-medium">{pub.venue}</span> • {pub.year}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;