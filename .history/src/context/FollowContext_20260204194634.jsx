import { createContext, useContext, useState, useEffect } from 'react';

const FollowContext = createContext();

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) {
	throw new Error('useFollow must be used within FollowProvider');
  }
  return context;
};

export const FollowProvider = ({ children }) => {
  const [followed, setFollowed] = useState([]);

  // Lade Followed aus LocalStorage beim Mounten
  useEffect(() => {
	const savedFollowed = localStorage.getItem('followed');
	if (savedFollowed) {
	  try {
		setFollowed(JSON.parse(savedFollowed));
	  } catch (err) {
		console.error('Fehler beim Laden der Followed:', err);
	  }
	}
  }, []);

  // Speichere Followed in LocalStorage wenn sie sich ändern
  useEffect(() => {
	localStorage.setItem('followed', JSON.stringify(followed));
  }, [followed]);

  const addFollow = (friendId) => {
	setFollowed(prev => {
	  if (!prev.includes(friendId)) {
		return [...prev, friendId];
	  }
	  return prev;
	});
  };

  const removeFollow = (friendId) => {
	setFollowed(prev => prev.filter(id => id !== friendId));
  };

  const toggleFollow = (friendId) => {
	if (followed.includes(friendId)) {
	  removeFollow(friendId);
	} else {
	  addFollow(friendId);
	}
  };

  const isFollowed = (friendId) => {
	return followed.includes(friendId);
  };

  return (
	<FollowContext.Provider value={{ followed, addFollow, removeFollow, toggleFollow, isFollowed }}>
	  {children}
	</FollowContext.Provider>
  );
};
