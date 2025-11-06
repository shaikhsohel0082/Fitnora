import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Bill from "./pages/Bill";

import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import TotalSale from "./pages/TotalSale";

const queryClient = new QueryClient();

// ✅ Role based private route
const PrivateRoute = ({ children, role }) => {
  const loggedRole = localStorage.getItem("bill_auth");

  if (!loggedRole) return <Navigate to="/login" />;
  if (role && loggedRole !== role) return <Navigate to="/login" />;

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* LOGIN PAGE */}
          <Route path="/login" element={<Login />} />

          {/* BILL PAGE - Only for ADMIN */}
          <Route
            path="/bill"
            element={
              <PrivateRoute role="admin">
                <Bill />
              </PrivateRoute>
            }
          />

          {/* SUPERADMIN PAGES */}
          <Route
            path="/superadmin"
            element={
              <PrivateRoute role="superadmin">
                <SuperAdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin/customers"
            element={
              <PrivateRoute role="superadmin">
                <Customers />
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin/products"
            element={
              <PrivateRoute role="superadmin">
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin/totalsale"
            element={
              <PrivateRoute role="superadmin">
                <TotalSale />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;