import { createContext, useContext, useState, ReactNode } from 'react';

interface AvatarItem {
  name: string;
  category: string;
  price: number;
  brand: string;
  image: string;
}

interface AvatarItemsContextType {
  selectedItems: {[key: string]: AvatarItem};
  addItem: (item: AvatarItem) => void;
  removeItem: (category: string) => void;
  clearItems: () => void;
}

const AvatarItemsContext = createContext<AvatarItemsContextType | undefined>(undefined);

export const AvatarItemsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<{[key: string]: AvatarItem}>({});

  const addItem = (item: AvatarItem) => {
    setSelectedItems(prev => ({
      ...prev,
      [item.category]: item
    }));
  };

  const removeItem = (category: string) => {
    setSelectedItems(prev => {
      const newItems = { ...prev };
      delete newItems[category];
      return newItems;
    });
  };

  const clearItems = () => {
    setSelectedItems({});
  };

  return (
    <AvatarItemsContext.Provider value={{ selectedItems, addItem, removeItem, clearItems }}>
      {children}
    </AvatarItemsContext.Provider>
  );
};

export const useAvatarItems = () => {
  const context = useContext(AvatarItemsContext);
  if (context === undefined) {
    throw new Error('useAvatarItems must be used within an AvatarItemsProvider');
  }
  return context;
};
