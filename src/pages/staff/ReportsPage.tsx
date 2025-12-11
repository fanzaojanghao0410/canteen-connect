import React, { useMemo } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { useApp } from '@/contexts/AppContext';
import { Clock, Package, CheckCircle2, Truck } from 'lucide-react';

export default function ReportsPage() {
  const { orders } = useApp();

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const avgOrder = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
    const byStatus = orders.reduce<Record<string, number>>((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {});
    return { totalRevenue, totalOrders, avgOrder, byStatus };
  }, [orders]);

  const formatPrice = (price: number) => new Intl.NumberFormat('id-ID').format(price);

  return (
    <MobileLayout>
      <Header title="Laporan" showBack />
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-2xl p-4 card-shadow">
            <p className="text-sm text-muted-foreground">Total Pendapatan</p>
            <p className="text-2xl font-bold text-accent">Rp{formatPrice(stats.totalRevenue)}</p>
          </div>
          <div className="bg-card rounded-2xl p-4 card-shadow">
            <p className="text-sm text-muted-foreground">Total Pesanan</p>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="bg-card rounded-2xl p-4 card-shadow">
            <p className="text-sm text-muted-foreground">Rata-rata Pesanan</p>
            <p className="text-2xl font-bold">Rp{formatPrice(stats.avgOrder)}</p>
          </div>
          <div className="bg-card rounded-2xl p-4 card-shadow">
            <p className="text-sm text-muted-foreground">Items Terjual</p>
            <p className="text-2xl font-bold">{orders.reduce((s,o)=>s+o.items.reduce((si,i)=>si+i.quantity,0),0)}</p>
          </div>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Status</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-warning/10 rounded-2xl p-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-warning" />
            <span>Pending: {stats.byStatus['pending'] || 0}</span>
          </div>
          <div className="bg-primary/10 rounded-2xl p-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <span>Processing: {stats.byStatus['processing'] || 0}</span>
          </div>
          <div className="bg-success/10 rounded-2xl p-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-success" />
            <span>Ready: {stats.byStatus['ready'] || 0}</span>
          </div>
          <div className="bg-muted rounded-2xl p-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
            <span>Completed: {stats.byStatus['completed'] || 0}</span>
          </div>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Pesanan Terbaru</h3>
        <div className="space-y-3">
          {orders.slice(0, 10).map((order) => (
            <div key={order.id} className="bg-card rounded-2xl p-4 card-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">#{order.queueNumber}</span>
                  <span className="text-sm text-muted-foreground">{order.userName}</span>
                </div>
                <span className="text-sm font-medium">Rp{formatPrice(order.total)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{order.items.map((i)=>`${i.menuItemName} x${i.quantity}`).join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}