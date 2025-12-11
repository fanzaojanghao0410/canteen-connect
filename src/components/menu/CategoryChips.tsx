import React from 'react';
import { cn } from '@/lib/utils';
import { MenuCategory } from '@/types';
import { UtensilsCrossed, Cookie, Soup, Coffee } from 'lucide-react';

interface CategoryChipsProps {
  selected: MenuCategory | 'all';
  onSelect: (category: MenuCategory | 'all') => void;
}

const categories: { id: MenuCategory | 'all'; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All', icon: UtensilsCrossed },
  { id: 'heavy_food', label: 'Heavy Food', icon: UtensilsCrossed },
  { id: 'snack', label: 'Snack', icon: Cookie },
  { id: 'noodles', label: 'Noodles', icon: Soup },
  { id: 'drink', label: 'Drink', icon: Coffee },
];

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 text-sm font-medium",
            selected === cat.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          <cat.icon className="w-4 h-4" />
          {cat.label}
        </button>
      ))}
    </div>
  );
}
