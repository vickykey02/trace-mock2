//ordentliche Tipps überlegen und Komponenten anpassen

import { createContext, useContext } from 'react';

const TippsContext = createContext();

export const useTipps = () => {
  const context = useContext(TippsContext);
  if (!context) {
	throw new Error('useTipps must be used within TippsProvider');
  }
  return context;
};

// Alle Tipps zentral definiert
export const ALL_TIPPS = [
  {
	id: 1,
	title: 'Plastik im Bad reduzieren',
	category: 'Allgemeine Nachhaltigkeit',
	shortDescription: 'Anleitung um möglichst viel Plastik im Badezimmer zu reduzieren und nachhaltige Alternativen zu nutzen.',
	keywords: ['plastik', 'einkaufen', 'umwelt', 'shopping'],
	description: 'Hier sind einige Schritte, die du befolgen kannst:\n\n - **Zahnbürste**: Wechsle zu einer Zahnbürste aus Bambus oder einem anderen nachhaltigen Material.\n - **Zahnpasta**: Verwende Zahnpasta in einer Glasverpackung oder probiere Zahnpasta-Tabletten aus.\n - **Shampoo und Conditioner**: Entscheide dich für feste Shampoo- und Conditioner-Bars ohne Plastikverpackung.\n - **Duschgel**: Nutze Duschgel in fester Form oder in einer Glasflasche.\n - **Rasierer**: Verwende einen Rasierer mit austauschbaren Klingen anstelle von Einwegrasierern.\n - **Deodorant**: Wechsle zu einem Deodorant in einer Glasverpackung oder einem festen Deodorant-Stick.\n - **Wattepads**: Ersetze Einweg-Wattepads durch wiederverwendbare Baumwollpads.\n - **Mülltrennung**: Achte darauf, dass du deinen Müll richtig trennst, damit recycelbare Materialien auch tatsächlich recycelt werden.\n Mit weniger Plastik im Bad tust du nicht nur der Umwelt etwas Gutes, sondern auch deiner Gesundheit.',
	images: '/tipp-1.jpg',
	author: 'Naturelover',
},
  {
	id: 2,
	title: 'Eigenes Balkonkraftwerk bauen',
	category: 'Energie',
	shortDescription: 'Installiere Solarpanels auf deinem Balkon, um deinen eigenen Strom zu erzeugen.',
	keywords: ['balkonkraftwerk', 'solar', 'energie', 'strom'],
	description: 'Hier sind die Schritte, um dein eigenes Balkonkraftwerk zu bauen:\n\n - **Informiere dich über die Technik**: Lerne die Grundlagen der Solartechnologie und wie Balkonkraftwerke funktionieren.\n - **Wähle die richtigen Panels**: Entscheide dich für Solarpanels, die für den Einsatz auf Balkonen geeignet sind und die richtige Leistung für deinen Bedarf bieten.\n - **Plane die Installation sorgfältig**: Überlege dir, wo du die Panels am besten platzieren kannst, um maximale Sonneneinstrahlung zu erhalten, und stelle sicher, dass sie sicher befestigt sind.\n - **Nutze den erzeugten Strom effizient**: Verbinde dein Balkonkraftwerk mit deinem Haushalt, um den erzeugten Strom zu nutzen und deine Stromrechnung zu senken.',
	images: '/tipp-2.webp',
	author: 'Olivia Kempe',
  },
  {
	id: 3,
	title: 'Recycling Einmaleins',
	category: 'Abfall',
	shortDescription: 'Tipps und Tricks, um richtig zu recyceln und Müll zu reduzieren.',
	keywords: ['recycling', 'müll', 'abfall', 'umwelt'],
	description: 'So wird Mülltrennung kinderleicht:\n\n - **Lerne die Recycling-Symbole**: Informiere dich über die verschiedenen Recycling-Symbole auf Verpackungen, um zu wissen, welche Materialien recycelbar sind.\n - **Trenne verschiedene Materialien**: Achte darauf, dass du Plastik, Papier, Glas und Metall richtig trennst, damit sie korrekt recycelt werden können.\n - **Informiere dich über lokale Regeln**: Erkundige dich über die Recycling-Regeln in deiner Gemeinde, da diese von Ort zu Ort unterschiedlich sein können.',
	images: '/tipp-3.webp',
	author: 'RecyclingQueen',
  },
  {
	id: 4,
	title: 'Recycling',
	description: 'Trenne deinen Müll korrekt und recycele wo möglich',
	category: 'Abfall',
	keywords: ['recycling', 'müll', 'abfall', 'umwelt'],
	information: 'Richtiges Recycling trägt maßgeblich zur Reduktion von Müll bei. Durch Trennung von Plastik, Papier und Glas kann Material wiederverwendet werden.',
	impact: 'Reduziert Deponieabfälle um bis zu 75%',
	difficulty: 'Leicht',
	points: '3 Punkte pro Recycling-Aktion',
	tips: ['Lerne die Recycling-Symbole', 'Trenne verschiedene Materialien', 'Informiere dich über lokale Regeln'],
	showMap: false
  },
  {
	id: 5,
	title: 'Nachhaltige Mode',
	description: 'Kaufe Second-Hand Kleidung oder nachhaltige Labels',
	category: 'Shopping',
	keywords: ['mode', 'kleidung', 'shopping', 'nachhaltig'],
	information: 'Die Modeindustrie ist einer der größten Umweltver unreiniger. Durch den Kauf von Second-Hand oder nachhaltigen Labels unterstützt du umweltfreundliche Praktiken.',
	impact: 'Spart Wasser und reduziert Chemikalien in der Produktion',
	difficulty: 'Leicht',
	points: '15 Punkte pro Kauf',
	tips: ['Besuche Second-Hand Läden', 'Recherchiere nachhaltige Marken', 'Tausche Kleidung mit Freunden'],
	showMap: false
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

// Tipps von Freunden (Mock-Daten)
export const FRIEND_TIPPS = [
  {
    id: 'friend-1',
    title: 'Eigenes Balkonkraftwerk bauen',
    description: 'Installiere Solarpanels auf deinem Balkon, um deinen eigenen Strom zu erzeugen',
    category: 'Energie',
    createdBy: 'Olivia Kempe',
    tips: [
      'Informiere dich über die Technik',
      'Wähle die richtigen Panels',
      'Plane die Installation sorgfältig',
	  'Nutze den erzeugten Strom effizient'
    ],
  },
  {
    id: 'friend-2',
    title: '30 Tage kein Fast Fashion',
    description: 'Kaufe einen Monat lang keine neue Kleidung von Fast-Fashion-Marken',
    category: 'Shopping',
    target: 30,
    unit: 'Tage',
    createdBy: 'Max K.',
    tips: [
      'Second-Hand-Läden entdecken',
      'Kleidertausch mit Freunden',
      'Repariere statt wegwerfen'
    ],
  },
  {
    id: 'friend-3',
    title: 'Vegane Woche',
    description: 'Ernähre dich eine Woche komplett vegan',
    category: 'Ernährung',
    target: 7,
    unit: 'Tage',
    createdBy: 'Lisa S.',
    tips: [
      'Plane Mahlzeiten im Voraus',
      'Entdecke neue Rezepte',
      'Achte auf ausreichend Protein'
    ],
  }
];

export const TippsProvider = ({ children }) => {
  // Finde Tipp anhand des Titels in FRIEND_TIPPS
  const getFriendTippByTitle = (title) => {
    return FRIEND_TIPPS.find(tipp => tipp.title === title);
  };

  return (
	<TippsContext.Provider value={{ 
	  tipps: ALL_TIPPS, 
	  friendTipps: FRIEND_TIPPS,
	  getFriendTippByTitle
	}}>
	  {children}
	</TippsContext.Provider>
  );
};

export default TippsContext;
