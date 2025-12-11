import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Clock, Package, CheckCircle2, Truck, Eye, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/types';
import { toast } from 'sonner';

const statusTabs: { status: OrderStatus | 'all'; label: string }[] = [
  { status: 'all', label: 'All' },
  { status: 'pending', label: 'Pending' },
  { status: 'processing', label: 'Processing' },
  { status: 'ready', label: 'Ready' },
  { status: 'completed', label: 'Done' },
];

export default function StaffOrdersPage() {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter((o) => o.status === selectedStatus);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'processing');
    toast.success('Order accepted! Start preparing.');
  };

  const handleReadyOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'ready');
    toast.success('Order is ready for pickup!');
  };

  const handleCompleteOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'completed');
    toast.success('Order completed!');
  };

  return (
    <MobileLayout>
      <Header title="Pesanan" showBack />

      <div className="px-4 pb-4">
        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {statusTabs.map((tab) => (
            <button
              key={tab.status}
              onClick={() => setSelectedStatus(tab.status)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                selectedStatus === tab.status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-card rounded-2xl p-4 card-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {new Intl.DateTimeFormat('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }).format(new Date(order.createdAt))}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{formatTime(order.createdAt)}</span>
              </div>

              {/* Queue Number & Status */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  Queue #{order.queueNumber}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    order.status === 'pending' && "bg-warning/10 text-warning",
                    order.status === 'processing' && "bg-primary/10 text-primary",
                    order.status === 'ready' && "bg-success/10 text-success",
                    order.status === 'completed' && "bg-muted text-muted-foreground"
                  )}
                >
                  {order.status === 'pending' && 'Pesanan Masuk'}
                  {order.status === 'processing' && 'Diproses'}
                  {order.status === 'ready' && 'Siap Diambil'}
                  {order.status === 'completed' && 'Selesai'}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-2 mb-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                      <img
                        src={item.menuItemImage}
                        alt={item.menuItemName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{item.menuItemName}</p>
                      {item.spicyLevel && (
                        <p className="text-xs text-muted-foreground">🌶️ {item.spicyLevel}</p>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t border-border mb-3">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="font-bold text-accent">Rp{formatPrice(order.total)}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <>
                    <Button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="flex-1"
                      size="sm"
                    >
                      Terima Pesanan
                    </Button>
                    <Button
                      onClick={() => navigate(`/staff/orders/${order.id}`)}
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </>
                )}
                {order.status === 'processing' && (
                  <>
                    <Button
                      onClick={() => handleReadyOrder(order.id)}
                      className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                      size="sm"
                    >
                      Pesanan Siap
                    </Button>
                    <Button
                      onClick={() => navigate(`/staff/orders/${order.id}`)}
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </>
                )}
                {order.status === 'ready' && (
                  <>
                    <Button
                      onClick={() => handleCompleteOrder(order.id)}
                      className="flex-1"
                      size="sm"
                    >
                      Selesai
                    </Button>
                    <Button
                      onClick={() => navigate(`/staff/orders/${order.id}`)}
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </>
                )}
                {order.status === 'completed' && (
                  <Button
                    onClick={() => navigate(`/staff/orders/${order.id}`)}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    Lihat Detail
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">📋</p>
              <p className="text-muted-foreground">No orders found</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
