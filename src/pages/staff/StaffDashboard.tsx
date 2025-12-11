import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { useApp } from '@/contexts/AppContext';
import { Package, ShoppingBag, Clock, CheckCircle2, Plus, Edit, BarChart3, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StaffDashboard() {
  const navigate = useNavigate();
  const { orders, menuItems, user } = useApp();

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const processingOrders = orders.filter((o) => o.status === 'processing').length;
  const readyOrders = orders.filter((o) => o.status === 'ready').length;
  const completedOrders = orders.filter((o) => o.status === 'completed').length;

  const quickActions = [
    { icon: ShoppingBag, label: 'Produk', path: '/staff/products', color: 'bg-primary' },
    { icon: Plus, label: 'Tambah Produk', path: '/staff/products/add', color: 'bg-success' },
    { icon: Package, label: 'Pesanan', path: '/staff/orders', color: 'bg-accent' },
    { icon: Clock, label: 'Riwayat Pesanan', path: '/staff/orders', color: 'bg-warning' },
    { icon: BarChart3, label: 'Laporan', path: '/staff/orders', color: 'bg-secondary' },
    { icon: Users, label: 'Pesan', path: '/staff/orders', color: 'bg-muted' },
  ];

  return (
    <MobileLayout>
      <Header showNotification />

      <div className="px-4 pb-4">
        {/* Welcome */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Selamat datang di</p>
            <h1 className="text-xl font-bold text-foreground">Bu Ella Kantin</h1>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=ella'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {quickActions.map((action) => (
            <button
              key={action.path + action.label}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl card-shadow hover:card-shadow-lg transition-all"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", action.color)}>
                <action.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Order Stats */}
        <h2 className="font-semibold text-foreground mb-3">Order Status</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-warning/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-warning" />
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <p className="text-3xl font-bold text-warning">{pendingOrders}</p>
          </div>
          <div className="bg-primary/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Processing</span>
            </div>
            <p className="text-3xl font-bold text-primary">{processingOrders}</p>
          </div>
          <div className="bg-success/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Ready</span>
            </div>
            <p className="text-3xl font-bold text-success">{readyOrders}</p>
          </div>
          <div className="bg-muted rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <p className="text-3xl font-bold text-muted-foreground">{completedOrders}</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
          <button
            onClick={() => navigate('/staff/orders')}
            className="text-sm text-primary font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {orders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/staff/orders/${order.id}`)}
              className="bg-card rounded-2xl p-4 card-shadow cursor-pointer hover:card-shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    #{order.queueNumber}
                  </span>
                  <span className="text-sm text-muted-foreground">{order.userName}</span>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    order.status === 'pending' && "bg-warning/10 text-warning",
                    order.status === 'processing' && "bg-primary/10 text-primary",
                    order.status === 'ready' && "bg-success/10 text-success",
                    order.status === 'completed' && "bg-muted text-muted-foreground"
                  )}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-foreground line-clamp-1">
                {order.items.map((i) => `${i.menuItemName} x${i.quantity}`).join(', ')}
              </p>
              <p className="text-sm font-bold text-accent mt-1">
                Rp{new Intl.NumberFormat('id-ID').format(order.total)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
