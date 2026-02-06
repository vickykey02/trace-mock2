//inhaltlich überarbeiten

import { createContext, useContext, useState, useEffect } from 'react';

const GoalsContext = createContext();

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error('useGoals must be used within GoalsProvider');
  }
  return context;
};

// Vorgefertigte Ziele (type: 'preset') - aktualisieren sich automatisch
export const PRESET_GOALS = [
  {
    id: 'preset-1',
    title: '7 Tage Wasser sparen',
    description: 'Spart gemeinsam 500 Liter Wasser in 7 Tagen',
    category: 'Energie',
    label: 'Community',
    target: 500,
    unit: 'Liter',
    linkedAction: 'Wasser sparen',
    tips: [
      'Kürzer duschen - maximal 5 Minuten',
      'Wasserhahn beim Zähneputzen ausschalten',
      'Tropfende Hähne sofort reparieren',
      'Regenwasser zum Gießen sammeln'
    ],
    type: 'preset'
  },
  {
    id: 'preset-2',
    title: '10x Unverpackt einkaufen',
    description: 'Kaufe 10 Mal in einem Unverpackt-Laden ein',
    category: 'Shopping', 
    label:'Partner',
    target: 10,
    unit: 'Einkäufe',
    linkedAction: 'Unverpackt kaufen',
    tips: [
      'Nimm eigene Behälter und Beutel mit',
      'Starte mit trockenen Lebensmitteln wie Reis oder Nudeln',
      'Plane deinen Einkauf vorher',
      'Finde Unverpackt-Läden in deiner Nähe' 
    ],
    type: 'preset'
  },
  {
    id: 'preset-3',
    title: 'Fahrrad-Woche',
    description: 'Fahre diese Woche 5x mit dem Fahrrad statt Auto',
    category: 'Mobilität',
    label:'Partner',
    target: 5,
    unit: 'Fahrten',
    linkedAction: 'Fahrrad fahren',
    tips: [
      'Plane kürzere Strecken fürs Rad ein',
      'Kombiniere Radfahren mit ÖPNV',
      'Bei schlechtem Wetter: Regenjacke bereithalten',
      'Finde schöne Radwege in deiner Stadt'
    ],
    type: 'preset'
  },
  {
    id: 'preset-4',
    title: 'Recycling-Meister',
    description: 'Trenne 14 Tage lang konsequent deinen Müll',
    category: 'Abfall',
    label:'Individual',
    target: 14,
    unit: 'Tage',
    linkedAction: 'Recycling',
    tips: [
      'Richte verschiedene Mülleimer ein',
      'Lerne die Recycling-Symbole',
      'Spüle Verpackungen kurz aus',
      'Informiere dich über lokale Recycling-Regeln'
    ],
    type: 'preset'
  },
  {
    id: 'preset-5',
    title: 'Regional essen',
    description: 'Kaufe 10x regionale Produkte vom Bauernmarkt',
    category: 'Ernährung',
    label:'Partner',
    target: 10,
    unit: 'Einkäufe',
    linkedAction: 'Lokale Produkte',
    tips: [
      'Besuche den Wochenmarkt',
      'Frag nach der Herkunft der Produkte',
      'Kaufe saisonales Obst und Gemüse',
      'Unterstütze lokale Hofläden'
    ],
    type: 'preset'
  }
];

// Ziele von Freunden (Mock-Daten)
export const FRIEND_GOALS = [
  {
    id: 'friend-1',
    title: 'Plastikfrei im Bad',
    description: 'Ersetze alle Plastikprodukte im Bad durch nachhaltige Alternativen',
    category: 'Shopping',
    label: 'Individual',
    target: 10,
    unit: 'Produkte',
    createdBy: 'Jane Goodall',
    tips: [
      'Starte mit Seifenstücken statt Flüssigseife',
      'Bambus-Zahnbürste nutzen',
      'Feste Shampoo-Bars ausprobieren'
    ],
    type: 'friend'
  },
  {
    id: 'friend-2',
    title: '30 Tage kein Fast Fashion',
    description: 'Kaufe einen Monat lang keine neue Kleidung von Fast-Fashion-Marken',
    category: 'Shopping',
    label: 'Individual',
    target: 30,
    unit: 'Tage',
    createdBy: 'Olivia Kempe',
    tips: [
      'Second-Hand-Läden entdecken',
      'Kleidertausch mit Freunden',
      'Repariere statt wegwerfen'
    ],
    type: 'friend'
  },
  {
    id: 'friend-3',
    title: 'Vegane Woche',
    description: 'Ernähre dich eine Woche komplett vegan',
    category: 'Ernährung',
    label: 'Individual',
    target: 7,
    unit: 'Tage',
    createdBy: 'Olivia Kempe',
    tips: [
      'Plane Mahlzeiten im Voraus',
      'Entdecke neue Rezepte',
      'Achte auf ausreichend Protein'
    ],
    type: 'friend'
  }
];

export const GoalsProvider = ({ children }) => {
  const [activeGoals, setActiveGoals] = useState([]);

  // Lade Ziele aus LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('activeGoals');
    if (saved) {
      try {
        setActiveGoals(JSON.parse(saved));
      } catch (err) {
        console.error('Fehler beim Laden der Ziele:', err);
      }
    }
  }, []);

  // Speichere Ziele in LocalStorage
  useEffect(() => {
    localStorage.setItem('activeGoals', JSON.stringify(activeGoals));
  }, [activeGoals]);

  // Ziel hinzufügen (aus Preset, Friend oder eigenes)
  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: goal.id || `own-${Date.now()}`,
      current: 0,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setActiveGoals(prev => [...prev, newGoal]);
  };

  // Manuellen Fortschritt erhöhen
  const incrementProgress = (goalId, amount = 1) => {
    setActiveGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.min(goal.current + amount, goal.target);
        return {
          ...goal,
          current: newCurrent,
          completed: newCurrent >= goal.target
        };
      }
      return goal;
    }));
  };

  // Fortschritt setzen (für eigene Ziele)
  const setProgress = (goalId, value) => {
    setActiveGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.min(Math.max(0, value), goal.target);
        return {
          ...goal,
          current: newCurrent,
          completed: newCurrent >= goal.target
        };
      }
      return goal;
    }));
  };

  // Automatischer Progress bei einschlägiger Handlung (für preset-Ziele)
  const updateProgressByAction = (actionTitle, category) => {
    setActiveGoals(prev => prev.map(goal => {
      // Nur preset-Ziele automatisch aktualisieren
      if (goal.type === 'preset' && !goal.completed) {
        // Prüfe ob die Handlung zum Ziel passt
        const matchesAction = goal.linkedAction && 
          actionTitle.toLowerCase().includes(goal.linkedAction.toLowerCase());
        const matchesCategory = goal.category === category;

        if (matchesAction || matchesCategory) {
          const newCurrent = Math.min(goal.current + 1, goal.target);
          return {
            ...goal,
            current: newCurrent,
            completed: newCurrent >= goal.target
          };
        }
      }
      return goal;
    }));
  };

  // Ziel entfernen
  const removeGoal = (goalId) => {
    setActiveGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  // Ziel bearbeiten
  const updateGoal = (goalId, updates) => {
    setActiveGoals(prev => prev.map(goal =>
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  // Partner für ein Ziel setzen/entfernen
  const setGoalPartner = (goalId, partner) => {
    setActiveGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          partner: partner // { id, title, picture } oder null
        };
      }
      return goal;
    }));
  };

  // Community für ein Ziel setzen/entfernen
  const setGoalCommunity = (goalId, community) => {
    setActiveGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          community: community // { id, name, image } oder null
        };
      }
      return goal;
    }));
  };

  // Prüfen ob Ziel bereits aktiv ist (nach ID)
  const isGoalActive = (goalId) => {
    return activeGoals.some(goal => goal.id === goalId);
  };

  // Prüfen ob Ziel bereits aktiv ist (nach Titel)
  const isGoalActiveByTitle = (title) => {
    return activeGoals.some(goal => goal.title === title);
  };

  // Getters
  const getActiveGoals = () => activeGoals.filter(g => !g.completed);
  const getCompletedGoals = () => activeGoals.filter(g => g.completed);
  const getGoalById = (goalId) => activeGoals.find(g => g.id === goalId);
  
  // Sucht in allen Zielen (aktiv, preset, friend)
  const getAnyGoalById = (goalId) => {
    // Erst in aktiven Zielen suchen
    const activeGoal = activeGoals.find(g => g.id === goalId);
    if (activeGoal) return activeGoal;
    
    // Dann in Preset-Zielen
    const presetGoal = PRESET_GOALS.find(g => g.id === goalId);
    if (presetGoal) return presetGoal;
    
    // Dann in Friend-Zielen
    const friendGoal = FRIEND_GOALS.find(g => g.id === goalId);
    if (friendGoal) return friendGoal;
    
    return null;
  };

  return (
    <GoalsContext.Provider value={{
      activeGoals,
      presetGoals: PRESET_GOALS,
      friendGoals: FRIEND_GOALS,
      addGoal,
      incrementProgress,
      setProgress,
      updateProgressByAction,
      removeGoal,
      updateGoal,
      setGoalPartner,
      setGoalCommunity,
      isGoalActive,
      isGoalActiveByTitle,
      getActiveGoals,
      getCompletedGoals,
      getGoalById,
      getAnyGoalById
    }}>
      {children}
    </GoalsContext.Provider>
  );
};

export default GoalsContext;
