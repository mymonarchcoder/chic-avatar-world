import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AvatarModalProvider } from "@/contexts/AvatarModalContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import CreateAvatar from "./pages/CreateAvatar";
import BodyScan from "./pages/BodyScan";
import Favorites from "./pages/Favorites";
import FavoriteBrands from "./pages/FavoriteBrands";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import Brands from "./pages/Brands";
import BrandCollection from "./pages/BrandCollection";
import ProductDetail from "./pages/ProductDetail";
import AloDemo from "./pages/AloDemo";
import AloApp from "./pages/AloApp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FavoritesProvider>
        <AvatarModalProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/create-avatar" element={<CreateAvatar />} />
              <Route path="/body-scan" element={<BodyScan />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/favorite-brands" element={<FavoriteBrands />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/brand/:brandId" element={<BrandCollection />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/alo-demo" element={<AloDemo />} />
              <Route path="/alo-app" element={<AloApp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AvatarModalProvider>
      </FavoritesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
