import { ArrowRight, Calendar, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCyberJournalPosts, fallbackPosts } from "@/hooks/useCyberJournalPosts";
import hexAppealImage from "@/assets/blog-hex-appeal.jpg";

const BlogSection = () => {
  const { posts, isLoading, usingRSS, refresh, isRefreshing, isError } = useCyberJournalPosts(6);
  const { toast } = useToast();

  const handleRefresh = () => {
    refresh();
    toast({
      title: "Refreshing Feed",
      description: "Fetching latest posts from the blog...",
    });
  };

  // Use fallback if still loading or error with no posts
  const displayPosts = posts.length > 0 ? posts : (isError ? fallbackPosts.slice(0, 6) : []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Cyber Journal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Defending the Digital Frontier, One Byte at a Time
          </p>
          {usingRSS && (
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              Live Feed
            </Badge>
          )}
          {isError && (
            <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30 ml-2">
              Using Cached Posts
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
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

        {/* Blog Posts */}
        <div className="max-w-6xl mx-auto">
          {isLoading && displayPosts.length === 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-gradient-card border-border/50 animate-pulse">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-muted rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post, index) => (
                <Card key={post.id} className="bg-gradient-card border-border/50 glow-cyber hover:glow-cyber transition-smooth animate-slide-up group overflow-hidden cyber-hover" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = hexAppealImage;
                      }}
                    />
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
                    {usingRSS && post.author && (
                      <p className="text-sm text-muted-foreground">By {post.author}</p>
                    )}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
