import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';

export default function HelpPage() {
  return (
    <MobileLayout>
      <Header title="Help & Support" showBack />
      <div className="px-4 pb-4 space-y-3">
        <div className="bg-card rounded-2xl p-4 card-shadow">
          <p className="font-semibold text-foreground">Frequently Asked Questions</p>
          <p className="text-sm text-muted-foreground mt-2">How to place an order?</p>
          <p className="text-sm">Browse menu, add to cart, and checkout.</p>
        </div>
        <div className="bg-card rounded-2xl p-4 card-shadow">
          <p className="font-semibold text-foreground">Contact</p>
          <p className="text-sm">Email: support@nomnom.app</p>
        </div>
      </div>
    </MobileLayout>
  );
}