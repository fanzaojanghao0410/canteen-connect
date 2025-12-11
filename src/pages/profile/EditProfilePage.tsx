import React, { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function EditProfilePage() {
  const { user, setUser } = useApp();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    setUser(user ? { ...user, username, email } : null);
    toast.success('Profile updated');
  };

  return (
    <MobileLayout>
      <Header title="Edit Profile" showBack />
      <div className="px-4 pb-4 space-y-4">
        <div>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button onClick={handleSave} className="w-full" size="lg">Save</Button>
      </div>
    </MobileLayout>
  );
}