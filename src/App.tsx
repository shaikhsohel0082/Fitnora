import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Bill from "./pages/Bill";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("bill_auth") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
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

          {/* BILL PAGE (protected) */}
          <Route
            path="/bill"
            element={
              <PrivateRoute>
                <Bill />
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
