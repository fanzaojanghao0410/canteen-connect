import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { MenuCard } from '@/components/menu/MenuCard';
import { useApp } from '@/contexts/AppContext';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const navigate = useNavigate();
  const { menuItems } = useApp();
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    if (!search.trim()) return [];
    return menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [menuItems, search]);

  return (
    <MobileLayout>
      <Header showCart />

      <div className="px-4 pb-4">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12"
            autoFocus
          />
        </div>

        {/* Results */}
        {search.trim() ? (
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
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-muted-foreground">No results for "{search}"</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-muted-foreground">Start typing to search menu</p>
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
