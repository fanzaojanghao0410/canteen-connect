import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';

export default function ReviewsPage() {
  const reviews = [
    { id: 'r1', item: 'Seblak Bandung', rating: 5, text: 'Pedasnya pas dan enak!' },
    { id: 'r2', item: 'Risol Mayo', rating: 4, text: 'Garing dan creamy.' },
  ];

  return (
    <MobileLayout>
      <Header title="My Reviews" showBack />
      <div className="px-4 pb-4 space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-card rounded-2xl p-4 card-shadow">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">{r.item}</span>
              <span className="text-sm">⭐ {r.rating}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{r.text}</p>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
}