import { createContext, useContext, useState, useEffect } from 'react';

const PointsContext = createContext();

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within PointsProvider');
  }
  return context;
};

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState([]);

  // Lade Punkte aus LocalStorage beim Mounten
  useEffect(() => {
    const savedPoints = localStorage.getItem('totalPoints');
    const savedHistory = localStorage.getItem('pointsHistory');
    
    if (savedPoints) {
      try {
        setPoints(JSON.parse(savedPoints));
      } catch (err) {
        console.error('Fehler beim Laden der Punkte:', err);
      }
    }
    
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error('Fehler beim Laden der Punktehistorie:', err);
      }
    }
  }, []);

  // Speichere Punkte in LocalStorage wenn sie sich ändern
  useEffect(() => {
    localStorage.setItem('totalPoints', JSON.stringify(points));
  }, [points]);

  // Speichere Historie in LocalStorage wenn sie sich ändert
  useEffect(() => {
    localStorage.setItem('pointsHistory', JSON.stringify(history));
  }, [history]);

  // Punkte hinzufügen
  const addPoints = (amount, reason = 'Unbekannt') => {
    const entry = {
      id: Date.now(),
      amount,
      reason,
      type: 'add',
      timestamp: new Date().toISOString(),
      balanceAfter: points + amount
    };
    
    setPoints(prev => prev + amount);
    setHistory(prev => [entry, ...prev]);
  };

  // Punkte abziehen
  const subtractPoints = (amount, reason = 'Unbekannt') => {
    const entry = {
      id: Date.now(),
      amount: -amount,
      reason,
      type: 'subtract',
      timestamp: new Date().toISOString(),
      balanceAfter: Math.max(0, points - amount)
    };
    
    setPoints(prev => Math.max(0, prev - amount));
    setHistory(prev => [entry, ...prev]);
  };

  // Punkte auf bestimmten Wert setzen
  const setPointsTo = (amount, reason = 'Manuell gesetzt') => {
    const entry = {
      id: Date.now(),
      amount: amount - points,
      reason,
      type: 'set',
      timestamp: new Date().toISOString(),
      balanceAfter: amount
    };
    
    setPoints(amount);
    setHistory(prev => [entry, ...prev]);
  };

  // Punkte zurücksetzen
  const resetPoints = () => {
    const entry = {
      id: Date.now(),
      amount: -points,
      reason: 'Zurückgesetzt',
      type: 'reset',
      timestamp: new Date().toISOString(),
      balanceAfter: 0
    };
    
    setPoints(0);
    setHistory(prev => [entry, ...prev]);
  };

  // Füllprozentsatz berechnen (1% pro 10 Punkte, max 100%)
  const getFillPercent = (maxPoints = 1000) => {
    return Math.min(100, (points / maxPoints) * 100);
  };

  return (
    <PointsContext.Provider value={{
      points,
      history,
      addPoints,
      subtractPoints,
      setPointsTo,
      resetPoints,
      getFillPercent
    }}>
      {children}
    </PointsContext.Provider>
  );
};
