import { createContext, useContext, useState, ReactNode } from 'react';

interface AvatarModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
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

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <AvatarModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </AvatarModalContext.Provider>
  );
};
