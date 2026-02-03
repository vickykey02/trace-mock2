import { createContext, useContext } from 'react';

const RewardsContext = createContext();

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
	throw new Error('useRewards must be used within RewardsProvider');
  }
  return context;
};

// Alle Handlungen zentral definiert
export const ALL_REWARDS = [
  {
    id: 1,
    title: 'Vinted-Gutschein',
    description: '10€ Gutschein für nachhaltiges Second-Hand Shopping',
    pointsCost: 100,
  },
  {
    id: 2,
    title: 'Bio-Café Gutschein',
    description: 'Ein Heißgetränk deiner Wahl im lokalen Bio-Café',
    pointsCost: 50,
  },
  {
    id: 3,
    title: 'Unverpackt-Laden Rabatt',
    description: '15% Rabatt auf deinen nächsten Einkauf',
    pointsCost: 150,
  },
  {
    id: 4,
    title: 'Fahrrad-Check',
    description: 'Kostenloser Fahrrad-Sicherheitscheck beim lokalen Händler',
    pointsCost: 200,
  },
  {
    id: 5,
    title: 'Stadtbibliothek Monatskarte',
    description: 'Ein Monat gratis Ausleihen in der Stadtbibliothek',
    pointsCost: 80,
  },
  {
    id: 6,
    title: 'Baum pflanzen lassen',
    description: 'Ein Baum wird in deinem Namen in Chemnitz gepflanzt',
    pointsCost: 300,
  },
];

export const RewardsProvider = ({ children }) => {
  return (
	<RewardsContext.Provider value={{ rewards: ALL_REWARDS }}>
	  {children}
	</RewardsContext.Provider>
  );
};

export default RewardsContext;
