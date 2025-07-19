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
  async fetchRSSFeed(feedUrl: string): Promise<RSSItem[]> {
    console.log('Attempting to fetch RSS feed from:', feedUrl);
    
    // Try multiple CORS proxy services
    const corsProxies = [
      `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`,
      `https://corsproxy.io/?${encodeURIComponent(feedUrl)}`,
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`
    ];

    for (let i = 0; i < corsProxies.length; i++) {
      try {
        console.log(`Trying proxy ${i + 1}:`, corsProxies[i]);
        
        if (i === 2) {
          // rss2json has different response format
          return await this.fetchViaRss2Json(corsProxies[i]);
        } else {
          const response = await fetch(corsProxies[i]);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log('Proxy response:', data);
          
          if (!data.contents) {
            throw new Error('No contents in proxy response');
          }

          return await this.parseXMLFeed(data.contents);
        }
      } catch (error) {
        console.error(`Proxy ${i + 1} failed:`, error);
        if (i === corsProxies.length - 1) {
          throw error;
        }
        continue;
      }
    }

    throw new Error('All CORS proxies failed');
  }

  private async fetchViaRss2Json(url: string): Promise<RSSItem[]> {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('RSS2JSON service error');
    }

    return data.items.map((item: any, index: number) => ({
      id: item.guid || item.link || `item-${index}`,
      title: item.title || 'Untitled',
      excerpt: this.extractExcerpt(item.description || ''),
      content: item.content || item.description || '',
      link: item.link || '',
      pubDate: item.pubDate || new Date().toISOString(),
      author: item.author || 'Unknown Author',
      categories: item.categories || [],
      thumbnail: item.thumbnail
    }));
  }

  private async parseXMLFeed(xmlContent: string): Promise<RSSItem[]> {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
    
    // Check for parsing errors
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Invalid XML format');
    }

    const items = xmlDoc.querySelectorAll('item');
    console.log(`Found ${items.length} items in RSS feed`);
    
    return Array.from(items).map((item, index) => {
      const title = this.getTextContent(item, 'title') || 'Untitled';
      const link = this.getTextContent(item, 'link') || '';
      const description = this.getTextContent(item, 'description') || '';
      const pubDate = this.getTextContent(item, 'pubDate') || new Date().toISOString();
      const author = this.getTextContent(item, 'dc:creator') || 
                    this.getTextContent(item, 'author') || 
                    'Unknown Author';
      
      return {
        id: this.getTextContent(item, 'guid') || link || `item-${index}`,
        title,
        excerpt: this.extractExcerpt(description),
        content: description,
        link,
        pubDate,
        author,
        categories: this.extractCategories(item),
        thumbnail: this.extractThumbnail(item, description)
      };
    });
  }

  private getTextContent(element: Element, tagName: string): string {
    const el = element.querySelector(tagName);
    return el ? el.textContent?.trim() || '' : '';
  }

  private extractExcerpt(description: string): string {
    if (!description) return 'No excerpt available';
    
    // Strip HTML tags
    const stripped = this.stripHtml(description);
    
    // Get first 150 characters
    return stripped.length > 150 ? stripped.substring(0, 150) + '...' : stripped;
  }

  private extractCategories(item: Element): string[] {
    const categories: string[] = [];
    
    // Get all category elements
    const categoryElements = item.querySelectorAll('category');
    categoryElements.forEach(cat => {
      const text = cat.textContent?.trim();
      if (text) categories.push(text);
    });

    return categories.filter(Boolean);
  }

  private extractThumbnail(item: Element, description: string): string | undefined {
    // Try to find media thumbnail
    const mediaThumbnail = item.querySelector('media\\:thumbnail, thumbnail');
    if (mediaThumbnail) {
      const url = mediaThumbnail.getAttribute('url');
      if (url) return url;
    }

    // Try to find enclosure
    const enclosure = item.querySelector('enclosure');
    if (enclosure) {
      const type = enclosure.getAttribute('type');
      const url = enclosure.getAttribute('url');
      if (type?.startsWith('image/') && url) return url;
    }

    // Extract from description/content
    const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
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