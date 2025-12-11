import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/types';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

interface MenuCardProps {
  item: MenuItem;
  variant?: 'horizontal' | 'vertical';
  onClick?: () => void;
}

export function MenuCard({ item, variant = 'horizontal', onClick }: MenuCardProps) {
  const { addToCart, user } = useApp();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.isAvailable) {
      toast.error('Item is not available');
      return;
    }
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  if (variant === 'vertical') {
    return (
      <div
        onClick={onClick}
        className="bg-card rounded-2xl p-4 card-shadow hover:card-shadow-lg transition-all duration-300 cursor-pointer group"
      >
        <div className="aspect-square rounded-xl overflow-hidden mb-3">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-accent font-bold text-sm">Rp{formatPrice(item.price)}</span>
          {user?.role === 'student' && (
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4 text-primary-foreground" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-2xl p-4 card-shadow hover:card-shadow-lg transition-all duration-300 cursor-pointer group flex gap-4"
    >
      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
          {item.category === 'heavy_food' && (
            <span className="text-xs text-accent">🌶️</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1 mb-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-accent font-bold">Rp{formatPrice(item.price)}</span>
          {user?.role === 'student' && (
            <button
              onClick={handleAddToCart}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                item.isAvailable
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-muted cursor-not-allowed"
              )}
              disabled={!item.isAvailable}
            >
              <Plus className="w-4 h-4 text-primary-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
