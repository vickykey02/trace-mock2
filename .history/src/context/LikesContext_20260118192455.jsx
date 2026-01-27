import { createContext, useContext, useState, useEffect } from 'react';

const LikesContext = createContext();

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (!context) {
	throw new Error('useLikes must be used within LikesProvider');
  }
  return context;
};

export const LikesProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);

  // Lade Likes aus LocalStorage beim Mounten
  useEffect(() => {
	const savedLikes = localStorage.getItem('likes');
	if (savedLikes) {
	  try {
		setLikes(JSON.parse(savedLikes));
	  } catch (err) {
		console.error('Fehler beim Laden der Likes:', err);
	  }
	}
  }, []);

  // Speichere Likes in LocalStorage wenn sie sich ändern
  useEffect(() => {
	localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  const addLike = (knowledgeId) => {
	setLikes(prev => {
	  if (!prev.includes(knowledgeId)) {
		return [...prev, knowledgeId];
	  }
	  return prev;
	});
  };

  const removeLike = (knowledgeId) => {
	setLikes(prev => prev.filter(id => id !== knowledgeId));
  };

  const toggleLikes = (knowledgeId) => {
	if (likes.includes(knowledgeId)) {
	  removeLike(knowledgeId);
	} else {
	  addLike(knowledgeId);
	}
  };

  const isLiked = (knowledgeId) => {
	return likes.includes(knowledgeId);
  };

  return (
	<LikesContext.Provider value={{ likes, addLike, removeLike, toggleLikes, isLiked }}>
	  {children}
	</LikesContext.Provider>
  );
};
