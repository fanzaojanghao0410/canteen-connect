import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { User, CartItem, MenuItem, Order, OrderStatus, UserRole } from '@/types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, notes?: string, spicyLevel?: 'mild' | 'medium' | 'spicy') => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  currentQueueNumber: number;
  getNextQueueNumber: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample menu items
const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Seblak',
    description: 'Seblak pedas gurih dengan kerupuk kenyal dan topping melimpah. Bumbu nya mantap bangat, pedasnya nampol dan dimakan Huutt saat dipesan.',
    price: 15000,
    category: 'heavy_food',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
    stock: 50,
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Nasi Goreng',
    description: 'Nasi goreng spesial kami dimasak dengan bumbu pilihan yang kaya rasa, menghasilkan aroma menggiurkan selera sejak pertama disajikan.',
    price: 15000,
    category: 'heavy_food',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
    stock: 30,
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Seblak Bandung',
    description: 'Seblak khas Bandung dengan kuah kental dan bumbu rempah yang kaya. Pedes mantap!',
    price: 15000,
    category: 'noodles',
    image: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=400',
    stock: 25,
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Risol Mayo',
    description: 'Risol isi mayo dengan kulit renyah dan isian mayo yang creamy. Cocok untuk camilan.',
    price: 3000,
    category: 'snack',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    stock: 100,
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Fanta',
    description: 'Minuman segar dengan rasa jeruk es batu. Fanta sangat cocok menjadi pasangan menu makanan pedes maupun gurih.',
    price: 5000,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400',
    stock: 200,
    isAvailable: true,
  },
];

// Sample orders
const initialOrders: Order[] = [
  {
    id: 'order-1',
    queueNumber: 1,
    userId: 'user-1',
    userName: 'John Doe',
    items: [
      {
        id: 'item-1',
        menuItemId: '1',
        menuItemName: 'Seblak Bandung',
        menuItemImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
        quantity: 2,
        price: 15000,
        spicyLevel: 'spicy',
      },
      {
        id: 'item-2',
        menuItemId: '4',
        menuItemName: 'Risol Mayo',
        menuItemImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
        quantity: 4,
        price: 3000,
      },
    ],
    subtotal: 42000,
    discount: 7000,
    total: 35000,
    status: 'pending',
    createdAt: new Date('2025-11-23T10:00:00'),
    updatedAt: new Date('2025-11-23T10:00:00'),
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('orders') || '[]');
      return Array.isArray(stored) && stored.length > 0 ? stored : initialOrders;
    } catch {
      return initialOrders;
    }
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [currentQueueNumber, setCurrentQueueNumber] = useState(1);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = useCallback((
    item: MenuItem,
    quantity = 1,
    notes?: string,
    spicyLevel?: 'mild' | 'medium' | 'spicy'
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItem.id === item.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { menuItem: item, quantity, notes, spicyLevel }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
  }, []);

  const updateCartQuantity = useCallback((itemId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((ci) =>
        ci.menuItem.id === itemId ? { ...ci, quantity: Math.max(0, quantity) } : ci
      ).filter((ci) => ci.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, ci) => sum + ci.menuItem.price * ci.quantity, 0);
  const cartItemCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
      )
    );
  }, []);

  const addMenuItem = useCallback((item: MenuItem) => {
    setMenuItems((prev) => [...prev, item]);
  }, []);

  const updateMenuItem = useCallback((item: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((mi) => (mi.id === item.id ? item : mi))
    );
  }, []);

  const deleteMenuItem = useCallback((itemId: string) => {
    setMenuItems((prev) => prev.filter((mi) => mi.id !== itemId));
  }, []);

  const getNextQueueNumber = useCallback(() => {
    const next = currentQueueNumber;
    setCurrentQueueNumber((prev) => prev + 1);
    return next;
  }, [currentQueueNumber]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        orders,
        addOrder,
        updateOrderStatus,
        menuItems,
        setMenuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        currentQueueNumber,
        getNextQueueNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
