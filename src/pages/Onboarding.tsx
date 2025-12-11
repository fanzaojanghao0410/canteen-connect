import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    emoji: '🛒',
    title: "What Do You Want to Eat Today?",
    subtitle: "Let's Create Your Order",
    description: "Find your favorite food by browsing the menu and add it to your cart.",
  },
  {
    emoji: '💰',
    title: "Selling in Our Cafeteria is Now Hassle-Free",
    subtitle: "Easy Management",
    description: "We made food ordering easier, faster, and more convenient for everyone.",
  },
  {
    emoji: '📱',
    title: "Come on, Create your canteen Account Now!",
    subtitle: "Get Started Today",
    description: "Sign up now and start enjoying delicious meals with just a few taps!",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  return (
    <MobileLayout hideNav className="bg-background">
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="bg-gradient-primary rounded-b-[3rem] pt-12 pb-16 px-6">
          <div className="text-center">
            <p className="text-primary-foreground/80 text-sm font-medium mb-1">Hello!</p>
            <h1 className="text-2xl font-bold text-primary-foreground">Welcome To NomNom</h1>
          </div>

          {/* Illustration */}
          <div className="mt-10 flex justify-center">
            <div className="w-48 h-48 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center animate-scale-in">
              <span className="text-8xl">{slides[currentSlide].emoji}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-6 pt-8">
          <div className="text-center animate-fade-in" key={currentSlide}>
            <h2 className="text-xl font-bold text-foreground mb-2">
              {slides[currentSlide].title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="mt-auto pb-8 space-y-3">
            {currentSlide < slides.length - 1 ? (
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                  Skip
                </Button>
                <Button onClick={handleNext} size="icon" className="rounded-full">
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            ) : (
              <>
                <Button onClick={() => navigate('/login')} className="w-full" size="lg">
                  Login
                </Button>
                <Button onClick={() => navigate('/register')} variant="outline" className="w-full" size="lg">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
