import { createContext, useContext, useState, ReactNode } from "react";
import whiteTeeImg from "@/assets/white-tee.png";
import satinDressImg from "@/assets/satin-slip-dress.png";
import jeansImg from "@/assets/high-waist-jeans.png";
import blazerImg from "@/assets/cropped-blazer.png";

interface FavoriteItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string | any;
}

interface FavoriteBrand {
  id: number;
  name: string;
  category: string;
  logo: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (itemId: number) => void;
  favoriteCount: number;
  favoriteBrands: FavoriteBrand[];
  toggleFavoriteBrand: (brand: FavoriteBrand) => void;
  isBrandFavorited: (brandId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Sample favorite items from Lioness brand
const initialFavorites: FavoriteItem[] = [
  { id: 1, name: "Classic White Tee", brand: "Frame", price: 49, image: whiteTeeImg },
  { id: 2, name: "Satin Slip Dress", brand: "Frame", price: 179, image: satinDressImg },
  { id: 3, name: "High Waist Jeans", brand: "Frame", price: 129, image: jeansImg },
  { id: 4, name: "Cropped Blazer", brand: "Frame", price: 199, image: blazerImg },
];

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites);
  const [favoriteBrands, setFavoriteBrands] = useState<FavoriteBrand[]>([]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites(prev => [...prev, item]);
  };

  const removeFavorite = (itemId: number) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId));
  };

  const toggleFavoriteBrand = (brand: FavoriteBrand) => {
    setFavoriteBrands(prev => {
      const exists = prev.find(b => b.id === brand.id);
      if (exists) {
        return prev.filter(b => b.id !== brand.id);
      }
      return [...prev, brand];
    });
  };

  const isBrandFavorited = (brandId: number) => {
    return favoriteBrands.some(b => b.id === brandId);
  };

  const favoriteCount = favorites.length;

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addFavorite, 
      removeFavorite, 
      favoriteCount,
      favoriteBrands,
      toggleFavoriteBrand,
      isBrandFavorited
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
