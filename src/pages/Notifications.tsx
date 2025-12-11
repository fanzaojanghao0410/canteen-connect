import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { Bell } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    { id: 'n1', title: 'Order Update', message: 'Your order #1 is being prepared', time: '10:15' },
    { id: 'n2', title: 'Promo', message: '10% off for orders above Rp30.000 today!', time: '09:00' },
    { id: 'n3', title: 'Ready', message: 'Your order #1 is ready to pickup', time: '10:25' },
  ];

  return (
    <MobileLayout>
      <Header title="Notifications" showBack />
      <div className="px-4 pb-4">
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="bg-card rounded-2xl p-4 card-shadow flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{n.title}</h3>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}