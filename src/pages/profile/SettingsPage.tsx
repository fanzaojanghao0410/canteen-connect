import React, { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <MobileLayout>
      <Header title="Settings" showBack />
      <div className="px-4 pb-4 space-y-4">
        <div className="bg-card rounded-2xl p-4 card-shadow flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Enable Notifications</p>
            <p className="text-sm text-muted-foreground">Receive order updates and promos</p>
          </div>
          <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
        </div>
        <div className="bg-card rounded-2xl p-4 card-shadow flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Dark Mode</p>
            <p className="text-sm text-muted-foreground">Reduce eye strain</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>
    </MobileLayout>
  );
}