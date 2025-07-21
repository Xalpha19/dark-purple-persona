import { useState, useEffect } from 'react';

export interface PlatformInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  screenSize: 'small' | 'medium' | 'large' | 'xlarge';
  orientation: 'portrait' | 'landscape';
  hasTouch: boolean;
  pixelRatio: number;
  connectionType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
}

export function usePlatformDetection(): PlatformInfo {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
    isFirefox: false,
    isEdge: false,
    screenSize: 'large',
    orientation: 'landscape',
    hasTouch: false,
    pixelRatio: 1,
    connectionType: 'unknown'
  });

  useEffect(() => {
    const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Device type detection
      const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent) || width < 768;
      const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent) || (width >= 768 && width < 1024);
      const isDesktop = !isMobile && !isTablet;

      // OS detection
      const isIOS = /iphone|ipad|ipod/i.test(userAgent);
      const isAndroid = /android/i.test(userAgent);

      // Browser detection
      const isSafari = /safari/i.test(userAgent) && !/chrome/i.test(userAgent);
      const isChrome = /chrome/i.test(userAgent) && !/edge/i.test(userAgent);
      const isFirefox = /firefox/i.test(userAgent);
      const isEdge = /edge/i.test(userAgent);

      // Screen size categories
      let screenSize: 'small' | 'medium' | 'large' | 'xlarge' = 'large';
      if (width < 640) screenSize = 'small';
      else if (width < 1024) screenSize = 'medium';
      else if (width < 1440) screenSize = 'large';
      else screenSize = 'xlarge';

      // Orientation
      const orientation = width > height ? 'landscape' : 'portrait';

      // Touch support
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Pixel ratio
      const pixelRatio = window.devicePixelRatio || 1;

      // Connection type
      let connectionType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown' = 'unknown';
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connectionType = connection.effectiveType || 'unknown';
      }

      setPlatformInfo({
        isMobile,
        isTablet,
        isDesktop,
        isIOS,
        isAndroid,
        isSafari,
        isChrome,
        isFirefox,
        isEdge,
        screenSize,
        orientation,
        hasTouch,
        pixelRatio,
        connectionType
      });
    };

    // Initial detection
    detectPlatform();

    // Listen for resize and orientation changes
    const handleResize = () => detectPlatform();
    const handleOrientationChange = () => {
      // Delay to ensure accurate dimensions after orientation change
      setTimeout(detectPlatform, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return platformInfo;
}

export function usePlatformOptimization() {
  const platform = usePlatformDetection();

  const getOptimizedClasses = () => {
    const classes = [];

    if (platform.isMobile) classes.push('mobile-optimized');
    if (platform.isTablet) classes.push('tablet-optimized');
    if (platform.isDesktop) classes.push('desktop-optimized');
    if (platform.isSafari) classes.push('safari-optimized');
    if (platform.isIOS) classes.push('ios-optimized');
    if (platform.isAndroid) classes.push('android-optimized');
    if (platform.pixelRatio > 1) classes.push('retina-optimized');
    if (platform.hasTouch) classes.push('touch-manipulation');

    return classes.join(' ');
  };

  const getContainerClasses = () => {
    const baseClasses = 'w-full mx-auto px-4';
    
    switch (platform.screenSize) {
      case 'small':
        return `${baseClasses} max-w-sm px-3`;
      case 'medium':
        return `${baseClasses} max-w-4xl px-6`;
      case 'large':
        return `${baseClasses} max-w-6xl px-8`;
      case 'xlarge':
        return `${baseClasses} max-w-7xl px-10`;
      default:
        return baseClasses;
    }
  };

  const getTypographyClasses = () => {
    if (platform.isMobile) {
      return 'text-sm md:text-base leading-relaxed';
    }
    if (platform.isTablet) {
      return 'text-base md:text-lg leading-relaxed';
    }
    return 'text-base lg:text-lg leading-relaxed';
  };

  const getButtonClasses = () => {
    const baseClasses = 'transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50';
    
    if (platform.hasTouch) {
      return `${baseClasses} min-h-[44px] min-w-[44px] active:scale-95`;
    }
    return `${baseClasses} hover:scale-105`;
  };

  return {
    platform,
    getOptimizedClasses,
    getContainerClasses,
    getTypographyClasses,
    getButtonClasses
  };
}