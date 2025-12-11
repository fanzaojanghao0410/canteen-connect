export type UserRole = 'student' | 'staff';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type MenuCategory = 'heavy_food' | 'snack' | 'noodles' | 'drink';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  stock: number;
  isAvailable: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  spicyLevel?: 'mild' | 'medium' | 'spicy';
}

export type OrderStatus = 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  menuItemImage: string;
  quantity: number;
  price: number;
  notes?: string;
  spicyLevel?: string;
}

export interface Order {
  id: string;
  queueNumber: number;
  userId: string;
  userName: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
