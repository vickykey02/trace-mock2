//inhaltlich überarbeiten
//einbauen dass Verlinkung zu Aktionen möglich 

import { createContext, useContext } from 'react';

const KnowledgeContext = createContext();

export const useKnowledge = () => {
  const context = useContext(KnowledgeContext);
  if (!context) {
	throw new Error('useKnowledge must be used within KnowledgeProvider');
  }
  return context;
};

// Alle Wissenseinheiten zentral definiert
export const ALL_KNOWLEDGE = [
  {
	id: 1,
	title: 'Säulen der Nachhaltigkeit',
	description: 'Nachhaltigkeit basiert auf drei Säulen: Umwelt, Soziales und Wirtschaft. Alle drei müssen im Gleichgewicht sein, um eine nachhaltige Zukunft zu gewährleisten.',
	relatedAction: 'Bäume pflanzen'
  },
  {
	id: 2,
	title: 'Bäume pflanzen',
	description: 'Pflanzen Sie einen Baum in Ihrer Gemeinde und kümmern Sie sich um ihn',
	category: 'Natur',
	keywords: ['baum', 'natur', 'grün', 'umwelt', 'pflanzen'],
	information: 'Bäume sind essentiell für unser Ökosystem. Sie produzieren Sauerstoff, speichern Kohlenstoff und bieten Lebensraum für Tiere. Das Pflanzen von Bäumen ist eine wirkungsvolle Maßnahme gegen den Klimawandel.',
	impact: 'Ein Baum bindet etwa 1 Tonne CO2 in seinem Leben',
	difficulty: 'Mittel',
	points: '25 Punkte pro Baum',
	tips: ['Wähle den richtigen Baum für deine Region', 'Pflanze im Herbst oder Frühjahr', 'Kümmere dich regelmäßig um den Baum'],
	showMap: false,
	short: 'Pflanze Bäume und schütze die Umwelt'
  },
  {
	id: 3,
	title: 'Wasser sparen',
	description: 'Dusch dich kürzer und repariere tropfende Wasserhähne',
	category: 'Energie',
	keywords: ['wasser', 'energie', 'sparen', 'haushalt'],
	information: 'Wasser ist eine kostbare Ressource. Durch bewusstes Sparen im Haushalt kannst du nicht nur die Umwelt schützen, sondern auch deine Wasserrechnung senken.',
	impact: 'Spart bis zu 18 Kubikmeter Wasser pro Jahr',
	difficulty: 'Leicht',
	points: '5 Punkte pro Tag',
	tips: ['Duschen statt Baden', 'Wasserhahn beim Zähneputzen ausmachen', 'Regelmäßig auf Lecks prüfen'],
	showMap: false,
	short: 'Spare Wasser im Alltag und schütze Ressourcen'
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
	showMap: false,
	short: 'Trenne Müll und fördere Recycling'
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
	showMap: false,
	short: 'Kaufe nachhaltige Mode und schone die Umwelt'
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
	showMap: false,
	short: 'Fahre Fahrrad und reduziere CO2-Emissionen'
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
	showMap: false,
	short: 'Wechsle zu LED-Lampen und spare Energie'
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
	showMap: false,
	short: 'Kaufe lokal und unterstütze die Region'
  }
];

export const KnowledgeProvider = ({ children }) => {
  return (
	<KnowledgeContext.Provider value={{ knowledge: ALL_KNOWLEDGE }}>
	  {children}
	</KnowledgeContext.Provider>
  );
};

export default KnowledgeContext;
