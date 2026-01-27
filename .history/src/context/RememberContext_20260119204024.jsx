import { createContext, useContext, useState, useEffect } from 'react';

const RememberContext = createContext();

export const useRemember = () => {
  const context = useContext(RememberContext);
  if (!context) {
	throw new Error('useRemember must be used within RememberProvider');
  }
  return context;
};

export const RememberProvider = ({ children }) => {
  const [remembered, setRemembered] = useState([]);

  // Lade Likes aus LocalStorage beim Mounten
  useEffect(() => {
	const savedRemembered = localStorage.getItem('remembered');
	if (savedRemembered) {
	  try {
		setRemembered(JSON.parse(savedRemembered));
	  } catch (err) {
		console.error('Fehler beim Laden der Remembered:', err);
	  }
	}
  }, []);

  // Speichere Likes in LocalStorage wenn sie sich ändern
  useEffect(() => {
	localStorage.setItem('remembered', JSON.stringify(remembered));
  }, [remembered]);

  const addRemember = (tippId) => {
	setRemembered(prev => {
	  if (!prev.includes(tippId)) {
		return [...prev, tippId];
	  }
	  return prev;
	});
  };

  const removeRemember = (tippId) => {
	setRemembered(prev => prev.filter(id => id !== tippId));
  };

  const toggleRemember = (tippId) => {
	if (remembered.includes(tippId)) {
	  removeRemember(tippId);
	} else {
	  addRemember(tippId);
	}
  };

  const isRemembered = (tippId) => {
	return remembered.includes(tippId);
  };

  return (
	<RememberContext.Provider value={{ remembered, addRemember, removeRemember, toggleRemember, isRemembered }}>
	  {children}
	</RememberContext.Provider>
  );
};
