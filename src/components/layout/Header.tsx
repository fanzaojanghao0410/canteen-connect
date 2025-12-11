import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  showNotification?: boolean;
  rightElement?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

export function Header({
  title,
  showBack,
  showCart,
  showNotification,
  rightElement,
  transparent,
  className,
}: HeaderProps) {
  const navigate = useNavigate();
  const { cartItemCount, user } = useApp();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between h-14 px-4 safe-top",
        transparent ? "bg-transparent" : "bg-background/80 backdrop-blur-lg border-b border-border/50",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-card shadow-sm hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
        )}
        {title && (
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {showNotification && (
          <button
            onClick={() => navigate('/notifications')}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-card shadow-sm hover:bg-secondary transition-colors"
          >
            <Bell className="w-5 h-5 text-foreground" />
          </button>
        )}
        
        {showCart && user?.role === 'student' && (
          <button
            onClick={() => navigate('/cart')}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-card shadow-sm hover:bg-secondary transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        )}
        
        {rightElement}
      </div>
    </header>
  );
}
