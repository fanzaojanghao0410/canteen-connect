import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { useApp } from '@/contexts/AppContext';
import { Clock, CheckCircle2, Package, Truck, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'text-warning', icon: Clock },
  processing: { label: 'Processing', color: 'text-primary', icon: Package },
  ready: { label: 'Ready to Pickup', color: 'text-success', icon: Truck },
  completed: { label: 'Completed', color: 'text-muted-foreground', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'text-destructive', icon: Clock },
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const { orders, user } = useApp();

  const userOrders = user ? orders.filter((order) => order.userId === user.id) : [];

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

  return (
    <MobileLayout>
      <Header title="Riwayat Pesanan" showBack />

      <div className="px-4 pb-4">
        {userOrders.length > 0 ? (
          <div className="space-y-4">
            {userOrders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;

              return (
                <div
                  key={order.id}
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="bg-card rounded-2xl p-4 card-shadow cursor-pointer hover:card-shadow-lg transition-all"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <div className={cn("flex items-center gap-1 text-sm font-medium", status.color)}>
                      <StatusIcon className="w-4 h-4" />
                      {status.label}
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="w-12 h-12 rounded-xl overflow-hidden border-2 border-card"
                        >
                          <img
                            src={item.menuItemImage}
                            alt={item.menuItemName}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border-2 border-card">
                          <span className="text-xs font-medium">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground line-clamp-1">
                        {order.items.map((i) => i.menuItemName).join(', ')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground">Total: </span>
                      <span className="font-bold text-accent">Rp{formatPrice(order.total)}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <span className="text-6xl mb-4">📋</span>
            <h2 className="text-xl font-semibold text-foreground mb-2">No orders yet</h2>
            <p className="text-muted-foreground text-center">
              Start ordering delicious food!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
