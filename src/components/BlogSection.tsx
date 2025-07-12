import { ArrowRight, Calendar, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "Building Modern Web Applications with React and TypeScript",
      excerpt: "Exploring best practices for creating scalable and maintainable web applications using modern development tools and patterns.",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "/api/placeholder/400/200",
      tags: ["React", "TypeScript", "Web Development"]
    },
    {
      id: 2,
      title: "The Future of AI in Software Development",
      excerpt: "How artificial intelligence is transforming the way we write, test, and deploy software applications in the modern era.",
      date: "2024-01-10",
      readTime: "8 min read",
      image: "/api/placeholder/400/200",
      tags: ["AI", "Machine Learning", "Software Development"]
    },
    {
      id: 3,
      title: "Design Systems: Creating Consistent User Experiences",
      excerpt: "A comprehensive guide to building and maintaining design systems for modern applications and teams.",
      date: "2024-01-05",
      readTime: "6 min read",
      image: "/api/placeholder/400/200",
      tags: ["Design", "UI/UX", "Design Systems"]
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
            Deep technical analysis, threat intelligence, and cybersecurity insights from the field.
          </p>
        </div>

        {/* WordPress Integration Notice */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-card border-border/50 glow-cyber text-center cyber-hover">
            <CardContent className="p-8">
              <ExternalLink className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">WordPress Integration</h3>
              <p className="text-muted-foreground mb-6">
                This cybersecurity journal is designed to integrate seamlessly with your WordPress site. 
                Connect your WordPress API to display live security articles and threat intelligence.
              </p>
              <Button variant="outline" className="glow-cyber mr-4 cyber-hover">
                <ExternalLink className="w-4 h-4 mr-2" />
                WordPress API Docs
              </Button>
              <Link to="/journal">
                <Button className="bg-gradient-primary glow-cyber cyber-hover">
                  View All Entries
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
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

                  <Button variant="outline" className="w-full group-hover:bg-primary/10 group-hover:border-primary transition-smooth">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/journal">
              <Button size="lg" className="bg-gradient-primary glow-cyber cyber-hover">
                <User className="w-4 h-4 mr-2" />
                Visit Journal Page
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;