import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";

// Pages
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuPage from "./pages/student/MenuPage";
import CartPage from "./pages/student/CartPage";
import CheckoutPage from "./pages/student/CheckoutPage";
import OrdersPage from "./pages/student/OrdersPage";
import OrderDetailPage from "./pages/student/OrderDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffOrdersPage from "./pages/staff/StaffOrdersPage";
import StaffProductsPage from "./pages/staff/StaffProductsPage";
import AddEditProductPage from "./pages/staff/AddEditProductPage";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import ReportsPage from "./pages/staff/ReportsPage";
import MessagesPage from "./pages/staff/MessagesPage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import ReviewsPage from "./pages/profile/ReviewsPage";
import SettingsPage from "./pages/profile/SettingsPage";
import HelpPage from "./pages/profile/HelpPage";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

      {/* Student Routes */}
      <Route path="/menu" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
      <Route path="/menu/:itemId" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
      <Route path="/profile/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} />
      <Route path="/profile/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/profile/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />

      {/* Staff Routes */}
      <Route path="/staff/dashboard" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} />
      <Route path="/staff/orders" element={<ProtectedRoute><StaffOrdersPage /></ProtectedRoute>} />
      <Route path="/staff/orders/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
      <Route path="/staff/products" element={<ProtectedRoute><StaffProductsPage /></ProtectedRoute>} />
      <Route path="/staff/products/add" element={<ProtectedRoute><AddEditProductPage /></ProtectedRoute>} />
      <Route path="/staff/products/edit/:productId" element={<ProtectedRoute><AddEditProductPage /></ProtectedRoute>} />
      <Route path="/staff/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
      <Route path="/staff/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
