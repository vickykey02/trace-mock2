import { createContext, useContext } from 'react';

const FriendsContext = createContext();

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) {
	throw new Error('useFriends must be used within FriendsProvider');
  }
  return context;
};

// Alle Tipps zentral definiert
export const ALL_FRIENDS = [
  {
	id: 1,
	title: 'Jane Goodall',
	//description: 'Bring deine eigenen Gefäße und Beutel für den Kauf von Lebensmitteln mit in den Laden. Dort lässt du diese wiegen, füllst sie und bezahlst. Beim Bezahlen kannst du einen QR Code scannen, um die Handlung einzutragen.',
	//category: 'Shopping',
	//keywords: ['plastik', 'einkaufen', 'umwelt', 'shopping'],
	bio: 'There is no planet B. \nHelp us to protect the only one we have.',
	followers: '230',
	follows: '340',
	points: '1850',
	picture: 'Jane-Goodall.webp',
	//tips: ['Nimm Behälter mit', 'Spare Verpackungsmaterial', 'Unterstütze unverpackt Läden'],
	//showMap: true
  },
  {
	id: 2,
	title: 'David Attenborough',
	//description: 'Bring deine eigenen Gefäße und Beutel für den Kauf von Lebensmitteln mit in den Laden. Dort lässt du diese wiegen, füllst sie und bezahlst. Beim Bezahlen kannst du einen QR Code scannen, um die Handlung einzutragen.',
	//category: 'Shopping',
	//keywords: ['plastik', 'einkaufen', 'umwelt', 'shopping'],
	bio: 'The natural world is the greatest source of excitement; the greatest source of visual beauty; the greatest source of intellectual interest. It is the greatest source of so much in life that makes life worth living.',
	followers: '230',
	follows: '340',
	points: '1850',
	picture: 'David.webp'
  },
  {
	id: 3,
	title: 'Aldo Leopold',
	//description: 'Bring deine eigenen Gefäße und Beutel für den Kauf von Lebensmitteln mit in den Laden. Dort lässt du diese wiegen, füllst sie und bezahlst. Beim Bezahlen kannst du einen QR Code scannen, um die Handlung einzutragen.',
	//category: 'Shopping',
	//keywords: ['plastik', 'einkaufen', 'umwelt', 'shopping'],
	bio: 'Ökologie ist die Wissenschaft der Beziehungen zwischen den Organismen und ihrer Umwelt.',
	followers: '230',
	follows: '340',
	points: '1850',
	picture: 'Aldo.webp'
  },
  {
	id: 4,
	title: 'Julia Hill',
	//description: 'Bring deine eigenen Gefäße und Beutel für den Kauf von Lebensmitteln mit in den Laden. Dort lässt du diese wiegen, füllst sie und bezahlst. Beim Bezahlen kannst du einen QR Code scannen, um die Handlung einzutragen.',
	//category: 'Shopping',
	//keywords: ['plastik', 'einkaufen', 'umwelt', 'shopping'],
	bio: 'Wir brauchen diesen Planezten mehr als er uns braucht.',
	followers: '230',
	follows: '340',
	points: '1850',
	picture: 'Julia-Hill.webp'
  },
  {
	id: 5,
	title: 'Olivia Kempe',
	//description: 'Bring deine eigenen Gefäße und Beutel für den Kauf von Lebensmitteln mit in den Laden. Dort lässt du diese wiegen, füllst sie und bezahlst. Beim Bezahlen kannst du einen QR Code scannen, um die Handlung einzutragen.',
	//category: 'Shopping',
	//keywords: ['plastik', 'einkaufen', 'umwelt', 'shopping'],
	bio: 'Follow Planet-N - nachhaltig<keit> lernen',
	followers: '230',
	follows: '340',
	points: '1850',
	picture: 'Olivia.jpg'
  },
];

export const FriendsProvider = ({ children }) => {
  return (
	<FriendsContext.Provider value={{ friends: ALL_FRIENDS }}>
	  {children}
	</FriendsContext.Provider>
  );
};

export default FriendsContext;
