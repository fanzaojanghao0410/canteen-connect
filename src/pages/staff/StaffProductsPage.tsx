import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function StaffProductsPage() {
  const navigate = useNavigate();
  const { menuItems, deleteMenuItem } = useApp();
  const [search, setSearch] = useState('');

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMenuItem(id);
      toast.success(`${name} deleted successfully`);
    }
  };

  return (
    <MobileLayout>
      <Header title="Produk" showBack />

      <div className="px-4 pb-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Add Button */}
        <Button
          onClick={() => navigate('/staff/products/add')}
          className="w-full mb-4"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Product
        </Button>

        {/* Products List */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl p-4 card-shadow flex gap-4"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-accent font-bold">Rp{formatPrice(item.price)}</span>
                  <span className="text-xs text-muted-foreground">• Stock: {item.stock}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => navigate(`/staff/products/edit/${item.id}`)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id, item.name)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">📦</p>
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
