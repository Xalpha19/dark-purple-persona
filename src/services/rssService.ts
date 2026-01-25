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

// Security constants for XML parsing
const MAX_XML_SIZE = 1024 * 1024; // 1MB max
const MAX_ITEMS = 50; // Maximum number of items to parse
const MAX_ELEMENT_DEPTH = 10; // Maximum nesting depth

export class RSSService {
  async fetchRSSFeed(feedUrl: string): Promise<RSSItem[]> {
    // Validate URL before fetching
    if (!this.isValidFeedUrl(feedUrl)) {
      throw new Error('Invalid feed URL');
    }

    // Try multiple CORS proxy services
    const corsProxies = [
      `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`,
      `https://corsproxy.io/?${encodeURIComponent(feedUrl)}`,
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`
    ];

    for (let i = 0; i < corsProxies.length; i++) {
      try {
        if (i === 2) {
          // rss2json has different response format
          return await this.fetchViaRss2Json(corsProxies[i]);
        } else {
          const response = await fetch(corsProxies[i]);
          
          if (!response.ok) {
            throw new Error('Feed fetch failed');
          }
          
          const data = await response.json();
          
          if (!data.contents) {
            throw new Error('No contents in response');
          }

          // Validate content size before parsing
          if (data.contents.length > MAX_XML_SIZE) {
            throw new Error('Feed content exceeds size limit');
          }

          return await this.parseXMLFeed(data.contents);
        }
      } catch {
        if (i === corsProxies.length - 1) {
          throw new Error('Unable to fetch feed');
        }
        continue;
      }
    }

    throw new Error('Unable to fetch feed');
  }

  private isValidFeedUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
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
    // Validate XML size
    if (xmlContent.length > MAX_XML_SIZE) {
      throw new Error('XML content exceeds size limit');
    }

    // Basic validation before parsing - check for suspicious patterns
    if (this.containsSuspiciousPatterns(xmlContent)) {
      throw new Error('XML contains potentially unsafe content');
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
    
    // Check for parsing errors
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Invalid XML format');
    }

    // Validate document structure
    const rootElement = xmlDoc.documentElement;
    if (!rootElement || !['rss', 'feed', 'rdf:RDF'].includes(rootElement.tagName.toLowerCase())) {
      throw new Error('Invalid RSS feed structure');
    }

    // Check depth of document
    if (this.getMaxDepth(rootElement) > MAX_ELEMENT_DEPTH) {
      throw new Error('XML structure too deeply nested');
    }

    const items = xmlDoc.querySelectorAll('item');
    
    // Limit number of items processed
    const limitedItems = Array.from(items).slice(0, MAX_ITEMS);
    
    return limitedItems.map((item, index) => {
      const title = this.sanitizeTextContent(this.getTextContent(item, 'title')) || 'Untitled';
      const link = this.sanitizeUrl(this.getTextContent(item, 'link')) || '';
      const description = this.getTextContent(item, 'description') || '';
      const pubDate = this.getTextContent(item, 'pubDate') || new Date().toISOString();
      const author = this.sanitizeTextContent(
        this.getTextContent(item, 'dc:creator') || 
        this.getTextContent(item, 'author') || 
        'Unknown Author'
      );
      
      return {
        id: this.sanitizeTextContent(this.getTextContent(item, 'guid')) || link || `item-${index}`,
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

  private containsSuspiciousPatterns(xml: string): boolean {
    // Check for XXE attack patterns
    const suspiciousPatterns = [
      /<!ENTITY/i,
      /<!DOCTYPE[^>]*\[/i,
      /SYSTEM\s+["']/i,
      /PUBLIC\s+["']/i,
      /<!\[CDATA\[.*?javascript:/i,
      /<!NOTATION/i
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(xml));
  }

  private getMaxDepth(element: Element, currentDepth = 0): number {
    if (currentDepth > MAX_ELEMENT_DEPTH) {
      return currentDepth;
    }
    
    let maxChildDepth = currentDepth;
    for (const child of Array.from(element.children)) {
      const childDepth = this.getMaxDepth(child, currentDepth + 1);
      maxChildDepth = Math.max(maxChildDepth, childDepth);
    }
    return maxChildDepth;
  }

  private sanitizeTextContent(text: string): string {
    // Remove any HTML/script tags and trim
    return text.replace(/<[^>]*>/g, '').trim().substring(0, 500);
  }

  private sanitizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      // Only allow http/https protocols
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return '';
      }
      return parsed.toString();
    } catch {
      return '';
    }
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