import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, cartTotal } = useApp();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const discount = cartTotal > 30000 ? Math.round(cartTotal * 0.1) : 0;
  const finalTotal = cartTotal - discount;

  if (cart.length === 0) {
    return (
      <MobileLayout hideNav>
        <Header title="Cart" showBack />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <span className="text-6xl mb-4">🛒</span>
          <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-6">
            Add some delicious items to your cart
          </p>
          <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <Header title="Cart" showBack />

      <div className="px-4 pb-32">
        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((cartItem) => (
            <div
              key={cartItem.menuItem.id}
              className="bg-card rounded-2xl p-4 card-shadow flex gap-4"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={cartItem.menuItem.image}
                  alt={cartItem.menuItem.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {cartItem.menuItem.name}
                  </h3>
                  <button
                    onClick={() => removeFromCart(cartItem.menuItem.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {cartItem.spicyLevel && (
                  <p className="text-xs text-muted-foreground">
                    Spicy: {cartItem.spicyLevel}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-accent font-bold">
                    Rp{formatPrice(cartItem.menuItem.price * cartItem.quantity)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(cartItem.menuItem.id, cartItem.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{cartItem.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(cartItem.menuItem.id, cartItem.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-6 bg-card rounded-2xl p-4 card-shadow">
          <h3 className="font-semibold text-foreground mb-4">Ringkasan Pesanan</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">Rp{formatPrice(cartTotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount (10%)</span>
                <span>-Rp{formatPrice(discount)}</span>
              </div>
            )}
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-accent">Rp{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border p-4 safe-bottom">
        <Button onClick={() => navigate('/checkout')} className="w-full" size="lg">
          Checkout - Rp{formatPrice(finalTotal)}
        </Button>
      </div>
    </MobileLayout>
  );
}
