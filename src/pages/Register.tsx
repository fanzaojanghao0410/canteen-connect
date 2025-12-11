import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      setUser({
        id: 'user-new',
        username,
        email,
        role: 'student',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      });
      toast.success('Account created successfully!');
      navigate('/menu');
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
            <h2 className="text-xl font-semibold text-foreground mb-6">Sign Up</h2>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>

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

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-full h-12"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              <button
                onClick={() => navigate('/login')}
                className="text-primary font-semibold hover:underline"
              >
                Back to login
              </button>
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
