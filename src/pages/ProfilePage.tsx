import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { LogOut, User, Mail, Star, ChevronRight, Settings, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const menuItems = [
    { icon: User, label: 'Edit Profile', path: '/profile/edit' },
    { icon: Star, label: 'My Reviews', path: '/profile/reviews' },
    { icon: Settings, label: 'Settings', path: '/profile/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/profile/help' },
  ];

  return (
    <MobileLayout>
      <div className="bg-gradient-primary rounded-b-[3rem] pt-12 pb-20 px-6">
        <Header transparent />
        
        {/* Profile Card */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-foreground/30 mb-4">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold text-primary-foreground">{user?.username || 'Guest'}</h1>
          <div className="flex items-center gap-1 mt-1">
            <Mail className="w-4 h-4 text-primary-foreground/70" />
            <span className="text-sm text-primary-foreground/70">{user?.email || 'guest@example.com'}</span>
          </div>
          <div className="mt-2 px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-medium uppercase">
            {user?.role || 'student'}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8 pb-4">
        {/* Profile Actions */}
        <div className="bg-card rounded-2xl card-shadow overflow-hidden">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-0"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full mt-6"
          size="lg"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
