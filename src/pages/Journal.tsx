import { ArrowLeft, ArrowRight, Calendar, User, ExternalLink, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCyberJournalPosts, fallbackPosts } from "@/hooks/useCyberJournalPosts";
import { useToast } from "@/hooks/use-toast";
import hexAppealImage from "@/assets/blog-hex-appeal.jpg";

const Journal = () => {
  const { posts, isLoading, usingRSS, refresh, isRefreshing, isError } = useCyberJournalPosts(20);
  const { toast } = useToast();

  const handleRefresh = () => {
    refresh();
    toast({
      title: "Refreshing Feed",
      description: "Fetching latest posts from the blog...",
    });
  };

  // Use fallback if still loading or error with no posts
  const displayPosts = posts.length > 0 ? posts : (isError ? fallbackPosts : []);

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
              <p className="text-xl text-muted-foreground max-w-xl mb-4">
                Deep dives into cybersecurity, threat analysis, and digital forensics from years of field experience.
              </p>
              <div className="flex gap-2 flex-wrap">
                {usingRSS && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Live Feed
                  </Badge>
                )}
                {isError && (
                  <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    Using Cached Posts
                  </Badge>
                )}
              </div>
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

      {/* Action Buttons */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href="https://journal.ishaansrv.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-gradient-primary glow-cyber cyber-hover">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Full Blog
              </Button>
            </a>
            <Button 
              variant="outline"
              size="lg" 
              onClick={handleRefresh}
              disabled={isRefreshing || isLoading}
              className="group"
            >
              {isRefreshing ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
              )}
              Refresh Feed
            </Button>
          </div>
        </div>
      </section>

      {/* Journal Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {isLoading && displayPosts.length === 0 ? (
            <div className="grid gap-8 md:gap-12 max-w-4xl mx-auto">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-gradient-card border-border/50 animate-pulse">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="h-6 bg-muted rounded-full w-20"></div>
                      <div className="h-6 bg-muted rounded-full w-24"></div>
                    </div>
                    <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="h-4 bg-muted rounded w-32"></div>
                      <div className="h-4 bg-muted rounded w-24"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:gap-12 max-w-4xl mx-auto">
              {displayPosts.map((post, index) => (
                <Card key={post.id} className="bg-gradient-card border-border/50 glow-cyber hover:glow-cyber transition-smooth animate-slide-up cyber-hover group" style={{animationDelay: `${index * 0.1}s`}}>
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
                    <div className="flex items-center justify-between text-sm text-muted-foreground flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        {post.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button className="mt-6 bg-gradient-primary glow-cyber cyber-hover group-hover:scale-105 transition-transform" size="lg">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Journal;
