import { Link, useNavigate } from 'react-router-dom';
import { useGoals } from '../context/GoalsContext';

const GoalCard = ({ goal, onProgress, onClick }) => {
  const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
  
  const getTypeColor = () => {
    switch (goal.type) {
      case 'preset': return '#128b09';
      case 'friend': return '#2196F3';
      case 'own': return '#FF9800';
      default: return '#128b09';
    }
  };

  const getTypeLabel = () => {
    switch (goal.type) {
      case 'preset': return '🎯 Standard';
      case 'friend': return '👥 Freund';
      case 'own': return '✏️ Eigenes';
      default: return '';
    }
  };
  
  return (
    <div 
      onClick={onClick}
      style={{
        background: goal.completed ? '#e8f5e8' : '#fff',
        border: goal.completed ? '2px solid #128b09' : '1px solid #ddd',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        opacity: goal.completed ? 0.8 : 1,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      {/* Partner anzeigen bei Partner-Zielen */}
      {goal.label === 'Partner' && goal.partner && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
          padding: '6px 12px',
          background: '#e3f2fd',
          borderRadius: 8
        }}>
          <span style={{ color: '#1976D2', fontSize: 12 }}>Partner:</span>
          <img
            src={goal.partner.picture}
            alt={goal.partner.title}
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <span style={{ fontWeight: 'bold', color: '#1976D2', fontSize: 13 }}>
            {goal.partner.title}
          </span>
        </div>
      )}

      {/* Community anzeigen bei Community-Zielen */}
      {goal.label === 'Community' && goal.community && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
          padding: '6px 12px',
          background: '#e3f2fd',
          borderRadius: 8
        }}>
          <span style={{ color: '#1976D2', fontSize: 12 }}>Community:</span>
          <icon> {goal.community.image}</icon>
          {/*<img
            src={goal.community.image}
            alt={goal.community.name}
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />*/}
          <span style={{ fontWeight: 'bold', color: '#1976D2', fontSize: 13 }}>
            {goal.community.name}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <h3 style={{ margin: 0, color: '#128b09' }}>{goal.title}</h3>
            {goal.type && (
              <span style={{
                background: getTypeColor(),
                color: '#fff',
                padding: '2px 8px',
                borderRadius: 10,
                fontSize: 10,
                fontWeight: 'bold'
              }}>
                {getTypeLabel()}
              </span>
            )}
          </div>
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
        
        {!goal.completed && (goal.type === 'own' || goal.type === 'friend') && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onProgress(goal.id);
            }}
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
      <p style={{ margin: '8px 0 0 0', fontSize: 11, color: '#aaa', textAlign: 'right' }}>
        Klicke für Details →
      </p>
    </div>
  );
};

export default function Goals() {
  const navigate = useNavigate();
  const { getActiveGoals, getCompletedGoals, incrementProgress } = useGoals();

  const activeGoals = getActiveGoals();
  const completedGoals = getCompletedGoals();

  const handleProgress = (goalId) => {
    incrementProgress(goalId, 1);
  };

  const handleGoalClick = (goalId) => {
    navigate(`/goal/${goalId}`);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      //background: '#f9f9f9',
    }}>
      <h1 style={{ margin: '10px 0 0 70px' }}>Ziele</h1>
      {/* Aktuelle Ziele */}
      <div style={{
        flex: '0 0 50%',
        display: 'flex',
        flexDirection: 'column',
        //borderBottom: '1px solid #ddd',
        minHeight: 0,
      }}>
        <div style={{
		  //marginTop: '20px',
          padding: '10px 30px',
          //borderBottom: '1px solid #ddd',
          //background: '#fff',
          flexShrink: 0,
        }}>
        <h1 style={{ margin: 0, color: '#128b09' }}>Aktuelle Ziele</h1>
        </div>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px 30px',
          minHeight: 0,
        }}>
          {activeGoals.length > 0 ? (
            activeGoals.map(goal => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                onProgress={handleProgress}
                onClick={() => handleGoalClick(goal.id)}
              />
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

		<div style={{ marginTop: '10px', justifyContent: 'center', display: 'flex' }}>
        <Link to="/new-goal" style={{ textDecoration: 'none',  justifyContent: 'center'}}>
          <button
            style={{
              backgroundColor: '#128b09ff',
              color: '#fff',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
			        justifyContent: 'center',
              gap: '10px',
            }}
          >
            <img src="/submit.png" alt="Ziel einreichen" style={{ width: '24px', height: '24px' }} />
            Ziel hinzufügen
          </button>
        </Link>
      </div>

        <div style={{
          padding: '10px 30px',
          //borderBottom: '1px solid #ddd',
          //background: '#fff',
          flexShrink: 0,
        }}>
          <h1 style={{ margin: 0, color: '#128b09' }}>Erreichte Ziele </h1>
        </div>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px 30px',
          minHeight: 0,
        }}>
          {completedGoals.length > 0 ? (
            completedGoals.map(goal => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                onProgress={handleProgress}
                onClick={() => handleGoalClick(goal.id)}
              />
            ))
          ) : (
            <p style={{ color: '#999', textAlign: 'center', marginTop: 20 }}>Noch keine Ziele erreicht. Du schaffst das!</p>
          )}
        </div>
      </div>
    </div>
  );
}