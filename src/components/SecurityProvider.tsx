import * as React from 'react';
import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSecureHeaders } from '@/utils/security';

interface SecurityContextType {
  isSecure: boolean;
  reportSecurityViolation: (violation: string) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';

  const reportSecurityViolation = (violation: string) => {
    console.warn('Security violation reported:', violation);
    // In production, send to security monitoring service
  };

  useEffect(() => {
    // Check for HTTPS in production
    if (process.env.NODE_ENV === 'production' && !isSecure) {
      console.warn('Application is not served over HTTPS in production');
    }

    // Disable right-click context menu in production for additional security
    const handleContextMenu = (e: MouseEvent) => {
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };

    // Disable certain keyboard shortcuts in production
    const handleKeyDown = (e: KeyboardEvent) => {
      if (process.env.NODE_ENV === 'production') {
        // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+C
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'u') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C')
        ) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Detect tampering attempts
    const detectTampering = () => {
      const startTime = performance.now();
      debugger; // This will pause if dev tools are open
      const endTime = performance.now();
      
      if (endTime - startTime > 100) {
        reportSecurityViolation('Developer tools detected');
      }
    };

    if (process.env.NODE_ENV === 'production') {
      setInterval(detectTampering, 3000);
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSecure]);

  const secureHeaders = getSecureHeaders();

  return (
    <SecurityContext.Provider value={{ isSecure, reportSecurityViolation }}>
      <Helmet>
        {/* Content Security Policy */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:; frame-src 'none'; object-src 'none'; base-uri 'self';"
        />
        
        {/* Security Headers */}
        {Object.entries(secureHeaders).map(([key, value]) => (
          <meta key={key} httpEquiv={key} content={value} />
        ))}
        
        {/* Additional Security Meta Tags */}
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
        <meta name="robots" content="index, follow, noarchive, nosnippet, noimageindex" />
      </Helmet>
      {children}
    </SecurityContext.Provider>
  );
};