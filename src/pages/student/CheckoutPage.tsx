import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Check, Clock, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, addOrder, getNextQueueNumber, user } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [queueNumber, setQueueNumber] = useState<number | null>(null);

  const discount = cartTotal > 30000 ? Math.round(cartTotal * 0.1) : 0;
  const finalTotal = cartTotal - discount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      const newQueueNumber = getNextQueueNumber();
      setQueueNumber(newQueueNumber);

      // Create order
      const order = {
        id: `order-${Date.now()}`,
        queueNumber: newQueueNumber,
        userId: user?.id || 'guest',
        userName: user?.username || 'Guest',
        items: cart.map((ci) => ({
          id: `item-${Date.now()}-${ci.menuItem.id}`,
          menuItemId: ci.menuItem.id,
          menuItemName: ci.menuItem.name,
          menuItemImage: ci.menuItem.image,
          quantity: ci.quantity,
          price: ci.menuItem.price,
          notes: ci.notes,
          spicyLevel: ci.spicyLevel,
        })),
        subtotal: cartTotal,
        discount,
        total: finalTotal,
        status: 'pending' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      addOrder(order);
      clearCart();
      setOrderComplete(true);
      setIsProcessing(false);
      toast.success('Order placed successfully!');
    }, 2000);
  };

  if (orderComplete && queueNumber) {
    return (
      <MobileLayout hideNav>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-success flex items-center justify-center mb-6 animate-bounce-in">
            <Check className="w-10 h-10 text-success-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Successful!</h1>
          <p className="text-muted-foreground mb-8">Your order has been placed</p>

          <div className="bg-card rounded-3xl p-8 card-shadow-lg w-full max-w-xs">
            <p className="text-sm text-muted-foreground mb-2">Your Queue Number</p>
            <p className="text-6xl font-extrabold text-primary mb-4">#{queueNumber}</p>
            <p className="text-sm text-muted-foreground">
              Please wait for your number to be called
            </p>
          </div>

          <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Estimated wait: 10-15 minutes</span>
          </div>

          <div className="w-full mt-8 space-y-3">
            <Button onClick={() => navigate('/orders')} className="w-full" size="lg">
              Track Order
            </Button>
            <Button onClick={() => navigate('/menu')} variant="outline" className="w-full" size="lg">
              Back to Menu
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <Header title="Checkout" showBack />

      <div className="px-4 pb-32">
        {/* Pickup Location */}
        <div className="bg-card rounded-2xl p-4 card-shadow mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Pickup Location</h3>
              <p className="text-sm text-muted-foreground">Bu Ella Kantin - Counter #1</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-2xl p-4 card-shadow mb-4">
          <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
          <div className="space-y-3">
            {cart.map((cartItem) => (
              <div key={cartItem.menuItem.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <img
                    src={cartItem.menuItem.image}
                    alt={cartItem.menuItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{cartItem.menuItem.name}</p>
                  <p className="text-xs text-muted-foreground">x{cartItem.quantity}</p>
                </div>
                <span className="font-semibold text-foreground">
                  Rp{formatPrice(cartItem.menuItem.price * cartItem.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-card rounded-2xl p-4 card-shadow">
          <h3 className="font-semibold text-foreground mb-4">Payment Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>Rp{formatPrice(cartTotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
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

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border p-4 safe-bottom">
        <Button
          onClick={handlePlaceOrder}
          className="w-full"
          size="lg"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Place Order - Rp${formatPrice(finalTotal)}`}
        </Button>
      </div>
    </MobileLayout>
  );
}
