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
	relatedAction: 'Bäume pflanzen',
	images: '/knowledge-1.svg',
  },
  {
	id: 2,
	title: 'Das neue Superfood: Algen',
	short: 'Algen sind eine nachhaltige Nahrungsquelle mit vielen Vorteilen.',
	description: 'Algen sind eine nachhaltige Nahrungsquelle mit vielen Vorteilen. Sie benötigen wenig Ressourcen, wachsen schnell und sind reich an Nährstoffen. Algen können helfen, den Hunger zu bekämpfen und die Umwelt zu schützen.',
	relatedAction: 'Lokale Produkte', 
	images: '/knowledge-2.jpg',
  },
  {
	id: 3,
	title: 'Die Macht der Konsumenten',
	short: 'Konsumenten haben die Macht, durch ihre Kaufentscheidungen Veränderungen zu bewirken.',
	description: 'Konsumenten haben die Macht, durch ihre Kaufentscheidungen Veränderungen zu bewirken. Indem sie nachhaltige Produkte wählen und Unternehmen unterstützen, die umweltfreundliche Praktiken fördern, können Konsumenten einen positiven Einfluss auf die Umwelt und die Gesellschaft ausüben.',
	relatedAction: 'Nachhaltige Mode', 
	images: '/knowledge-3.jpg',
  },
  {
	id: 4,
	title: 'Energie sparen im Haushalt',
	short: 'Einfache Maßnahmen können den Energieverbrauch im Haushalt erheblich reduzieren.',
	description: 'Einfache Maßnahmen können den Energieverbrauch im Haushalt erheblich reduzieren. Dazu gehören das Ausschalten von Geräten im Standby-Modus, die Verwendung von LED-Lampen und die Optimierung der Heizung. Diese Maßnahmen tragen nicht nur zum Umweltschutz bei, sondern senken auch die Energiekosten.',
	relatedAction: 'LED-Lampen', 
	images: '/knowledge-4.avif',
  },
  {
	id: 5,
	title: 'Nachhaltige Mobilität',
	short: 'Nachhaltige Mobilität umfasst umweltfreundliche Transportmittel und -praktiken.',
	description: 'Nachhaltige Mobilität umfasst umweltfreundliche Transportmittel und -praktiken. Dazu gehören das Fahrradfahren, die Nutzung öffentlicher Verkehrsmittel und das Carsharing. Diese Maßnahmen tragen zur Reduzierung von CO2-Emissionen und zur Verbesserung der Luftqualität bei.',
	relatedAction: 'Carsharing', 
	images: '/knowledge-5.jpg',
  },
  {
	id: 6,
	title: 'Die Plastikinsel im Pazifik',
	short: 'Die Plastikinsel im Pazifik ist ein riesiger Müllteppich aus Plastikmüll, der so groß wie Mitteleuropa ist.',
	description: 'Die Plastikinsel im Pazifik ist ein riesiger Müllteppich aus Plastikmüll, der so groß wie Mitteleuropa ist. Er besteht aus Millionen von Tonnen Plastik, das in den Ozean gelangt ist und sich dort angesammelt hat. Diese Plastikverschmutzung hat verheerende Auswirkungen auf die Meeresumwelt und die Tierwelt.',
	relatedAction: 'Unverpackt kaufen', 
	images: '/knowledge-6.jpg',
  },
  {
	id: 7,
	title: 'China und die Umwelt',
	short: 'China ist der weltweit größte Emittent von Treibhausgasen, aber auch ein Vorreiter bei erneuerbaren Energien.',
	description: 'China ist der weltweit größte Emittent von Treibhausgasen, vor allem wegen seiner Fast Fashion Industrie. China ist jedoch auch ein Vorreiter bei erneuerbaren Energien. Das Land investiert massiv in Solar- und Windenergie und setzt auf Elektromobilität, um seine Umweltbilanz zu verbessern.',
	relatedAction: 'Nachhaltige Mode', 
	images: '/knowledge-7.jpg',
  },
  {
	id: 8,
	title: 'Die Macht des Einzelnen',
	short: 'Der Einzelne kann durch bewusste Entscheidungen und Handlungen einen positiven Einfluss auf die Umwelt haben.',
	description: 'Der Einzelne kann durch bewusste Entscheidungen und Handlungen einen positiven Einfluss auf die Umwelt haben. Indem man nachhaltige Produkte kauft, Energie spart und umweltfreundliche Transportmittel nutzt, kann jeder dazu beitragen, die Umwelt zu schützen und eine nachhaltige Zukunft zu fördern.',
	relatedAction: ['Nachhaltige Mode', 'Unverpackt kaufen', 'Fahrrad fahren'], 
	images: '/knowledge-8.jpg',
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
