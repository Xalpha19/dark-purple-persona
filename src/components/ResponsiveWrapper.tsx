import { ReactNode, useEffect, useState, CSSProperties } from 'react';
import { useMediaQuery } from 'react-responsive';
import { isMobile, isTablet, isSafari, isIOS, isAndroid, isBrowser } from 'react-device-detect';

interface ResponsiveWrapperProps {
  children: ReactNode;
}

interface PlatformInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSafari: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isBrowser: boolean;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
}

export const ResponsiveWrapper = ({ children }: ResponsiveWrapperProps) => {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isSafari: false,
    isIOS: false,
    isAndroid: false,
    isBrowser: true,
    screenWidth: 1920,
    screenHeight: 1080,
    pixelRatio: 1,
  });

  // Media queries for responsive breakpoints
  const isMobileQuery = useMediaQuery({ maxWidth: 767 });
  const isTabletQuery = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktopQuery = useMediaQuery({ minWidth: 1024 });
  const isRetinaQuery = useMediaQuery({ minResolution: '2dppx' });

  useEffect(() => {
    const updatePlatformInfo = () => {
      setPlatformInfo({
        isMobile: isMobile || isMobileQuery,
        isTablet: isTablet || isTabletQuery,
        isDesktop: !isMobile && !isTablet && isDesktopQuery,
        isSafari,
        isIOS,
        isAndroid,
        isBrowser,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        pixelRatio: window.devicePixelRatio || 1,
      });
    };

    updatePlatformInfo();

    const handleResize = () => {
      updatePlatformInfo();
    };

    const handleOrientationChange = () => {
      // Delay to ensure dimensions are updated after orientation change
      setTimeout(updatePlatformInfo, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Handle viewport changes on mobile browsers
    if (platformInfo.isMobile || platformInfo.isTablet) {
      window.addEventListener('scroll', updatePlatformInfo, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('scroll', updatePlatformInfo);
    };
  }, [isMobileQuery, isTabletQuery, isDesktopQuery]);

  // Dynamic CSS classes based on platform
  const getResponsiveClasses = () => {
    const classes = ['min-h-screen', 'w-full', 'overflow-x-hidden'];
    
    if (platformInfo.isMobile) {
      classes.push('mobile-optimized', 'touch-manipulation');
    }
    if (platformInfo.isTablet) {
      classes.push('tablet-optimized', 'touch-manipulation');
    }
    if (platformInfo.isDesktop) {
      classes.push('desktop-optimized');
    }
    if (platformInfo.isSafari) {
      classes.push('safari-optimized');
    }
    if (platformInfo.isIOS) {
      classes.push('ios-optimized');
    }
    if (platformInfo.isAndroid) {
      classes.push('android-optimized');
    }
    if (platformInfo.pixelRatio >= 2) {
      classes.push('retina-optimized');
    }
    
    return classes.join(' ');
  };

  // Dynamic styles for platform-specific optimizations
  const getPlatformStyles = (): CSSProperties => {
    const baseStyles: CSSProperties = {
      WebkitOverflowScrolling: 'touch',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
    };

    if (platformInfo.isMobile || platformInfo.isTablet) {
      return {
        ...baseStyles,
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        minHeight: '100dvh', // Dynamic viewport height for modern browsers
      } as CSSProperties;
    }

    if (platformInfo.isSafari) {
      return {
        ...baseStyles,
        WebkitTransform: 'translateZ(0)',
        WebkitPerspective: '1000px',
      } as CSSProperties;
    }

    return baseStyles;
  };

  return (
    <div 
      className={getResponsiveClasses()}
      style={getPlatformStyles()}
      data-platform={`${platformInfo.isMobile ? 'mobile' : platformInfo.isTablet ? 'tablet' : 'desktop'}`}
      data-os={`${platformInfo.isIOS ? 'ios' : platformInfo.isAndroid ? 'android' : 'desktop'}`}
      data-browser={`${platformInfo.isSafari ? 'safari' : 'other'}`}
      data-pixel-ratio={platformInfo.pixelRatio}
    >
      {children}
    </div>
  );
};