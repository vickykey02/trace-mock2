import { useState } from 'react';
import KnowledgeBite from '../components/KnowledgeBite';
import { useKnowledge } from '../context/KnowledgeContext';
import { Link } from 'react-router-dom';

const Knowledgebase2 = () => {
  const { knowledge: allKnowledge } = useKnowledge();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Berechne den Tag des Jahres (0-364)
  const getTodaysContent = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((date - startOfYear) / 1000 / 60 / 60 / 24);
    return allKnowledge[dayOfYear % allKnowledge.length];
  };

  const currentKnowledge = getTodaysContent(currentDate);

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = currentDate.toDateString() === new Date().toDateString();

  return (
    <div style={{ padding: '30px', paddingBottom: '100px' }}>
      <h1>Wissen des Tages</h1>

      {/* Likes Button */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/likes" style={{ textDecoration: 'none' }}>
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
              gap: '10px',
            }}
          >
            <img src="/favorite.png" alt="Gelikete Inhalte" style={{ width: '24px', height: '24px' }} />
            Gelikete Inhalte
          </button>
        </Link>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
      }}>
        <button
          onClick={goToPreviousDay}
          style={{
            backgroundColor: '#128b09ff',
            color: '#fff',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          ← Zurück
        </button>

        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
            {isToday ? 'Heute' : 'Datum'}
          </p>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
            {currentDate.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        <button
          onClick={goToNextDay}
          style={{
            backgroundColor: '#128b09ff',
            color: '#fff',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Vor →
        </button>
      </div>

      {/* Zurück zu heute Button */}
      {!isToday && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button
            onClick={goToToday}
            style={{
              backgroundColor: '#4abc96',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Zurück zu heute
          </button>
        </div>
      )}

      {/* Wissensbissen des Tages */}
      <div style={{ marginTop: '20px' }}>
        {currentKnowledge && (
          <KnowledgeBite knowledge={currentKnowledge} />
        )}
      </div>
    </div>
  );
};

export default Knowledgebase2;