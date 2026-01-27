import React, { useState } from 'react';

// Beispiel-Ziele mit Trackern
const ALL_GOALS = [
  {
    id: 1,
    title: 'Nachhaltig einkaufen',
    description: 'Kaufe diese Woche 3x unverpackt ein',
    target: 3,
    current: 1,
    unit: 'Einkäufe',
    completed: false,
    category: 'Shopping',
  },
  {
    id: 2,
    title: 'Wasser sparen',
    description: 'Duschen unter 5 Minuten',
    target: 7,
    current: 4,
    unit: 'Tage',
    completed: false,
    category: 'Energie',
  },
  {
    id: 3,
    title: 'Fahrrad-Challenge',
    description: 'Diese Woche 5x mit dem Fahrrad fahren',
    target: 5,
    current: 5,
    unit: 'Fahrten',
    completed: true,
    category: 'Mobilität',
  },
  {
    id: 4,
    title: 'Plastikfrei',
    description: 'Letzte Woche erfolgreich abgeschlossen',
    target: 1,
    current: 1,
    unit: 'Woche',
    completed: true,
    category: 'Umwelt',
  },
];

const GoalCard = ({ goal, onProgress }) => {
  const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
  
  return (
    <div style={{
      background: goal.completed ? '#e8f5e8' : '#fff',
      border: goal.completed ? '2px solid #128b09' : '1px solid #ddd',
      borderRadius: 10,
      padding: 20,
      marginBottom: 15,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      opacity: goal.completed ? 0.8 : 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#128b09' }}>{goal.title}</h3>
          <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: 14 }}>{goal.description}</p>
          
          {!goal.completed && (
            <>
              <div style={{
                background: '#eee',
                borderRadius: 8,
                height: 18,
                overflow: 'hidden',
                marginBottom: 8,
                boxShadow: '0 1px 2px #ccc inset',
              }}>
                <div style={{
                  width: progress + '%',
                  background: 'linear-gradient(90deg, #128b09 60%, #4be04b 100%)',
                  height: '100%',
                  borderRadius: 8,
                  transition: 'width 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: 8,
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 'bold',
                }} >{progress}%</div>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: '#999' }}>
                {goal.current} / {goal.target} {goal.unit}
              </p>
            </>
          )}
        </div>
        
        {!goal.completed && (
          <button
            onClick={() => onProgress(goal.id)}
            style={{
              background: '#128b09',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 12px',
              marginLeft: 15,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
            }}
          >
            +1
          </button>
        )}
        
        {goal.completed && (
          <div style={{ color: '#128b09', fontWeight: 'bold', fontSize: 18 }}>✓</div>
        )}
      </div>
    </div>
  );
};

export default function Goals(props) {
  const [goals, setGoals] = useState(ALL_GOALS);

  const handleProgress = (goalId) => {
    setGoals(goals.map(g => 
      g.id === goalId
        ? { ...g, current: Math.min(g.current + 1, g.target), completed: g.current + 1 >= g.target }
        : g
    ));
  };

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 70px)',
      overflow: 'hidden',
      background: '#f9f9f9',
    }}>
      {/* Aktuelle Ziele */}
      <div style={{
        flex: '0 0 50%',
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid #ddd',
        minHeight: 0,
      }}>
        <div style={{
          padding: '20px 30px',
          borderBottom: '1px solid #ddd',
          background: '#fff',
          flexShrink: 0,
        }}>
          <h2 style={{ margin: 0, color: '#128b09' }}>Aktuelle Ziele</h2>
        </div>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 30px',
          minHeight: 0,
        }}>
          {activeGoals.length > 0 ? (
            activeGoals.map(goal => (
              <GoalCard key={goal.id} goal={goal} onProgress={handleProgress} />
            ))
          ) : (
            <p style={{ color: '#999', textAlign: 'center', marginTop: 20 }}>Keine aktiven Ziele. Starte ein neues Ziel!</p>
          )}
        </div>
      </div>

      {/* Erreichte Ziele */}
      <div style={{
        flex: '0 0 50%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}>
        <div style={{
          padding: '20px 30px',
          borderBottom: '1px solid #ddd',
          background: '#fff',
          flexShrink: 0,
        }}>
          <h2 style={{ margin: 0, color: '#128b09' }}>Erreichte Ziele 🎉</h2>
        </div>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 30px',
          minHeight: 0,
        }}>
          {completedGoals.length > 0 ? (
            completedGoals.map(goal => (
              <GoalCard key={goal.id} goal={goal} onProgress={handleProgress} />
            ))
          ) : (
            <p style={{ color: '#999', textAlign: 'center', marginTop: 20 }}>Noch keine Ziele erreicht. Du schaffst das!</p>
          )}
        </div>
      </div>
    </div>
  );
}