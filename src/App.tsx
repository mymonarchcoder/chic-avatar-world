import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AvatarModalProvider } from "@/contexts/AvatarModalContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index";
import CreateAvatar from "./pages/CreateAvatar";
import Favorites from "./pages/Favorites";
import FavoriteBrands from "./pages/FavoriteBrands";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import Brands from "./pages/Brands";
import BrandCollection from "./pages/BrandCollection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FavoritesProvider>
        <AvatarModalProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create-avatar" element={<CreateAvatar />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/favorite-brands" element={<FavoriteBrands />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brand/:brandId" element={<BrandCollection />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AvatarModalProvider>
      </FavoritesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
