import { createContext, useContext, useState, ReactNode } from 'react';

interface AvatarModalContextType {
  isOpen: boolean;
  openModal: (item?: any) => void;
  closeModal: () => void;
  pendingItem: any | null;
}

const AvatarModalContext = createContext<AvatarModalContextType | undefined>(undefined);

export const useAvatarModal = () => {
  const context = useContext(AvatarModalContext);
  if (context === undefined) {
    throw new Error('useAvatarModal must be used within an AvatarModalProvider');
  }
  return context;
};

interface AvatarModalProviderProps {
  children: ReactNode;
}

export const AvatarModalProvider = ({ children }: AvatarModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<any | null>(null);

  const openModal = (item?: any) => {
    if (item) {
      setPendingItem(item);
    }
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setPendingItem(null);
  };

  return (
    <AvatarModalContext.Provider value={{ isOpen, openModal, closeModal, pendingItem }}>
      {children}
    </AvatarModalContext.Provider>
  );
};
