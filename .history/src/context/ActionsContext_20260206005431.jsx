//überarbeiten sodass alle Angaben korrekt und sinnvoll

import { createContext, useContext } from 'react';

const ActionsContext = createContext();

export const useActions = () => {
  const context = useContext(ActionsContext);
  if (!context) {
    throw new Error('useActions must be used within ActionsProvider');
  }
  return context;
};

// Alle Handlungen zentral definiert
export const ALL_ACTIONS = [
  {
    id: 1,
    title: 'Unverpackt kaufen',
    description: 'Bring deine eigenen Gefäße und Beutel für den Kauf von Lebensmitteln mit in den Laden. Dort lässt du diese wiegen, füllst sie und bezahlst. Beim Bezahlen kannst du einen QR Code scannen, um die Handlung einzutragen.',
    category: 'Shopping',
    label: 'Individual',
    keywords: ['plastik', 'einkaufen', 'umwelt', 'shopping'],
    information: 'Plastik ist eines der größten Umweltprobleme unserer Zeit. Durch den Einsatz von Stoffbeuteln beim Einkaufen kannst du einen großen Beitrag zur Reduktion von Einwegplastik leisten. Dies ist eine einfache, aber wirkungsvolle Maßnahme.',
    impact: 'Reduziert Plastikmüll um bis zu 500 Beutel pro Jahr',
    difficulty: 'Leicht',
    points: '10 Punkte pro Einkauf. Maximal 20 Punkte pro Woche.',
    tips: ['Nimm Behälter mit', 'Spare Verpackungsmaterial', 'Unterstütze unverpackt Läden'],
    showMap: true
  },
  {
    id: 2,
    title: 'Bäume pflanzen',
    description: 'Nimm an einer professionell organisierten Baumpflanzaktion in Chemnitz oder Umgebung teil.',
    category: 'Natur',
    label: 'Community',
    keywords: ['baum', 'natur', 'grün', 'umwelt', 'pflanzen'],
    information: 'Bäume sind essentiell für unser Ökosystem. Sie produzieren Sauerstoff, speichern Kohlenstoff und bieten Lebensraum für Tiere. Das Pflanzen von Bäumen ist eine wirkungsvolle Maßnahme gegen den Klimawandel.',
    impact: 'Ein Baum bindet etwa 1 Tonne CO2 in seinem Leben.',
    difficulty: 'Mittel',
    points: '25 Punkte pro Baum',
    tips: ['Wähle den richtigen Baum für deine Region', 'Pflanze im Herbst oder Frühjahr', 'Kümmere dich regelmäßig um den Baum'],
    showMap: false
  },
  {
    id: 3,
    title: 'Bus/Bahn fahren',
    description: 'Nimm den Bus oder die Bahn statt das Auto für kurze Strecken',
    category: 'Mobilität',
    label: 'Individual',
    keywords: ['bus', 'bahn','mobilität', 'transport', 'co2'],
    information: 'Das Nutzen von öffentlichen Verkehrsmitteln wie dem Bus reduziert den CO2-Ausstoß im Vergleich zum Auto erheblich. Es ist eine einfache Möglichkeit, umweltbewusster unterwegs zu sein.',
    impact: 'Spart bis zu 0,5 Tonnen CO2 pro Jahr',
    difficulty: 'Leicht',
    points: '5 Punkte pro Tag',
    tips: ['Nutze Fahrpläne', 'Kaufe Tickets im Voraus', 'Vermeide Stoßzeiten'],
    showMap: false
  },
  {
    id: 4,
    title: 'Recycling',
    description: 'Trenne deinen Müll korrekt und recycele wo möglich',
    category: 'Abfall',
    label: 'Individual',
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
    label: 'Individual',
    keywords: ['mode', 'kleidung', 'shopping', 'nachhaltig'],
    information: 'Die Modeindustrie ist einer der größten Umweltver unreiniger. Durch den Kauf von Second-Hand oder nachhaltigen Labels unterstützt du umweltfreundliche Praktiken.',
    impact: 'Spart Wasser und reduziert Chemikalien in der Produktion',
    difficulty: 'Leicht',
    points: '15 Punkte pro Kauf',
    tips: ['Besuche Second-Hand Läden', 'Recherchiere nachhaltige Marken', 'Tausche Kleidung mit Freunden'],
    showMap: true
  },
  {
    id: 6,
    title: 'Fahrrad fahren',
    description: 'Nutze dein Fahrrad statt das Auto für kurze Strecken',
    category: 'Mobilität',
    label: 'Community',
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
    label: 'Individual',
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
    label: 'Individual',
    keywords: ['lokal', 'produkte', 'bauern', 'regional'],
    information: 'Lokale Produkte haben kürzere Transportwege und unterstützen die lokale Wirtschaft. Sie sind oft frischer und geschmackvoller.',
    impact: 'Reduziert Transportemissionen um bis zu 80%',
    difficulty: 'Leicht',
    points: 12,
    pointsDescription: '12 Punkte pro Einkauf',
    tips: ['Besuche Bauernmärkte', 'Unterstütze lokale Läden', 'Bekenne dich zur Saisonalität'],
    showMap: false
  }
];

export const ActionsProvider = ({ children }) => {
  return (
    <ActionsContext.Provider value={{ actions: ALL_ACTIONS }}>
      {children}
    </ActionsContext.Provider>
  );
};

export default ActionsContext;
