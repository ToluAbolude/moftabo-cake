import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CakeCatalog from "./pages/CakeCatalog";
import CakeDetail from "./pages/CakeDetail";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Gallery from "./pages/Gallery";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/AdminDashboard";
import AppLayout from "@/components/layout/AppLayout";
import CustomOrder from "./pages/CustomOrder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pages WITHOUT navbar */}
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Pages WITH navbar */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<CakeCatalog />} />
            <Route path="/cake/:id" element={<CakeDetail />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/custom" element={<CustomOrder />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
