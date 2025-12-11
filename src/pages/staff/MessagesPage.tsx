import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/input';

export default function MessagesPage() {
  const threads = [
    { id: 't1', user: 'John Doe', last: 'Thanks!', time: '10:32' },
    { id: 't2', user: 'Sarah', last: 'Is my order ready?', time: '10:28' },
    { id: 't3', user: 'Alex', last: 'Please add extra spicy', time: '09:55' },
  ];

  return (
    <MobileLayout>
      <Header title="Pesan" showBack />
      <div className="px-4 pb-4">
        <div className="mb-4">
          <Input placeholder="Cari percakapan..." />
        </div>
        <div className="space-y-2">
          {threads.map((t) => (
            <div key={t.id} className="bg-card rounded-2xl p-4 card-shadow">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{t.user}</span>
                <span className="text-xs text-muted-foreground">{t.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{t.last}</p>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}