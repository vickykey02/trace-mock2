import { createContext, useContext } from 'react';

const FriendsContext = createContext();

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) {
	throw new Error('useFriends must be used within FriendsProvider');
  }
  return context;
};

// Freunde Daten
export const ALL_FRIENDS = [
	{
	id: 1,
	title: 'Olivia Kempe',
	bio: 'Nutzt Planet-N - nachhaltig<keit> lernen!!!',
	followers: '230',
	follows: '340',
	points: '150',
	picture: '/Olivia.jpg',
	tips: ['Eigenes Balkonkraftwerk bauen', 'ressourcenschonend Waschen'], 
	goals: ['30 Tage kein Fast Fashion', 'Vegane Woche'],
	trophies: ['Umweltfreundliche Pendlerin', 'Wasserretterin'],
  },
  {
	id: 3,
	title: 'Aldo Leopold',
	bio: 'Ökologie ist die Wissenschaft der Beziehungen zwischen den Organismen und ihrer Umwelt.',
	followers: '230',
	follows: '340',
	points: '30',
	picture: '/Aldo.webp'
  },
  {
	id: 2,
	title: 'Jane Goodall',
	bio: 'There is no planet B. \nHelp us to protect the only one we have.',
	followers: '230',
	follows: '340',
	points: '5850',
	picture: '/Jane-Goodall.webp',
  },
  {
	id: 4,
	title: 'David Attenborough',
	bio: 'The natural world is the greatest source of excitement; the greatest source of visual beauty; the greatest source of intellectual interest. It is the greatest source of so much in life that makes life worth living.',
	followers: '230',
	follows: '340',
	points: '1850',
	picture: '/David.webp'
  },
  {
	id: 5,
	title: 'Julia Hill',
	bio: 'Wir brauchen diesen Planeten mehr als er uns braucht.',
	followers: '230',
	follows: '340',
	points: '3720',
	picture: '/Julia-Hill.webp'
  }
  
];

export const FriendsProvider = ({ children }) => {
  return (
	<FriendsContext.Provider value={{ friends: ALL_FRIENDS }}>
	  {children}
	</FriendsContext.Provider>
  );
};

export default FriendsContext;
