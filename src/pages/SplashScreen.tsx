import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileLayout hideNav fullWidth className="bg-gradient-primary">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        {/* Logo */}
        <div className="animate-bounce-in">
          <div className="w-40 h-40 rounded-full bg-card/10 backdrop-blur-sm flex items-center justify-center border-4 border-primary-foreground/30">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-1 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-4xl">🍜</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-5xl font-extrabold text-primary-foreground tracking-tight">
            Nomnom
          </h1>
          <p className="mt-3 text-lg text-primary-foreground/80 font-medium">
            Enjoy Your Food
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-12 animate-pulse-soft">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
