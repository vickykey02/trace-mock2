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
	short: 'Nachhaltigkeit basiert auf drei Säulen: Umwelt, Soziales und Wirtschaft.',
	description: 'Nachhaltigkeit basiert auf drei Säulen: Umwelt, Soziales und Wirtschaft. Alle drei müssen im Gleichgewicht sein, um eine nachhaltige Zukunft zu gewährleisten.',
	relatedAction: 'Bäume pflanzen'
  },
  {
	id: 2,
	title: 'Das neue Superfood: Algen',
	short: 'Algen sind eine nachhaltige Nahrungsquelle mit vielen Vorteilen.',
	description: 'Algen sind eine nachhaltige Nahrungsquelle mit vielen Vorteilen. Sie benötigen wenig Ressourcen, wachsen schnell und sind reich an Nährstoffen. Algen können helfen, den Hunger zu bekämpfen und die Umwelt zu schützen.',
	relatedAction: 'Lokale Produkte'
  },
  {
	id: 3,
	title: 'Die Macht der Konsumenten',
	short: 'Konsumenten haben die Macht, durch ihre Kaufentscheidungen Veränderungen zu bewirken.',
	description: 'Konsumenten haben die Macht, durch ihre Kaufentscheidungen Veränderungen zu bewirken. Indem sie nachhaltige Produkte wählen und Unternehmen unterstützen, die umweltfreundliche Praktiken fördern, können Konsumenten einen positiven Einfluss auf die Umwelt und die Gesellschaft ausüben.',
	relatedAction: 'Nachhaltige Mode'
  },
  {
	id: 4,
	title: 'Energie sparen im Haushalt',
	short: 'Einfache Maßnahmen können den Energieverbrauch im Haushalt erheblich reduzieren.',
	description: 'Einfache Maßnahmen können den Energieverbrauch im Haushalt erheblich reduzieren. Dazu gehören das Ausschalten von Geräten im Standby-Modus, die Verwendung von LED-Lampen und die Optimierung der Heizung. Diese Maßnahmen tragen nicht nur zum Umweltschutz bei, sondern senken auch die Energiekosten.',
	relatedAction: 'LED-Lampen'
  },
  {
	id: 5,
	title: 'Nachhaltige Mobilität',
	short: 'Nachhaltige Mobilität umfasst umweltfreundliche Transportmittel und -praktiken.',
	description: 'Nachhaltige Mobilität umfasst umweltfreundliche Transportmittel und -praktiken. Dazu gehören das Fahrradfahren, die Nutzung öffentlicher Verkehrsmittel und das Carsharing. Diese Maßnahmen tragen zur Reduzierung von CO2-Emissionen und zur Verbesserung der Luftqualität bei.',
	relatedAction: ['Carsharing', 'Fahrrad fahren', 'Bus/Bahn fahren']
  },
  {
	id: 6,
	title: 'Die Plastikinsel im Pazifik',
	short: 'Die Plastikinsel im Pazifik ist ein riesiger Müllteppich aus Plastikmüll, der so groß wie Mitteleuropa ist.',
	description: 'Die Plastikinsel im Pazifik ist ein riesiger Müllteppich aus Plastikmüll, der so groß wie Mitteleuropa ist. Er besteht aus Millionen von Tonnen Plastik, das in den Ozean gelangt ist und sich dort angesammelt hat. Diese Plastikverschmutzung hat verheerende Auswirkungen auf die Meeresumwelt und die Tierwelt.',
	relatedAction: 'Unverpackt kaufen'
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
