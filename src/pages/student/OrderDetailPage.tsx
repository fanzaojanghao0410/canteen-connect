import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Clock, CheckCircle2, Package, Truck, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/types';

const statusSteps: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: 'pending', label: 'Order Placed', icon: Clock },
  { status: 'processing', label: 'Preparing', icon: Package },
  { status: 'ready', label: 'Ready to Pickup', icon: Truck },
  { status: 'completed', label: 'Completed', icon: CheckCircle2 },
];

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useApp();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <MobileLayout hideNav>
        <Header title="Order Details" showBack />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <span className="text-6xl mb-4">🔍</span>
          <h2 className="text-xl font-semibold text-foreground mb-2">Order not found</h2>
          <Button onClick={() => navigate('/orders')}>Back to Orders</Button>
        </div>
      </MobileLayout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const currentStepIndex = statusSteps.findIndex((s) => s.status === order.status);

  return (
    <MobileLayout hideNav>
      <Header title="Lihat pesanan" showBack />

      <div className="px-4 pb-32">
        {/* Order Info */}
        <div className="bg-card rounded-2xl p-4 card-shadow mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{formatDate(order.createdAt)}</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              Queue #{order.queueNumber}
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-card rounded-2xl p-4 card-shadow mb-4">
          <h3 className="font-semibold text-foreground mb-4">Order Status</h3>
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const isActive = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const StepIcon = step.icon;

              return (
                <div key={step.status} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      isActive ? "bg-primary" : "bg-secondary",
                      isCurrent && "ring-4 ring-primary/20"
                    )}
                  >
                    <StepIcon
                      className={cn(
                        "w-5 h-5",
                        isActive ? "text-primary-foreground" : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        "font-medium",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-primary animate-pulse">Current status</p>
                    )}
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-[1.15rem] mt-10 w-0.5 h-4",
                        isActive ? "bg-primary" : "bg-secondary"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-2xl p-4 card-shadow mb-4">
          <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <img
                    src={item.menuItemImage}
                    alt={item.menuItemName}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.menuItemName}</p>
                  {item.spicyLevel && (
                    <p className="text-xs text-muted-foreground">Spicy: {item.spicyLevel}</p>
                  )}
                  <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                </div>
                <span className="font-semibold">Rp{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>Rp{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-Rp{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-accent">Rp{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border p-4 safe-bottom">
        {order.status === 'ready' && (
          <Button className="w-full" size="lg">
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Canteen
          </Button>
        )}
        {order.status === 'completed' && (
          <Button onClick={() => navigate('/menu')} className="w-full" size="lg">
            Order Again
          </Button>
        )}
        {(order.status === 'pending' || order.status === 'processing') && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Please wait for your order to be ready
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
