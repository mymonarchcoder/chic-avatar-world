import { createContext, useContext, useState, ReactNode } from "react";

interface FavoriteItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface FavoriteBrand {
  id: number;
  name: string;
  category: string;
  logo: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  favoriteBrands: FavoriteBrand[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (itemId: number) => void;
  addFavoriteBrand: (brand: FavoriteBrand) => void;
  removeFavoriteBrand: (brandId: number) => void;
  toggleFavoriteBrand: (brand: FavoriteBrand) => void;
  favoriteCount: number;
  isBrandFavorited: (brandId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Sample favorite items from Lioness brand
const initialFavorites: FavoriteItem[] = [
  { id: 1, name: "Classic White Tee", brand: "Frame", price: 49, image: "/src/assets/white-tee.png" },
  { id: 2, name: "Satin Slip Dress", brand: "Frame", price: 179, image: "/src/assets/satin-slip-dress.png" },
  { id: 3, name: "High Waist Jeans", brand: "Frame", price: 129, image: "/src/assets/high-waist-jeans.png" },
  { id: 4, name: "Cropped Blazer", brand: "Frame", price: 199, image: "/src/assets/cropped-blazer.png" },
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

  const addFavoriteBrand = (brand: FavoriteBrand) => {
    setFavoriteBrands(prev => [...prev, brand]);
  };

  const removeFavoriteBrand = (brandId: number) => {
    setFavoriteBrands(prev => prev.filter(brand => brand.id !== brandId));
  };

  const toggleFavoriteBrand = (brand: FavoriteBrand) => {
    setFavoriteBrands(prev => {
      const exists = prev.find(b => b.id === brand.id);
      if (exists) {
        return prev.filter(b => b.id !== brand.id);
      } else {
        return [...prev, brand];
      }
    });
  };

  const isBrandFavorited = (brandId: number) => {
    return favoriteBrands.some(brand => brand.id === brandId);
  };

  const favoriteCount = favorites.length + favoriteBrands.length;

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      favoriteBrands,
      addFavorite, 
      removeFavorite, 
      addFavoriteBrand,
      removeFavoriteBrand,
      toggleFavoriteBrand,
      isBrandFavorited,
      favoriteCount 
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
