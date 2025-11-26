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
import ProductDetailWithTryOn from "./pages/ProductDetailWithTryOn";
import MalbonCondorPant from "./pages/MalbonCondorPant";
import ShopWithTryOn from "./pages/ShopWithTryOn";
import WidgetEmbed from "./pages/WidgetEmbed";
import WidgetDemo from "./pages/WidgetDemo";
import AloDemo from "./pages/AloDemo";
import AloApp from "./pages/AloApp";
import AloProductDemo from "./pages/AloProductDemo";
import MalbonDemo from "./pages/MalbonDemo";
import AvatarGeneration from "./pages/AvatarGeneration";
import TryOnGeneration from "./pages/TryOnGeneration";
import VirtualFittingRoom from "./pages/VirtualFittingRoom";
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
              <Route path="/product-tryon/:productId" element={<ProductDetailWithTryOn />} />
              <Route path="/malbon-condor-pant" element={<MalbonCondorPant />} />
              <Route path="/shop-with-tryon" element={<ShopWithTryOn />} />
              <Route path="/widget-embed" element={<WidgetEmbed />} />
              <Route path="/widget-demo" element={<WidgetDemo />} />
              <Route path="/alo-demo" element={<AloDemo />} />
              <Route path="/alo-app" element={<AloApp />} />
              <Route path="/alo-product" element={<AloProductDemo />} />
              <Route path="/malbon-demo" element={<MalbonDemo />} />
              <Route path="/avatar-generation" element={<AvatarGeneration />} />
              <Route path="/tryon-generation" element={<TryOnGeneration />} />
              <Route path="/virtual-fitting-room" element={<VirtualFittingRoom />} />
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
