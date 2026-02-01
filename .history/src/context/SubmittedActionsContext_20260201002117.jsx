import { createContext, useContext, useState, useEffect } from 'react';

const SubmittedActionsContext = createContext();

export const useSubmittedActions = () => {
  const context = useContext(SubmittedActionsContext);
  if (!context) {
    throw new Error('useSubmittedActions must be used within SubmittedActionsProvider');
  }
  return context;
};

export const SubmittedActionsProvider = ({ children }) => {
  const [submitted, setSubmitted] = useState([]);

  // Lade eingereichte Handlungen aus LocalStorage beim Mounten
  useEffect(() => {
    const saved = localStorage.getItem('submittedActions');
    if (saved) {
      try {
        setSubmitted(JSON.parse(saved));
      } catch (err) {
        console.error('Fehler beim Laden der eingereichten Handlungen:', err);
      }
    }
  }, []);

  // Speichere eingereichte Handlungen in LocalStorage wenn sie sich ändern
  useEffect(() => {
    localStorage.setItem('submittedActions', JSON.stringify(submitted));
  }, [submitted]);

  const addSubmittedAction = (action) => {
    const newAction = {
      ...action,
      id: Date.now(),
      status: action.status || 'pending', // Nutze übergebenen Status oder 'pending'
	    points: action.points || 0,
      submittedAt: new Date().toISOString()
    };
    setSubmitted(prev => [newAction, ...prev]);
  };

  const updateStatus = (id, status) => {
    setSubmitted(prev =>
      prev.map(action => action.id === id ? { ...action, status } : action)
    );
  };

  const removeSubmitted = (id) => {
    setSubmitted(prev => prev.filter(action => action.id !== id));
  };

  return (
    <SubmittedActionsContext.Provider value={{
      submitted,
      addSubmittedAction,
      updateStatus,
      removeSubmitted
    }}>
      {children}
    </SubmittedActionsContext.Provider>
  );
};

export default SubmittedActionsContext;
