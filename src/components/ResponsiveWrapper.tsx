import { ReactNode, useEffect, useState, CSSProperties } from 'react';
import { useMediaQuery } from 'react-responsive';
import { isMobile, isTablet, isSafari, isIOS, isAndroid, isBrowser } from 'react-device-detect';

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
}

interface EnhancedPlatformInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSafari: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isBrowser: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  orientation: 'portrait' | 'landscape';
  hasTouch: boolean;
  connectionType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
  screenSize: 'small' | 'medium' | 'large' | 'xlarge';
  isLowEndDevice: boolean;
}

export const ResponsiveWrapper = ({ children, className = '' }: ResponsiveWrapperProps) => {
  const [platformInfo, setPlatformInfo] = useState<EnhancedPlatformInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isSafari: false,
    isIOS: false,
    isAndroid: false,
    isBrowser: true,
    isChrome: false,
    isFirefox: false,
    isEdge: false,
    screenWidth: 1920,
    screenHeight: 1080,
    pixelRatio: 1,
    orientation: 'landscape',
    hasTouch: false,
    connectionType: 'unknown',
    screenSize: 'large',
    isLowEndDevice: false,
  });

  // Enhanced media queries
  const isMobileQuery = useMediaQuery({ maxWidth: 767 });
  const isTabletQuery = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktopQuery = useMediaQuery({ minWidth: 1024 });
  const isRetinaQuery = useMediaQuery({ minResolution: '2dppx' });
  // Note: Reduced motion and high contrast queries not supported by react-responsive
  // but we can still use them in CSS with @media queries

  useEffect(() => {
    const updatePlatformInfo = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Enhanced browser detection
      const isChrome = /chrome/i.test(userAgent) && !/edge/i.test(userAgent);
      const isFirefox = /firefox/i.test(userAgent);
      const isEdge = /edge/i.test(userAgent);
      
      // Screen size categorization
      let screenSize: 'small' | 'medium' | 'large' | 'xlarge' = 'large';
      if (width < 640) screenSize = 'small';
      else if (width < 1024) screenSize = 'medium';
      else if (width < 1440) screenSize = 'large';
      else screenSize = 'xlarge';
      
      // Touch support detection
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Connection type
      let connectionType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown' = 'unknown';
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connectionType = connection.effectiveType || 'unknown';
      }
      
      // Low-end device detection (with safe property access)
      const isLowEndDevice = (
        connectionType === 'slow-2g' || 
        connectionType === '2g' || 
        ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) ||
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
      );
      
      setPlatformInfo({
        isMobile: isMobile || isMobileQuery,
        isTablet: isTablet || isTabletQuery,
        isDesktop: !isMobile && !isTablet && isDesktopQuery,
        isSafari,
        isIOS,
        isAndroid,
        isBrowser,
        isChrome,
        isFirefox,
        isEdge,
        screenWidth: width,
        screenHeight: height,
        pixelRatio: window.devicePixelRatio || 1,
        orientation: width > height ? 'landscape' : 'portrait',
        hasTouch,
        connectionType,
        screenSize,
        isLowEndDevice,
      });
    };

    updatePlatformInfo();

    const handleResize = () => updatePlatformInfo();
    const handleOrientationChange = () => {
      // Delay to ensure accurate dimensions after orientation change
      setTimeout(updatePlatformInfo, 150);
    };

    // Enhanced event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Performance monitoring for mobile
    if (platformInfo.isMobile || platformInfo.isTablet) {
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          updatePlatformInfo();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [isMobileQuery, isTabletQuery, isDesktopQuery]);

  // Enhanced responsive classes
  const getResponsiveClasses = () => {
    const classes = ['min-h-screen', 'w-full', 'overflow-x-hidden'];
    
    // Platform classes
    if (platformInfo.isMobile) classes.push('mobile-optimized', 'touch-manipulation');
    if (platformInfo.isTablet) classes.push('tablet-optimized', 'touch-manipulation');
    if (platformInfo.isDesktop) classes.push('desktop-optimized');
    
    // Browser classes
    if (platformInfo.isSafari) classes.push('safari-optimized');
    if (platformInfo.isIOS) classes.push('ios-optimized');
    if (platformInfo.isAndroid) classes.push('android-optimized');
    if (platformInfo.isChrome) classes.push('chrome-optimized');
    if (platformInfo.isFirefox) classes.push('firefox-optimized');
    if (platformInfo.isEdge) classes.push('edge-optimized');
    
    // Display classes
    if (platformInfo.pixelRatio >= 2) classes.push('retina-optimized');
    if (platformInfo.hasTouch) classes.push('touch-enabled');
    if (platformInfo.isLowEndDevice) classes.push('low-end-device');
    
    // Screen size classes
    classes.push(`screen-${platformInfo.screenSize}`);
    classes.push(`orientation-${platformInfo.orientation}`);
    classes.push(`connection-${platformInfo.connectionType}`);
    
    return classes.join(' ');
  };

  // Enhanced platform styles
  const getPlatformStyles = (): CSSProperties => {
    const baseStyles: CSSProperties = {
      WebkitOverflowScrolling: 'touch',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
    };

    // Mobile/Tablet optimizations
    if (platformInfo.isMobile || platformInfo.isTablet) {
      const mobileStyles: CSSProperties = {
        ...baseStyles,
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        minHeight: '100dvh', // Dynamic viewport height
        overscrollBehavior: 'contain',
      };
      
      // iOS specific fixes
      if (platformInfo.isIOS) {
        mobileStyles.WebkitTextSizeAdjust = '100%';
        mobileStyles.fontSize = '16px'; // Prevent zoom on input focus
      }
      
      return mobileStyles;
    }

    // Safari specific optimizations
    if (platformInfo.isSafari) {
      return {
        ...baseStyles,
        WebkitTransform: 'translateZ(0)',
        WebkitPerspective: '1000px',
        WebkitBackfaceVisibility: 'hidden',
      };
    }

    // Low-end device optimizations
    if (platformInfo.isLowEndDevice) {
      return {
        ...baseStyles,
        willChange: 'auto', // Reduce GPU usage
      };
    }

    return baseStyles;
  };

  // Apply global optimizations
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    
    // Apply platform classes to body
    const platformClasses = [
      platformInfo.isMobile ? 'platform-mobile' : '',
      platformInfo.isTablet ? 'platform-tablet' : '',
      platformInfo.isDesktop ? 'platform-desktop' : '',
      platformInfo.isIOS ? 'platform-ios' : '',
      platformInfo.isAndroid ? 'platform-android' : '',
      platformInfo.isSafari ? 'platform-safari' : '',
      platformInfo.hasTouch ? 'has-touch' : 'no-touch',
      platformInfo.isLowEndDevice ? 'low-end-device' : '',
    ].filter(Boolean);
    
    body.classList.add(...platformClasses);
    
    // iOS viewport fix
    if (platformInfo.isIOS) {
      html.style.height = '100%';
      html.style.height = '-webkit-fill-available';
      body.style.minHeight = '100%';
      body.style.minHeight = '-webkit-fill-available';
    }
    
    // Performance optimizations for low-end devices
    if (platformInfo.isLowEndDevice) {
      body.style.setProperty('--transition-smooth', 'none');
      body.style.setProperty('--transition-glow', 'none');
    }
    
    return () => {
      body.classList.remove(...platformClasses);
    };
  }, [platformInfo]);

  return (
    <div 
      className={`${getResponsiveClasses()} ${className}`}
      style={getPlatformStyles()}
      data-platform={platformInfo.isMobile ? 'mobile' : platformInfo.isTablet ? 'tablet' : 'desktop'}
      data-os={platformInfo.isIOS ? 'ios' : platformInfo.isAndroid ? 'android' : 'desktop'}
      data-browser={platformInfo.isSafari ? 'safari' : platformInfo.isChrome ? 'chrome' : 'other'}
      data-pixel-ratio={platformInfo.pixelRatio}
      data-orientation={platformInfo.orientation}
      data-touch={platformInfo.hasTouch}
      data-connection={platformInfo.connectionType}
      data-screen-size={platformInfo.screenSize}
    >
      {children}
    </div>
  );
};