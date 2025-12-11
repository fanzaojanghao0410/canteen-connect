import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - check for staff credentials
    setTimeout(() => {
      if (email.includes('staff') || email.includes('admin')) {
        setUser({
          id: 'staff-1',
          username: 'Bu Ella Kantin',
          email,
          role: 'staff',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ella',
        });
        toast.success('Welcome back, Staff!');
        navigate('/staff/dashboard');
      } else {
        setUser({
          id: 'student-1',
          username: 'Student',
          email,
          role: 'student',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
        });
        toast.success('Welcome back!');
        navigate('/menu');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <MobileLayout hideNav className="bg-background">
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="bg-gradient-primary rounded-b-[3rem] pt-16 pb-20 px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-foreground">Hello!</h1>
            <p className="text-primary-foreground/80 mt-1">Welcome To Nomnom</p>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 px-6 -mt-8">
          <div className="bg-card rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Login</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full h-12"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {/* Social login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                  <span className="text-xl">G</span>
                </button>
                <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                  <span className="text-xl">f</span>
                </button>
                <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                  <span className="text-xl">🍎</span>
                </button>
              </div>
            </div>

            {/* Register link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have Account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-primary font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* Demo hint */}
          <p className="text-center text-xs text-muted-foreground mt-4 px-4">
            💡 Tip: Use email with "staff" to login as staff, otherwise login as student
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
