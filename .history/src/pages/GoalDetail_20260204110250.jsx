import { useParams, useNavigate } from 'react-router-dom';
import { useGoals } from '../context/GoalsContext';
import { useFollow } from '../context/FollowContext';
import { useFriends } from '../context/FriendsContext';
import Delete from '../popups/Delete.jsx';
import { useState } from 'react';

export default function GoalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAnyGoalById, getGoalById, incrementProgress, removeGoal, addGoal, isGoalActive } = useGoals();

  const { followed } = useFollow();
  const { friends } = useFriends();
  
  const goal = getAnyGoalById(id);
  const activeGoal = getGoalById(id); // Prüfen ob bereits aktiv
  const isActive = isGoalActive(id);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showPartnerPopup, setShowPartnerPopup] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  // Hole die gefolgten Freunde mit ihren Daten
  const followedFriends = friends.filter(f => followed.includes(f.id));

  if (!goal) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Ziel nicht gefunden</h2>
        <button
          onClick={() => navigate('/goals')}
          style={{
            marginTop: 20,
            padding: '10px 20px',
            background: '#128b09',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer'
          }}
        >
          Zurück zu Zielen
        </button>
      </div>
    );
  }

  // Für aktive Ziele den aktuellen Fortschritt nutzen, sonst 0
  const currentGoal = isActive ? activeGoal : goal;
  const progress = isActive 
    ? Math.min(100, Math.round((activeGoal.current / activeGoal.target) * 100))
    : 0;

  {/*const handleDelete = () => {
    if (window.confirm('Möchtest du dieses Ziel wirklich löschen?')) {
      removeGoal(goal.id);
      navigate('/goals');
    }
  };*/}

  const handleAddGoal = () => {
    addGoal(goal);
    navigate('/goals');
  };

  const getTypeLabel = () => {
    switch (goal.type) {
      case 'preset': return '🎯 Standardziel';
      case 'friend': return `👥 Von ${goal.createdBy || 'Freund'}`;
      case 'own': return '✏️ Eigenes Ziel';
      default: return '';
    }
  };

  const getTypeColor = () => {
    switch (goal.type) {
      case 'preset': return '#128b09';
      case 'friend': return '#2196F3';
      case 'own': return '#FF9800';
      default: return '#666';
    }
  };

  return (
    <div style={{
      padding: '40px 20px 100px 20px',
      maxWidth: 600,
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <span style={{
		  marginTop: 30,
          display: 'inline-block',
          background: getTypeColor(),
          color: '#fff',
          padding: '4px 12px',
          borderRadius: 20,
          fontSize: 12,
          marginBottom: 10
        }}>
          {getTypeLabel()}
        </span>
        <h1 style={{ margin: '10px 0', color: '#128b09' }}>{goal.title}</h1>
        <p style={{ color: '#666', margin: 0 }}>{goal.description}</p>
      </div>

      {/* Fortschritt */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Fortschritt</h3>
        
        {isActive ? (
          <>
            <div style={{
              background: '#eee',
              borderRadius: 10,
              height: 24,
              overflow: 'hidden',
              marginBottom: 10
            }}>
              <div style={{
                width: `${progress}%`,
                background: activeGoal.completed 
                  ? 'linear-gradient(90deg, #4CAF50, #8BC34A)' 
                  : 'linear-gradient(90deg, #128b09 60%, #4be04b 100%)',
                height: '100%',
                borderRadius: 10,
                transition: 'width 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
              }}>
                {progress}%
              </div>
            </div>

            <p style={{ margin: '0 0 15px 0', textAlign: 'center', fontSize: 16 }}>
              <strong>{activeGoal.current}</strong> / {activeGoal.target} {activeGoal.unit}
            </p>

            {activeGoal.completed ? (
              <div style={{
                background: '#e8f5e8',
                padding: 15,
                borderRadius: 8,
                textAlign: 'center',
                color: '#128b09',
                fontWeight: 'bold'
              }}>
                🎉 Ziel erreicht! Herzlichen Glückwunsch!
              </div>
            ) : (
              <>
                {/* Für preset-Ziele: Automatische Info */}
                {activeGoal.type === 'preset' && (
                  <div style={{
                    background: '#e3f2fd',
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 15,
                    fontSize: 13,
                    color: '#1976D2'
                  }}>
                    ℹ️ Dieses Ziel aktualisiert sich automatisch, wenn du die Handlung "{activeGoal.linkedAction}" einträgst.
                  </div>
                )}

                {/* Für friend/own-Ziele: Manuelle Buttons */}
                {(activeGoal.type === 'friend' || activeGoal.type === 'own') && (
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                    {/*<button
                      onClick={() => incrementProgress(activeGoal.id, -1)}
                      disabled={activeGoal.current <= 0}
                      style={{
                        padding: '10px 20px',
                        background: activeGoal.current <= 0 ? '#ccc' : '#ff5722',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        cursor: activeGoal.current <= 0 ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        fontSize: 16
                      }}
                    >
                      -1
                    </button> */}
                    <button
                      onClick={() => incrementProgress(activeGoal.id, 1)}
                      disabled={activeGoal.current >= activeGoal.target}
                      style={{
                        padding: '10px 30px',
                        background: activeGoal.current >= activeGoal.target ? '#ccc' : '#128b09',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        cursor: activeGoal.current >= activeGoal.target ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        fontSize: 16
                      }}
                    >
                      +1
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          /* Nicht aktives Ziel - Vorschau */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: '#f5f5f5',
              borderRadius: 10,
              height: 24,
              marginBottom: 10
            }} />
            <p style={{ margin: '0 0 15px 0', fontSize: 16, color: '#666' }}>
              <strong>0</strong> / {goal.target} {goal.unit}
            </p>
            <div style={{
              background: '#fff3e0',
              padding: 15,
              borderRadius: 8,
              marginBottom: 15,
              color: '#e65100'
            }}>
              ℹ️ Füge dieses Ziel hinzu, um deinen Fortschritt zu verfolgen!
            </div>
            <button
              onClick={handleAddGoal}
              style={{
                padding: '12px 30px',
                background: '#128b09',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 16
              }}
            >
              + Zu meinen Zielen hinzufügen
            </button>
            
            {/* Für Partner-Ziele: Freund hinzufügen oder anzeigen */}
            {goal.label === 'Partner' && (
              selectedPartner ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  marginTop: 15,
                  padding: '10px 20px',
                  background: '#e3f2fd',
                  borderRadius: 10
                }}>
                  <img
                    src={selectedPartner.picture}
                    alt={selectedPartner.title}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <span style={{ fontWeight: 'bold', color: '#1976D2' }}>
                    {selectedPartner.title}
                  </span>
                  <button
                    onClick={() => setSelectedPartner(null)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer',
                      fontSize: 18,
                      padding: '0 5px'
                    }}
                    title="Partner entfernen"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowPartnerPopup(true)}
                  style={{
                    padding: '12px 30px',
                    background: '#2196F3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 10
                  }}
                >
                  👥 Freund hinzufügen
                </button>
              )
              </button>
            )}
          </div>
          
        )}
      </div>

      {/* Tipps */}
      {goal.tips && goal.tips.length > 0 && (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#128b09' }}>
            💡 Tipps zum Erreichen
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {goal.tips.map((tip, index) => (
              <li key={index} style={{ 
                marginBottom: 10, 
                color: '#555',
                lineHeight: 1.5
              }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Kategorie & Info */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <span style={{ color: '#999', fontSize: 12 }}>Kategorie</span>
            <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{goal.category}</p>
          </div>
          <div>
            <span style={{ color: '#999', fontSize: 12 }}>Label</span>
            <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{goal.label}</p>
          </div>
          <div>
            <span style={{ color: '#999', fontSize: 12 }}>Einheit</span>
            <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{goal.unit}</p>
          </div>
          {goal.createdAt && (
            <div>
              <span style={{ color: '#999', fontSize: 12 }}>Gestartet am</span>
              <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>
                {new Date(goal.createdAt).toLocaleDateString('de-DE')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Aktionen */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            flex: 1,
            padding: '12px 20px',
            background: '#fff',
            color: '#128b09',
            border: '2px solid #128b09',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← Zurück
        </button>
        {isActive && (
          <button
            onClick={() => setIsDeleteOpen(true)} //{handleDelete}
            style={{
              padding: '12px 20px',
              background: '#fff',
              color: '#f44336',
              border: '2px solid #f44336',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🗑️ Löschen
          </button>
        )}
      </div>
      <Delete 
	  		isOpen={isDeleteOpen} 
			onClose={() => setIsDeleteOpen(false)} 
			goal={goal}
		/>
    </div>
  );
}