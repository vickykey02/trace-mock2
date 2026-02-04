import { createContext, useContext, useState, useEffect } from 'react';

const CommunityContext = createContext();

export const useCommunities = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunities must be used within CommunityProvider');
  }
  return context;
};

// Alle verfügbaren Communities
export const ALL_COMMUNITIES = [
  { id: 'c1', name: 'Zero Waste Chemnitz', members: 234, description: 'Gemeinsam für weniger Müll in Chemnitz', category: 'Regional', image: '🏘️' },
  { id: 'c2', name: 'Vegane Rezepte', members: 1205, description: 'Teile und entdecke pflanzliche Rezepte', category: 'Ernährung', image: '🥗' },
  { id: 'c3', name: 'Fahrrad-Pendler', members: 567, description: 'Für alle, die mit dem Rad zur Arbeit fahren', category: 'Mobilität', image: '🚴' },
  { id: 'c4', name: 'Secondhand & Tausch', members: 892, description: 'Kaufe gebraucht, tausche und teile', category: 'Konsum', image: '♻️' },
  { id: 'c5', name: 'Energiesparer', members: 345, description: 'Tipps und Tricks zum Energiesparen', category: 'Energie', image: '💡' },
  { id: 'c6', name: 'Nachhaltigkeit TUCgether', members: 178, description: 'Studierende für Nachhaltigkeit an der TUC', category: 'Regional', image: '🎓' },
];

export const CommunityProvider = ({ children }) => {
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  // Lade beigetretene Communities aus LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('joinedCommunities');
    if (saved) {
      try {
        setJoinedCommunities(JSON.parse(saved));
      } catch (err) {
        console.error('Fehler beim Laden der Communities:', err);
      }
    }
  }, []);

  // Speichere in LocalStorage wenn sich etwas ändert
  useEffect(() => {
    localStorage.setItem('joinedCommunities', JSON.stringify(joinedCommunities));
  }, [joinedCommunities]);

  const joinCommunity = (communityId) => {
    setJoinedCommunities(prev => {
      if (!prev.includes(communityId)) {
        return [...prev, communityId];
      }
      return prev;
    });
  };

  const leaveCommunity = (communityId) => {
    setJoinedCommunities(prev => prev.filter(id => id !== communityId));
  };

  const toggleJoinCommunity = (communityId) => {
    if (joinedCommunities.includes(communityId)) {
      leaveCommunity(communityId);
    } else {
      joinCommunity(communityId);
    }
  };

  const isJoined = (communityId) => {
    return joinedCommunities.includes(communityId);
  };

  // Hole die vollständigen Daten der beigetretenen Communities
  const getJoinedCommunities = () => {
    return ALL_COMMUNITIES.filter(c => joinedCommunities.includes(c.id));
  };

  // Hole eine Community nach ID
  const getCommunityById = (communityId) => {
    return ALL_COMMUNITIES.find(c => c.id === communityId);
  };

  return (
    <CommunityContext.Provider value={{
      communities: ALL_COMMUNITIES,
      joinedCommunities,
      joinCommunity,
      leaveCommunity,
      toggleJoinCommunity,
      isJoined,
      getJoinedCommunities,
      getCommunityById
    }}>
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityContext;
