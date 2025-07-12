import { ArrowLeft, Calendar, User, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Modern Web Applications with React and TypeScript",
      excerpt: "Exploring best practices for creating scalable and maintainable web applications using modern development tools.",
      date: "2024-01-15",
      author: "Portfolio Owner",
      readTime: "5 min read",
      tags: ["React", "TypeScript", "Web Development"]
    },
    {
      id: 2,
      title: "The Future of AI in Software Development",
      excerpt: "How artificial intelligence is transforming the way we write, test, and deploy software applications.",
      date: "2024-01-10",
      author: "Portfolio Owner", 
      readTime: "8 min read",
      tags: ["AI", "Machine Learning", "Software Development"]
    },
    {
      id: 3,
      title: "Design Systems: Creating Consistent User Experiences",
      excerpt: "A comprehensive guide to building and maintaining design systems for modern applications.",
      date: "2024-01-05",
      author: "Portfolio Owner",
      readTime: "6 min read",
      tags: ["Design", "UI/UX", "Design Systems"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-smooth">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-smooth">Home</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-smooth">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
            Blog & Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on technology, development, and innovation.
          </p>
        </div>
      </section>

      {/* WordPress Integration Notice */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-card border-border/50 glow-purple max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <ExternalLink className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">WordPress Integration Ready</h3>
              <p className="text-muted-foreground mb-6">
                This blog section is designed to integrate seamlessly with your WordPress site. 
                Connect your WordPress API to display live blog posts here.
              </p>
              <Button variant="outline" className="glow-purple">
                <ExternalLink className="w-4 h-4 mr-2" />
                View WordPress Documentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:gap-12 max-w-4xl mx-auto">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="bg-gradient-card border-border/50 glow-purple hover:glow-purple transition-smooth animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
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
                  <Button className="mt-6 bg-gradient-primary glow-purple" size="lg">
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

export default Blog;