import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  hideNav?: boolean;
  fullWidth?: boolean;
}

export function MobileLayout({ children, className, hideNav, fullWidth }: MobileLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen bg-background flex flex-col relative",
      // when not fullWidth, constrain to mobile preview widths and center on all screen sizes
      !fullWidth && "max-w-[430px] md:max-w-[600px] lg:max-w-[720px] mx-auto",
      className
    )}>
      <main className={cn(
        "flex-1 overflow-y-auto",
        !hideNav && "pb-20"
      )}>
        {children}
      </main>
    </div>
  );
}
