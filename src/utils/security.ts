import DOMPurify from 'dompurify';
import validator from 'validator';

// XSS Protection utilities
export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input'],
  });
};

export const sanitizeText = (text: string): string => {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

// Input validation utilities
export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const validateUrl = (url: string): boolean => {
  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
  });
};

export const validatePhoneNumber = (phone: string): boolean => {
  return validator.isMobilePhone(phone);
};

// Content Security Policy helpers
export const getSecureHeaders = () => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
});

// Safe external link attributes
export const getSafeExternalLinkProps = (url: string) => {
  if (!validateUrl(url)) {
    console.warn('Invalid URL provided:', url);
    return {};
  }
  
  return {
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
    href: url,
  };
};

// Rate limiting helpers (client-side)
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.attempts.has(key)) {
      this.attempts.set(key, []);
    }
    
    const attempts = this.attempts.get(key)!;
    const validAttempts = attempts.filter(time => time > windowStart);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

// Client-side storage utilities
// NOTE: This is NOT encrypted storage. Do not store sensitive data client-side.
// For truly sensitive data, use server-side storage with proper encryption.
export const clientStorage = {
  /**
   * Store a value in localStorage
   * WARNING: Not encrypted - do not use for sensitive data
   */
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage may be full or disabled - fail silently in production
    }
  },
  
  /**
   * Retrieve a value from localStorage
   */
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  /**
   * Remove a value from localStorage
   */
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Fail silently
    }
  },
  
  /**
   * Clear all localStorage
   */
  clear: (): void => {
    try {
      localStorage.clear();
    } catch {
      // Fail silently
    }
  }
};

// Alias for backward compatibility - but renamed to avoid misleading name
export const secureStorage = clientStorage;

// Form security helpers
export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      sanitized[key] = sanitizeText(data[key]);
    } else {
      sanitized[key] = data[key];
    }
  });
  
  return sanitized;
};