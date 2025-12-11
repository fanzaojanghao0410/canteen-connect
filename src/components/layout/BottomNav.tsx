import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const studentNavItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/menu' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Clock, label: 'Orders', path: '/orders' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const staffNavItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/staff/dashboard' },
  { icon: Search, label: 'Search', path: '/staff/products' },
  { icon: Clock, label: 'Orders', path: '/staff/orders' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();
  
  const navItems = user?.role === 'staff' ? staffNavItems : studentNavItems;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] md:max-w-[600px] lg:max-w-[720px] xl:max-w-none bg-card border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/menu' && item.path !== '/staff/dashboard' && location.pathname.startsWith(item.path));
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[60px]",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
