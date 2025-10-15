import { createContext, useContext, useState, ReactNode } from "react";

interface FavoriteItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (itemId: number) => void;
  favoriteCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Sample favorite items from Lioness brand
const initialFavorites: FavoriteItem[] = [
  { id: 1, name: "Classic White Tee", brand: "Lioness", price: 49, image: "" },
  { id: 2, name: "Satin Slip Dress", brand: "Lioness", price: 179, image: "" },
  { id: 3, name: "High Waist Jeans", brand: "Lioness", price: 129, image: "" },
  { id: 4, name: "Cropped Blazer", brand: "Lioness", price: 199, image: "" },
];

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites(prev => [...prev, item]);
  };

  const removeFavorite = (itemId: number) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId));
  };

  const favoriteCount = favorites.length;

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, favoriteCount }}>
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
