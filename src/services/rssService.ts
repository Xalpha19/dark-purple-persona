import Parser from 'rss-parser';

export interface RSSItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  link: string;
  pubDate: string;
  author: string;
  categories: string[];
  thumbnail?: string;
}

export class RSSService {
  private parser: Parser;

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: [
          ['media:thumbnail', 'thumbnail'],
          ['content:encoded', 'contentEncoded'],
          ['wp:post_id', 'postId'],
          ['wp:post_date', 'postDate'],
          ['wp:excerpt', 'excerpt']
        ]
      }
    });
  }

  async fetchRSSFeed(feedUrl: string): Promise<RSSItem[]> {
    try {
      // Use CORS proxy for client-side RSS fetching
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
      
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (!data.contents) {
        throw new Error('Failed to fetch RSS feed');
      }

      const feed = await this.parser.parseString(data.contents);
      
      return feed.items.map((item, index) => ({
        id: item.guid || item.link || `item-${index}`,
        title: item.title || 'Untitled',
        excerpt: this.extractExcerpt(item),
        content: this.extractContent(item),
        link: item.link || '',
        pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
        author: item.creator || item['dc:creator'] || 'Unknown Author',
        categories: this.extractCategories(item),
        thumbnail: this.extractThumbnail(item)
      }));
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
      throw new Error('Failed to fetch RSS feed');
    }
  }

  private extractExcerpt(item: any): string {
    // Try different excerpt sources
    if (item.excerpt) return this.stripHtml(item.excerpt);
    if (item.contentSnippet) return item.contentSnippet;
    if (item.summary) return this.stripHtml(item.summary);
    if (item.content) {
      const content = this.stripHtml(item.content);
      return content.length > 150 ? content.substring(0, 150) + '...' : content;
    }
    return 'No excerpt available';
  }

  private extractContent(item: any): string {
    if (item.contentEncoded) return item.contentEncoded;
    if (item.content) return item.content;
    if (item['content:encoded']) return item['content:encoded'];
    return item.contentSnippet || '';
  }

  private extractCategories(item: any): string[] {
    const categories: string[] = [];
    
    if (item.categories) {
      categories.push(...item.categories);
    }
    
    if (item.category) {
      if (Array.isArray(item.category)) {
        categories.push(...item.category);
      } else {
        categories.push(item.category);
      }
    }

    return categories.filter(Boolean);
  }

  private extractThumbnail(item: any): string | undefined {
    // Try various thumbnail sources
    if (item.thumbnail && item.thumbnail.url) return item.thumbnail.url;
    if (item['media:thumbnail'] && item['media:thumbnail'].url) return item['media:thumbnail'].url;
    if (item.enclosure && item.enclosure.type?.startsWith('image/')) return item.enclosure.url;
    
    // Extract from content
    const content = item.content || item.contentEncoded || '';
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : undefined;
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }

  async fetchMultipleFeeds(feedUrls: string[]): Promise<RSSItem[]> {
    try {
      const feedPromises = feedUrls.map(url => this.fetchRSSFeed(url));
      const feedResults = await Promise.allSettled(feedPromises);
      
      const allItems: RSSItem[] = [];
      
      feedResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          allItems.push(...result.value);
        } else {
          console.error(`Failed to fetch feed ${feedUrls[index]}:`, result.reason);
        }
      });

      // Sort by publication date (newest first)
      return allItems.sort((a, b) => 
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );
    } catch (error) {
      console.error('Error fetching multiple feeds:', error);
      return [];
    }
  }
}