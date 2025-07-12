import { ArrowLeft, Calendar, User, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Journal = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Advanced Persistent Threat Analysis: A Deep Dive",
      excerpt: "Exploring sophisticated APT tactics, techniques, and procedures used by nation-state actors and advanced threat groups.",
      date: "2024-01-15",
      author: "Cybersecurity Analyst",
      readTime: "8 min read",
      tags: ["APT", "Threat Intelligence", "Incident Response"]
    },
    {
      id: 2,
      title: "Zero-Day Vulnerability Research and Exploitation",
      excerpt: "Methodologies for discovering, analyzing, and responsibly disclosing zero-day vulnerabilities in modern systems.",
      date: "2024-01-10",
      author: "Security Researcher", 
      readTime: "12 min read",
      tags: ["Vulnerability Research", "Exploit Development", "Reverse Engineering"]
    },
    {
      id: 3,
      title: "Digital Forensics: Memory Analysis Techniques",
      excerpt: "Advanced memory forensics techniques for incident response and malware analysis in enterprise environments.",
      date: "2024-01-05",
      author: "Digital Forensics Expert",
      readTime: "10 min read",
      tags: ["Digital Forensics", "Memory Analysis", "Malware Research"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-smooth cyber-hover">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-smooth cyber-hover">Home</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-smooth cyber-hover">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Spline 3D Space */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
                Cyber Journal
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Deep dives into cybersecurity, threat analysis, and digital forensics from years of field experience.
              </p>
            </div>
            {/* Spline 3D Art Container */}
            <div className="h-96 md:h-[500px] relative bg-gradient-card rounded-2xl glow-cyber flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary/40 rounded-full animate-pulse"></div>
                </div>
                <p className="text-sm">Spline 3D Art Integration Ready</p>
                <p className="text-xs mt-2">Add your 3D security visualization here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WordPress Integration Notice */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-card border-border/50 glow-cyber max-w-4xl mx-auto cyber-hover">
            <CardContent className="p-8 text-center">
              <ExternalLink className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">WordPress Integration Ready</h3>
              <p className="text-muted-foreground mb-6">
                This cybersecurity journal is designed to integrate seamlessly with your WordPress site. 
                Connect your WordPress API to display live security articles and threat intelligence.
              </p>
              <Button variant="outline" className="glow-cyber cyber-hover">
                <ExternalLink className="w-4 h-4 mr-2" />
                View WordPress Documentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Journal Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:gap-12 max-w-4xl mx-auto">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="bg-gradient-card border-border/50 glow-cyber hover:glow-cyber transition-smooth animate-slide-up cyber-hover" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full cyber-hover">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <CardTitle className="text-2xl md:text-3xl mb-4 hover:text-primary transition-smooth cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <Button className="mt-6 bg-gradient-primary glow-cyber cyber-hover" size="lg">
                    Read Full Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journal;