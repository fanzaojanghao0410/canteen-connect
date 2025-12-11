import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { MenuCategory } from '@/types';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const categories: { id: MenuCategory; label: string }[] = [
  { id: 'heavy_food', label: 'Heavy Food' },
  { id: 'snack', label: 'Snack' },
  { id: 'noodles', label: 'Noodles' },
  { id: 'drink', label: 'Drink' },
];

export default function AddEditProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { menuItems, addMenuItem, updateMenuItem } = useApp();
  const isEdit = !!productId;

  const existingItem = isEdit ? menuItems.find((m) => m.id === productId) : null;

  const [name, setName] = useState(existingItem?.name || '');
  const [description, setDescription] = useState(existingItem?.description || '');
  const [price, setPrice] = useState(existingItem?.price?.toString() || '');
  const [stock, setStock] = useState(existingItem?.stock?.toString() || '50');
  const [category, setCategory] = useState<MenuCategory>(existingItem?.category || 'heavy_food');
  const [image, setImage] = useState(existingItem?.image || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !price) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsLoading(true);

    const productData = {
      id: isEdit ? productId : `product-${Date.now()}`,
      name,
      description,
      price: parseInt(price),
      stock: parseInt(stock),
      category,
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      isAvailable: parseInt(stock) > 0,
    };

    setTimeout(() => {
      if (isEdit) {
        updateMenuItem(productData);
        toast.success('Product updated successfully');
      } else {
        addMenuItem(productData);
        toast.success('Product added successfully');
      }
      setIsLoading(false);
      navigate('/staff/products');
    }, 500);
  };

  return (
    <MobileLayout hideNav>
      <Header title={isEdit ? 'Edit Produk' : 'Tambah Produk'} showBack />

      <div className="px-4 pb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-secondary border-2 border-dashed border-primary overflow-hidden flex items-center justify-center">
                {image ? (
                  <img src={image} alt="Product" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-primary mx-auto mb-1" />
                    <span className="text-xs text-muted-foreground">Add Photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Image URL</label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Name Product <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Enter the product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Product Description <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Enter a product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Product Price <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Stock</label>
            <Input
              type="number"
              placeholder="Enter stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    category === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Simpan'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              size="lg"
              onClick={() => navigate('/staff/products')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </MobileLayout>
  );
}
