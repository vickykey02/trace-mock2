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
	instruction: 'Gehe auf Vinted, wähle deinen Lieblingsartikel aus und gib beim Bezahlen den Gutscheincode ein, den du nach dem Einlösen hier per Mail erhältst. Viel Spaß beim nachhaltigen Shoppen!',
  },
  {
    id: 2,
    title: 'Bio-Café Gutschein',
    description: 'Ein Heißgetränk deiner Wahl im lokalen Bio-Café',
    pointsCost: 50,
	instruction: 'Besuche das teilnehmende Bio-Café in deiner Nähe und zeige diesen Gutschein an der Kasse vor, um dein Heißgetränk zu genießen. Guten Appetit!',
  },
  {
    id: 3,
    title: 'Unverpackt-Laden Rabatt',
    description: '15% Rabatt auf deinen nächsten Einkauf',
    pointsCost: 150,
	instruction: 'Gehe zu einem der teilnehmenden Unverpackt-Läden, wähle deine Produkte aus und zeige diesen Gutschein an der Kasse vor, um 15% Rabatt auf deinen Einkauf zu erhalten. Viel Spaß beim nachhaltigen Einkaufen!',
  },
  {
    id: 4,
    title: 'Fahrrad-Check',
    description: 'Kostenloser Fahrrad-Sicherheitscheck beim lokalen Händler',
    pointsCost: 200,
	instruction: 'Vereinbare einen Termin bei einem der teilnehmenden Fahrradläden in deiner Nähe und bringe diesen Gutschein mit, um einen kostenlosen Sicherheitscheck für dein Fahrrad zu erhalten. So bist du sicher unterwegs!',
  },
  {
    id: 5,
    title: 'Stadtbibliothek Monatskarte',
    description: 'Ein Monat gratis Ausleihen in der Stadtbibliothek',
    pointsCost: 80,
	instruction: 'Besuche deine lokale Stadtbibliothek und zeige diesen Gutschein vor, um eine Monatskarte für kostenlose Ausleihen zu erhalten. Viel Spaß beim Lesen und Entdecken neuer Bücher!',
  },
  {
    id: 6,
    title: 'Baum pflanzen lassen',
    description: 'Ein Baum wird in deinem Namen in Chemnitz gepflanzt',
    pointsCost: 300,
	instruction: 'Nachdem du diesen Gutschein eingelöst hast, wird in deinem Namen ein Baum in Chemnitz gepflanzt. Du erhältst eine Bestätigung per E-Mail mit Informationen über den Standort und die Art des Baumes. Vielen Dank für deinen Beitrag zum Umweltschutz!',
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
