import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoals, PRESET_GOALS, FRIEND_GOALS } from '../context/GoalsContext';

const CATEGORIES = ['Shopping', 'Natur', 'Energie', 'Abfall', 'Mobilität', 'Ernährung'];

const NewGoal = () => {
  const navigate = useNavigate();
  const { addGoal, isGoalActive } = useGoals();
  const [activeTab, setActiveTab] = useState('preset'); // 'preset', 'friends', 'own'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Formular für eigenes Ziel
  const [ownGoal, setOwnGoal] = useState({
    title: '',
    description: '',
    target: '',
    unit: '',
    category: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Filtere Preset-Ziele nach Suchbegriff
  const filteredPresets = PRESET_GOALS.filter(goal =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtere Freunde-Ziele nach Suchbegriff
  const filteredFriends = FRIEND_GOALS.filter(goal =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (goal.createdBy && goal.createdBy.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddGoal = (goal) => {
    if (isGoalActive(goal.id)) {
      alert('Dieses Ziel ist bereits aktiv!');
      return;
    }
    addGoal(goal);
    setSubmitted(true);
    setTimeout(() => {
      navigate('/goals');
    }, 1500);
  };

  const handleOwnGoalSubmit = (e) => {
    e.preventDefault();
    
    if (!ownGoal.title || !ownGoal.target || !ownGoal.unit || !ownGoal.category) {
      alert('Bitte fülle alle Pflichtfelder aus');
      return;
    }

    const newGoal = {
      ...ownGoal,
      target: parseInt(ownGoal.target),
      type: 'own',
      tips: []
    };

    addGoal(newGoal);
    setSubmitted(true);
    setTimeout(() => {
      navigate('/goals');
    }, 1500);
  };

  if (submitted) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', paddingBottom: '100px' }}>
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '40px',
          borderRadius: '10px',
          border: '2px solid #128b09'
        }}>
          <p style={{ fontSize: '48px', margin: '0 0 20px 0' }}>✓</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#128b09', margin: '0 0 10px 0' }}>
            Ziel hinzugefügt!
          </p>
          <p style={{ color: '#666', margin: 0 }}>
            Du wirst weitergeleitet...
          </p>
        </div>
      </div>
    );
  }

  const tabStyle = (isActive) => ({
    flex: 1,
    padding: '12px 8px',
    border: 'none',
    background: isActive ? '#128b09' : '#f0f0f0',
    color: isActive ? '#fff' : '#666',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px',
    transition: 'all 0.2s'
  });

  const GoalCard = ({ goal, type }) => {
    const alreadyActive = isGoalActive(goal.id);
    
    return (
      <div style={{
        background: alreadyActive ? '#f5f5f5' : '#fff',
        border: '1px solid #ddd',
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        opacity: alreadyActive ? 0.6 : 1
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: 16 }}>{goal.title}</h3>
            <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: 13 }}>{goal.description}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span style={{
                background: '#e8f5e8',
                color: '#128b09',
                padding: '2px 8px',
                borderRadius: 10,
                fontSize: 11
              }}>
                {goal.category}
              </span>
              <span style={{
                background: '#f0f0f0',
                color: '#666',
                padding: '2px 8px',
                borderRadius: 10,
                fontSize: 11
              }}>
                Ziel: {goal.target} {goal.unit}
              </span>
              {type === 'friend' && goal.createdBy && (
                <span style={{
                  background: '#e3f2fd',
                  color: '#1976D2',
                  padding: '2px 8px',
                  borderRadius: 10,
                  fontSize: 11
                }}>
                  👤 {goal.createdBy}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => handleAddGoal(goal)}
            disabled={alreadyActive}
            style={{
              background: alreadyActive ? '#ccc' : '#128b09',
              color: '#fff',
              border: 'none',
              borderRadius: '10%',
              width: 36,
              height: 36,
              fontSize: 20,
              cursor: alreadyActive ? 'not-allowed' : 'pointer',
              marginLeft: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={alreadyActive ? 'Bereits aktiv' : 'Zu meinen Zielen hinzufügen'}
          >
            {alreadyActive ? '✓' : '+'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '30px 20px', paddingBottom: '100px', maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ margin: '30 0 20px 0', color: '#128b09' }}>Ziel hinzufügen</h1>

      {/* Tab-Navigation */}
      <div style={{ display: 'flex', borderRadius: '8px 8px 0 0', overflow: 'hidden', marginBottom: 0 }}>
        <button style={tabStyle(activeTab === 'preset')} onClick={() => setActiveTab('preset')}>
          🎯 Standard
        </button>
        <button style={tabStyle(activeTab === 'friends')} onClick={() => setActiveTab('friends')}>
          👥 Freunde
        </button>
        <button style={tabStyle(activeTab === 'own')} onClick={() => setActiveTab('own')}>
          ✏️ Eigenes
        </button>
      </div>

      {/* Tab-Inhalt */}
      <div style={{
        background: '#fff',
        border: '1px solid #ddd',
        borderTop: 'none',
        borderRadius: '0 0 8px 8px',
        padding: 15,
        minHeight: 300
      }}>
        
        {/* PRESET TAB */}
        {activeTab === 'preset' && (
          <>
            <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: 14 }}>
              Wähle aus vorgefertigten Zielen. Diese aktualisieren sich <strong>automatisch</strong>, wenn du die entsprechende Handlung einträgst.
            </p>
            <input
              type="text"
              placeholder="🔍 Ziele durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                border: '1px solid #ddd',
                borderRadius: 8,
                marginBottom: 15,
                boxSizing: 'border-box'
              }}
            />
            {filteredPresets.length > 0 ? (
              filteredPresets.map(goal => (
                <GoalCard key={goal.id} goal={goal} type="preset" />
              ))
            ) : (
              <p style={{ color: '#999', textAlign: 'center' }}>Keine Ziele gefunden</p>
            )}
          </>
        )}

        {/* FRIENDS TAB */}
        {activeTab === 'friends' && (
          <>
            <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: 14 }}>
              Ziele von deinen Freunden. Diese musst du <strong>manuell</strong> aktualisieren.
            </p>
            <input
              type="text"
              placeholder="🔍 Ziele oder Freunde suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                border: '1px solid #ddd',
                borderRadius: 8,
                marginBottom: 15,
                boxSizing: 'border-box'
              }}
            />
            {filteredFriends.length > 0 ? (
              filteredFriends.map(goal => (
                <GoalCard key={goal.id} goal={goal} type="friend" />
              ))
            ) : (
              <p style={{ color: '#999', textAlign: 'center' }}>Keine Ziele gefunden</p>
            )}
          </>
        )}

        {/* OWN TAB */}
        {activeTab === 'own' && (
          <>
            <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: 14 }}>
              Erstelle dein eigenes Ziel. Du kannst den Fortschritt <strong>manuell</strong> aktualisieren.
            </p>
            <form onSubmit={handleOwnGoalSubmit}>
              {/* Titel */}
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5, fontSize: 14 }}>
                  Titel *
                </label>
                <input
                  type="text"
                  value={ownGoal.title}
                  onChange={(e) => setOwnGoal({ ...ownGoal, title: e.target.value })}
                  placeholder="z.B. Plastikfrei im Bad"
                  style={{
                    width: '100%',
                    padding: 10,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Beschreibung */}
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5, fontSize: 14 }}>
                  Beschreibung
                </label>
                <textarea
                  value={ownGoal.description}
                  onChange={(e) => setOwnGoal({ ...ownGoal, description: e.target.value })}
                  placeholder="Was möchtest du erreichen?"
                  style={{
                    width: '100%',
                    padding: 10,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    boxSizing: 'border-box',
                    minHeight: 80,
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Kategorie */}
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5, fontSize: 14 }}>
                  Kategorie *
                </label>
                <select
                  value={ownGoal.category}
                  onChange={(e) => setOwnGoal({ ...ownGoal, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: 10,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    boxSizing: 'border-box',
                    background: '#fff'
                  }}
                >
                  <option value="">-- Kategorie wählen --</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Zielwert und Einheit */}
              <div style={{ display: 'flex', gap: 15, marginBottom: 15 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5, fontSize: 14 }}>
                    Zielwert *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={ownGoal.target}
                    onChange={(e) => setOwnGoal({ ...ownGoal, target: e.target.value })}
                    placeholder="z.B. 10"
                    style={{
                      width: '100%',
                      padding: 10,
                      border: '1px solid #ddd',
                      borderRadius: 8,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5, fontSize: 14 }}>
                    Einheit *
                  </label>
                  <input
                    type="text"
                    value={ownGoal.unit}
                    onChange={(e) => setOwnGoal({ ...ownGoal, unit: e.target.value })}
                    placeholder="z.B. Tage, Mal, Stück"
                    style={{
                      width: '100%',
                      padding: 10,
                      border: '1px solid #ddd',
                      borderRadius: 8,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: 15,
                  background: '#128b09',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 'bold',
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Ziel erstellen
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewGoal;