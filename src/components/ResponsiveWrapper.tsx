
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
  viewportHeight: number;
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
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
    viewportHeight: 1080,
    safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  // Enhanced media queries with better breakpoints
  const isMobileQuery = useMediaQuery({ maxWidth: 767 });
  const isTabletQuery = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktopQuery = useMediaQuery({ minWidth: 1024 });
  const isSmallMobile = useMediaQuery({ maxWidth: 479 });
  const isLargeMobile = useMediaQuery({ minWidth: 480, maxWidth: 767 });
  const isSmallTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isLargeTablet = useMediaQuery({ minWidth: 992, maxWidth: 1023 });

  useEffect(() => {
    const updatePlatformInfo = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const visualViewport = window.visualViewport;
      
      // Enhanced browser detection
      const isChrome = /chrome/i.test(userAgent) && !/edge/i.test(userAgent);
      const isFirefox = /firefox/i.test(userAgent);
      const isEdge = /edge/i.test(userAgent);
      
      // Screen size categorization with more granular breakpoints
      let screenSize: 'small' | 'medium' | 'large' | 'xlarge' = 'large';
      if (width < 480) screenSize = 'small';
      else if (width < 768) screenSize = 'medium';
      else if (width < 1200) screenSize = 'large';
      else screenSize = 'xlarge';
      
      // Touch support detection
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Connection type detection
      let connectionType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown' = 'unknown';
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connectionType = connection.effectiveType || 'unknown';
      }
      
      // Enhanced low-end device detection
      const isLowEndDevice = (
        connectionType === 'slow-2g' || 
        connectionType === '2g' || 
        ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) ||
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
        window.devicePixelRatio < 1.5
      );
      
      // Safe area insets for devices with notches
      const safeAreaInsets = {
        top: parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '0'),
        bottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || '0'),
        left: parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-left)') || '0'),
        right: parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-right)') || '0'),
      };
      
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
        viewportHeight: visualViewport?.height || height,
        safeAreaInsets,
      });
    };

    updatePlatformInfo();

    // Enhanced event listeners for better responsiveness
    const handleResize = () => updatePlatformInfo();
    const handleOrientationChange = () => {
      setTimeout(updatePlatformInfo, 100);
    };
    const handleVisualViewportChange = () => {
      setTimeout(updatePlatformInfo, 50);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportChange, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
      }
    };
  }, [isMobileQuery, isTabletQuery, isDesktopQuery]);

  // Enhanced responsive classes with better mobile support
  const getResponsiveClasses = () => {
    const classes = ['min-h-screen', 'w-full', 'overflow-x-hidden'];
    
    // Platform-specific classes
    if (platformInfo.isMobile) {
      classes.push('mobile-optimized', 'touch-manipulation');
      if (isSmallMobile) classes.push('small-mobile');
      if (isLargeMobile) classes.push('large-mobile');
    }
    
    if (platformInfo.isTablet) {
      classes.push('tablet-optimized');
      if (isSmallTablet) classes.push('small-tablet');
      if (isLargeTablet) classes.push('large-tablet');
    }
    
    if (platformInfo.isDesktop) classes.push('desktop-optimized');
    
    // Browser-specific classes
    if (platformInfo.isSafari) classes.push('safari-optimized');
    if (platformInfo.isIOS) classes.push('ios-optimized');
    if (platformInfo.isAndroid) classes.push('android-optimized');
    if (platformInfo.isChrome) classes.push('chrome-optimized');
    if (platformInfo.isFirefox) classes.push('firefox-optimized');
    if (platformInfo.isEdge) classes.push('edge-optimized');
    
    // Feature classes
    if (platformInfo.pixelRatio >= 2) classes.push('retina-optimized');
    if (platformInfo.hasTouch) classes.push('touch-enabled');
    if (platformInfo.isLowEndDevice) classes.push('low-end-device');
    
    // Screen size classes
    classes.push(`screen-${platformInfo.screenSize}`);
    classes.push(`orientation-${platformInfo.orientation}`);
    
    return classes.join(' ');
  };

  // Enhanced platform styles with better mobile viewport handling
  const getPlatformStyles = (): CSSProperties => {
    const baseStyles: CSSProperties = {
      WebkitOverflowScrolling: 'touch',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      position: 'relative',
    };

    // Mobile/Tablet specific optimizations
    if (platformInfo.isMobile || platformInfo.isTablet) {
      const mobileStyles: CSSProperties = {
        ...baseStyles,
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overscrollBehavior: 'contain',
        WebkitTextSizeAdjust: '100%',
        textSizeAdjust: '100%',
        minHeight: '100vh',
        minHeight: '100dvh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        fontSize: platformInfo.screenSize === 'small' ? '14px' : '16px',
      };
      
      // iOS specific fixes
      if (platformInfo.isIOS) {
        mobileStyles.minHeight = '100vh';
        mobileStyles.minHeight = '-webkit-fill-available';
        mobileStyles.height = '100vh';
        mobileStyles.height = '-webkit-fill-available';
        // Prevent iOS zoom on input focus
        mobileStyles.fontSize = '16px';
        mobileStyles.paddingTop = `${platformInfo.safeAreaInsets.top}px`;
        mobileStyles.paddingBottom = `${platformInfo.safeAreaInsets.bottom}px`;
        mobileStyles.paddingLeft = `${platformInfo.safeAreaInsets.left}px`;
        mobileStyles.paddingRight = `${platformInfo.safeAreaInsets.right}px`;
      }
      
      // Android specific fixes
      if (platformInfo.isAndroid) {
        mobileStyles.minHeight = '100vh';
        mobileStyles.minHeight = '100dvh';
        mobileStyles.height = platformInfo.viewportHeight;
      }
      
      // Low-end device optimizations
      if (platformInfo.isLowEndDevice) {
        mobileStyles.willChange = 'auto';
        mobileStyles.transform = 'none';
      }
      
      return mobileStyles;
    }

    // Desktop optimizations
    return {
      ...baseStyles,
      minHeight: '100vh',
      fontSize: '16px',
    };
  };

  // Apply global optimizations
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    
    // Enhanced platform classes
    const platformClasses = [
      platformInfo.isMobile ? 'platform-mobile' : '',
      platformInfo.isTablet ? 'platform-tablet' : '',
      platformInfo.isDesktop ? 'platform-desktop' : '',
      platformInfo.isIOS ? 'platform-ios' : '',
      platformInfo.isAndroid ? 'platform-android' : '',
      platformInfo.isSafari ? 'platform-safari' : '',
      platformInfo.isChrome ? 'platform-chrome' : '',
      platformInfo.isFirefox ? 'platform-firefox' : '',
      platformInfo.hasTouch ? 'has-touch' : 'no-touch',
      platformInfo.isLowEndDevice ? 'low-end-device' : '',
      `screen-${platformInfo.screenSize}`,
      `orientation-${platformInfo.orientation}`,
    ].filter(Boolean);
    
    body.classList.add(...platformClasses);
    
    // Enhanced viewport and zoom fixes
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      if (platformInfo.isMobile || platformInfo.isTablet) {
        viewportMeta.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        );
      } else {
        viewportMeta.setAttribute('content', 
          'width=device-width, initial-scale=1.0, user-scalable=yes, viewport-fit=cover'
        );
      }
    }
    
    // iOS viewport fixes
    if (platformInfo.isIOS) {
      html.style.height = '100%';
      html.style.height = '-webkit-fill-available';
      body.style.minHeight = '100%';
      body.style.minHeight = '-webkit-fill-available';
    }
    
    // Performance optimizations for low-end devices
    if (platformInfo.isLowEndDevice) {
      html.style.setProperty('--transition-smooth', 'none');
      html.style.setProperty('--transition-glow', 'none');
      // Disable heavy animations
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
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
      data-screen-size={platformInfo.screenSize}
      data-viewport-height={platformInfo.viewportHeight}
    >
      {children}
    </div>
  );
};
