import { useState, useEffect } from "react";
import { ArrowRight, Calendar, User, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RSSService, RSSItem } from "@/services/rssService";
import { useToast } from "@/hooks/use-toast";
import staticCodeAnalysisImage from "@/assets/blog-static-code-analysis.png";
import hexAppealImage from "@/assets/blog-hex-appeal.jpg";
import threatHuntingImage from "@/assets/blog-threat-hunting.png";

// WordPress RSS feed URL
const WORDPRESS_RSS_URL = "https://journal.ishaansrv.com/feed/";

// Fallback posts in case RSS fails
const fallbackPosts = [
  {
    id: "1",
    title: "Static Code Analysis",
    excerpt: "Imagine you're trying to understand how a complex clock works, but you can't actually wind it up or let its gears turn. This is like static analysis in cybersecurity - examining software without running it.",
    date: "2025-07-05", 
    readTime: "12 min read",
    image: staticCodeAnalysisImage,
    tags: ["Static Analysis", "Reverse Engineering", "Cybersecurity"],
    url: "https://journal.ishaansrv.com/2025/07/05/static-code-analysis/"
  },
  {
    id: "2",
    title: "Hex Appeal Part 1: Unraveling the Art of Malware Analysis",
    excerpt: "Understanding how the adversary operates is paramount to mounting a proper defense. Malware analysis is a deep technical investigation into the heart of malicious code - a craft demanding skill and dedication.",
    date: "2025-05-23",
    readTime: "15 min read", 
    image: hexAppealImage,
    tags: ["Malware Analysis", "Static Analysis", "Dynamic Analysis"],
    url: "https://journal.ishaansrv.com/2025/05/23/hex-appeal-part-1-unraveling-the-art-of-malware-analysis/"
  },
  {
    id: "3",
    title: "Introducing you to Threat Hunting",
    excerpt: "Threat Hunting is proactive and rigorously looking after threats in your environment. Learn how to establish effective threat hunting with the right data, baseline understanding, and hypothesis development.",
    date: "2025-03-30",
    readTime: "10 min read",
    image: threatHuntingImage, 
    tags: ["Threat Hunting", "MITRE ATT&CK", "Proactive Defense"],
    url: "https://journal.ishaansrv.com/2025/03/30/introducing-you-to-threat-hunting/"
  }
];

const BlogSection = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [usingRSS, setUsingRSS] = useState(false);
  const { toast } = useToast();
  const rssService = new RSSService();

  const fetchRSSPosts = async (showRefreshToast = false) => {
    try {
      setIsRefreshing(true);
      console.log('Starting RSS fetch from:', WORDPRESS_RSS_URL);
      
      const rssPosts = await rssService.fetchRSSFeed(WORDPRESS_RSS_URL);
      console.log('Successfully fetched RSS posts:', rssPosts.length);
      
      // Convert RSS items to match our post format
      const formattedPosts = rssPosts.slice(0, 6).map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        date: item.pubDate,
        readTime: `${Math.ceil(item.content.length / 1000)} min read`,
        image: item.thumbnail || hexAppealImage,
        tags: item.categories.slice(0, 3),
        url: item.link,
        author: item.author
      }));
      
      if (formattedPosts.length === 0) {
        throw new Error('No posts found in RSS feed');
      }
      
      setPosts(formattedPosts);
      setUsingRSS(true);
      
      if (showRefreshToast) {
        toast({
          title: "Posts Updated",
          description: `Loaded ${formattedPosts.length} posts from WordPress RSS`,
        });
      }
    } catch (error) {
      console.error("Failed to fetch RSS posts:", error);
      // Fall back to static posts
      console.log('Falling back to static posts');
      setPosts(fallbackPosts);
      setUsingRSS(false);
      
      if (showRefreshToast) {
        toast({
          title: "RSS Feed Error", 
          description: `RSS fetch failed: ${error.message}. Showing cached posts.`,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRSSPosts();
  }, []);

  const handleRefresh = () => {
    fetchRSSPosts(true);
  };

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
              disabled={isRefreshing}
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
          {isLoading ? (
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
              {posts.map((post, index) => (
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