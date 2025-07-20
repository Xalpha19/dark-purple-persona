import { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ResponsiveWrapperProps {
  children: ReactNode;
}

export const ResponsiveWrapper = ({ children }: ResponsiveWrapperProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <div 
      className={`
        ${isMobile ? 'mobile-optimized' : ''}
        ${isTablet ? 'tablet-optimized' : ''}
        ${isDesktop ? 'desktop-optimized' : ''}
        min-h-screen w-full overflow-x-hidden
      `}
      style={{
        WebkitOverflowScrolling: 'touch',
        transform: 'translateZ(0)',
      }}
    >
      {children}
    </div>
  );
};