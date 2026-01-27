import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Lade Favoriten aus LocalStorage beim Mounten
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        console.error('Fehler beim Laden der Favoriten:', err);
      }
    }
  }, []);

  // Speichere Favoriten in LocalStorage wenn sie sich ändern
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (actionId) => {
    setFavorites(prev => {
      if (!prev.includes(actionId)) {
        return [...prev, actionId];
      }
      return prev;
    });
  };

  const removeFavorite = (actionId) => {
    setFavorites(prev => prev.filter(id => id !== actionId));
  };

  const toggleFavorite = (actionId) => {
    if (favorites.includes(actionId)) {
      removeFavorite(actionId);
    } else {
      addFavorite(actionId);
    }
  };

  const isFavorite = (actionId) => {
    return favorites.includes(actionId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
