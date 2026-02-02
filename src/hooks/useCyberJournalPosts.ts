import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RSSService, RSSItem } from "@/services/rssService";
import staticCodeAnalysisImage from "@/assets/blog-static-code-analysis.png";
import hexAppealImage from "@/assets/blog-hex-appeal.jpg";
import threatHuntingImage from "@/assets/blog-threat-hunting.png";

// WordPress RSS feed URL
export const WORDPRESS_RSS_URL = "https://journal.ishaansrv.com/feed/";

// Fallback posts in case RSS fails
export const fallbackPosts = [
  {
    id: "1",
    title: "Static Code Analysis",
    excerpt: "Imagine you're trying to understand how a complex clock works, but you can't actually wind it up or let its gears turn. This is like static analysis in cybersecurity - examining software without running it.",
    date: "2025-07-05",
    readTime: "12 min read",
    image: staticCodeAnalysisImage,
    tags: ["Static Analysis", "Reverse Engineering", "Cybersecurity"],
    url: "https://journal.ishaansrv.com/2025/07/05/static-code-analysis/",
    author: "Ishaan Srivastava"
  },
  {
    id: "2",
    title: "Hex Appeal Part 1: Unraveling the Art of Malware Analysis",
    excerpt: "Understanding how the adversary operates is paramount to mounting a proper defense. Malware analysis is a deep technical investigation into the heart of malicious code - a craft demanding skill and dedication.",
    date: "2025-05-23",
    readTime: "15 min read",
    image: hexAppealImage,
    tags: ["Malware Analysis", "Static Analysis", "Dynamic Analysis"],
    url: "https://journal.ishaansrv.com/2025/05/23/hex-appeal-part-1-unraveling-the-art-of-malware-analysis/",
    author: "Ishaan Srivastava"
  },
  {
    id: "3",
    title: "Introducing you to Threat Hunting",
    excerpt: "Threat Hunting is proactive and rigorously looking after threats in your environment. Learn how to establish effective threat hunting with the right data, baseline understanding, and hypothesis development.",
    date: "2025-03-30",
    readTime: "10 min read",
    image: threatHuntingImage,
    tags: ["Threat Hunting", "MITRE ATT&CK", "Proactive Defense"],
    url: "https://journal.ishaansrv.com/2025/03/30/introducing-you-to-threat-hunting/",
    author: "Ishaan Srivastava"
  }
];

export interface JournalPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  url: string;
  author?: string;
}

const rssService = new RSSService();

const mapRSSToJournalPost = (item: RSSItem, defaultImage: string): JournalPost => ({
  id: item.id,
  title: item.title,
  excerpt: item.excerpt,
  date: item.pubDate,
  readTime: `${Math.max(1, Math.ceil(item.content.length / 1000))} min read`,
  image: item.thumbnail || defaultImage,
  tags: item.categories.slice(0, 3),
  url: item.link,
  author: item.author
});

export const useCyberJournalPosts = (limit?: number) => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['cyber-journal', WORDPRESS_RSS_URL],
    queryFn: async (): Promise<JournalPost[]> => {
      const rssPosts = await rssService.fetchRSSFeed(WORDPRESS_RSS_URL);
      
      if (rssPosts.length === 0) {
        throw new Error('No posts found in RSS feed');
      }
      
      return rssPosts.map((item, index) => 
        mapRSSToJournalPost(item, fallbackPosts[index % fallbackPosts.length]?.image || hexAppealImage)
      );
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['cyber-journal', WORDPRESS_RSS_URL] });
  };

  // Get posts with optional limit, falling back to fallback posts on error
  const posts = query.data 
    ? (limit ? query.data.slice(0, limit) : query.data)
    : (query.isError ? fallbackPosts.slice(0, limit) : []);

  return {
    posts,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isSuccess: query.isSuccess,
    usingRSS: query.isSuccess && !query.isError,
    refresh,
    isRefreshing: query.isFetching && !query.isLoading,
  };
};
