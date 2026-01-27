import { createContext, useContext, useState, useEffect } from 'react';

const BonusPointsContext = createContext();

export const useBonusPoints = () => {
  const context = useContext(BonusPointsContext);
  if (!context) {
	throw new Error('useBonusPoints must be used within BonusPointsProvider');
  }
  return context;
};

export const BonusPointsProvider = ({ children }) => {
  const [bonusPoints, setBonusPoints] = useState(250);
  const [history, setHistory] = useState([]);

  // Lade Punkte aus LocalStorage beim Mounten
  useEffect(() => {
	const savedBonusPoints = localStorage.getItem('totalBonusPoints');
	const savedHistory = localStorage.getItem('bonusPointsHistory');
	
	if (savedBonusPoints) {
	  try {
		setBonusPoints(JSON.parse(savedBonusPoints));
	  } catch (err) {
		console.error('Fehler beim Laden der Punkte:', err);
	  }
	}
	
	if (savedHistory) {
	  try {
		setHistory(JSON.parse(savedHistory));
	  } catch (err) {
		console.error('Fehler beim Laden der Bonuspunktehistorie:', err);
	  }
	}
  }, []);

  // Speichere Punkte in LocalStorage wenn sie sich ändern
  useEffect(() => {
	localStorage.setItem('totalBonusPoints', JSON.stringify(bonusPoints));
  }, [bonusPoints]);

  // Speichere Historie in LocalStorage wenn sie sich ändert
  useEffect(() => {
	localStorage.setItem('bonusPointsHistory', JSON.stringify(history));
  }, [history]);

  // Punkte hinzufügen
  const addBonusPoints = (amount, reason = 'Unbekannt') => {
	const entry = {
	  id: Date.now(),
	  amount,
	  reason,
	  type: 'add',
	  timestamp: new Date().toISOString(),
	  balanceAfter: bonusPoints + amount
	};
	
	setBonusPoints(prev => prev + amount);
	setHistory(prev => [entry, ...prev]);
  };

  // Punkte abziehen
  const subtractBonusPoints = (amount, reason = 'Unbekannt') => {
	const entry = {
	  id: Date.now(),
	  amount: -amount,
	  reason,
	  type: 'subtract',
	  timestamp: new Date().toISOString(),
	  balanceAfter: Math.max(0, bonusPoints - amount)
	};
	
	setBonusPoints(prev => Math.max(0, prev - amount));
	setHistory(prev => [entry, ...prev]);
  };

  // Punkte auf bestimmten Wert setzen
  const setBonusPointsTo = (amount, reason = 'Manuell gesetzt') => {
	const entry = {
	  id: Date.now(),
	  amount: amount - bonusPoints,
	  reason,
	  type: 'set',
	  timestamp: new Date().toISOString(),
	  balanceAfter: amount
	};
	
	setBonusPoints(amount);
	setHistory(prev => [entry, ...prev]);
  };

  // Punkte zurücksetzen
  const resetPoints = () => {
	const entry = {
	  id: Date.now(),
	  amount: -bonusPoints,
	  reason: 'Zurückgesetzt',
	  type: 'reset',
	  timestamp: new Date().toISOString(),
	  balanceAfter: 0
	};
	
	setBonusPoints(0);
	setHistory(prev => [entry, ...prev]);
  };

  // Füllprozentsatz berechnen (1% pro 10 Punkte, max 100%)
  const getFillPercent = (maxPoints = 1000) => {
	return Math.min(100, (bonusPoints / maxPoints) * 100);
  };

  return (
	<BonusPointsContext.Provider value={{
	  points,
	  history,
	  addPoints,
	  subtractPoints,
	  setPointsTo,
	  resetPoints,
	  getFillPercent
	}}>
	  {children}
	</BonusPointsContext.Provider>
  );
};
