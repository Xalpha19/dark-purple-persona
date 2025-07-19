import { ArrowRight, Calendar, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "Advanced Persistent Threats Detection",
      excerpt: "Deep dive into identifying and mitigating sophisticated cyber attacks using behavioral analysis and threat hunting techniques in enterprise environments.",
      date: "2024-01-15", 
      readTime: "8 min read",
      image: "/api/placeholder/400/200",
      tags: ["APT", "Threat Detection", "SIEM"],
      url: "https://journal.ishaansrv.com/2025/03/30/introducing-you-to-threat-hunting/"
    },
    {
      id: 2,
      title: "Zero Trust Architecture Implementation",
      excerpt: "Comprehensive guide to implementing zero trust security models, including network segmentation, identity verification, and continuous monitoring strategies.",
      date: "2024-01-10",
      readTime: "12 min read", 
      image: "/api/placeholder/400/200",
      tags: ["Zero Trust", "Network Security", "Identity Management"],
      url: "https://journal.ishaansrv.com/2025/05/23/hex-appeal-part-1-unraveling-the-art-of-malware-analysis/"
    },
    {
      id: 3,
      title: "Incident Response Automation",
      excerpt: "Building effective SOAR playbooks for automated incident response, including threat intelligence integration and orchestrated security workflows.",
      date: "2024-01-05",
      readTime: "10 min read",
      image: "/api/placeholder/400/200", 
      tags: ["SOAR", "Automation", "Incident Response"],
      url: "https://journal.ishaansrv.com/2025/07/05/static-code-analysis/"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Cyber Journal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep technical analysis, threat intelligence, and cybersecurity insights from the security landscape in actionable blog style content.
          </p>
        </div>

        {/* Take Me There Button */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <a 
            href="https://journal.ishaansrv.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-gradient-primary glow-cyber cyber-hover">
              <ExternalLink className="w-4 h-4 mr-2" />
              Take me there
            </Button>
          </a>
        </div>

        {/* Featured Blog Posts */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <Card key={post.id} className="bg-gradient-card border-border/50 glow-cyber hover:glow-cyber transition-smooth animate-slide-up group overflow-hidden cyber-hover" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="aspect-video bg-gradient-primary/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/30">Blog</div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-smooth line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full group-hover:bg-primary/10 group-hover:border-primary transition-smooth">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSection;