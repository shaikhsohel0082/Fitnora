import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Bill from "./pages/Bill";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import Customers from "./pages/Customers";
import PercentageCalculator from "./pages/PercentageCalculator";
import Products from "./pages/Products";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
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
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
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

          <Route
            path="/superadmin/percentage-calculator"
            element={
              <PrivateRoute role="superadmin">
                <PercentageCalculator />
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
