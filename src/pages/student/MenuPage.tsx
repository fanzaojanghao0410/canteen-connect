import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { MenuCard } from '@/components/menu/MenuCard';
import { CategoryChips } from '@/components/menu/CategoryChips';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { MenuCategory } from '@/types';
import { Search } from 'lucide-react';

export default function MenuPage() {
  const navigate = useNavigate();
  const { menuItems, user } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, search, selectedCategory]);

  return (
    <MobileLayout>
      <Header showCart showNotification />

      <div className="px-4 pb-4">
        {/* Welcome */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Selamat datang di</p>
            <h1 className="text-xl font-bold text-foreground">Bu Ella Kantin</h1>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 bg-card"
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Menu List */}
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onClick={() => navigate(`/menu/${item.id}`)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">🍽️</p>
              <p className="text-muted-foreground">No items found</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
