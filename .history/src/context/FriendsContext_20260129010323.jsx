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
	bio: 'There is no planet B.',
	followers: '230',
	follows: '340',
	points: '1850',
	picture: 'Jane-Goodall.jpg',
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
	picture: 'https://example.com/jane.jpg'
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
	picture: 'https://example.com/jane.jpg'
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
	picture: 'https://example.com/jane.jpg'
  },
  {
	id: 5,
	title: 'Olivia Kempe',
	//description: 'Bring deine eigenen Gefäße und Beutel für den Kauf von Lebensmitteln mit in den Laden. Dort lässt du diese wiegen, füllst sie und bezahlst. Beim Bezahlen kannst du einen QR Code scannen, um die Handlung einzutragen.',
	//category: 'Shopping',
	//keywords: ['plastik', 'einkaufen', 'umwelt', 'shopping'],
	bio: 'Follow planet-n.',
	followers: '230',
	follows: '340',
	points: '1850',
	picture: 'https://example.com/jane.jpg'
  },
  {
	id: 6,
	title: 'Fahrrad fahren',
	description: 'Nutze dein Fahrrad statt das Auto für kurze Strecken',
	category: 'Mobilität',
	keywords: ['fahrrad', 'mobilität', 'transport', 'co2'],
	information: 'Das Fahrrad ist eine umweltfreundliche Alternative zum Auto. Es spart nicht nur CO2-Emissionen, sondern ist auch gesund und kosteneffizient.',
	impact: 'Spart bis zu 1 Tonne CO2 pro Jahr',
	difficulty: 'Leicht',
	points: '10 Punkte pro Fahrt',
	tips: ['Plane deine Routen', 'Investiere in ein gutes Fahrrad', 'Nutze es für tägliche Besorgungen'],
	showMap: false
  },
  {
	id: 7,
	title: 'LED-Lampen',
	description: 'Wechsle zu LED-Lampen und spare bis zu 75% Energie',
	category: 'Energie',
	keywords: ['lampe', 'energie', 'strom', 'sparen'],
	information: 'LED-Lampen verbrauchen deutlich weniger Strom als Glühlampen und halten länger. Ein einfacher Wechsel mit großer Wirkung.',
	impact: 'Spart 75% Stromverbrauch und 15€ pro Lampe pro Jahr',
	difficulty: 'Sehr leicht',
	points: '8 Punkte pro Lampe',
	tips: ['Ersetze alte Glühlampen schrittweise', 'Wähle die richtige Farbtemperatur', 'Spare Geld durch Mengenrabatte'],
	showMap: false
  },
  {
	id: 8,
	title: 'Lokale Produkte',
	description: 'Kaufe Produkte von lokalen Bauern und Herstellern',
	category: 'Ernährung',
	keywords: ['lokal', 'produkte', 'bauern', 'regional'],
	information: 'Lokale Produkte haben kürzere Transportwege und unterstützen die lokale Wirtschaft. Sie sind oft frischer und geschmackvoller.',
	impact: 'Reduziert Transportemissionen um bis zu 80%',
	difficulty: 'Leicht',
	points: '12 Punkte pro Einkauf',
	tips: ['Besuche Bauernmärkte', 'Unterstütze lokale Läden', 'Bekenne dich zur Saisonalität'],
	showMap: false
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
