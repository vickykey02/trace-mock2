import { useState } from 'react';

const KnowledgeBase = () => {
  // Beispieldaten für tägliches Wissen
  const knowledgeData = [
    {
      date: '2026-01-11',
      display: 'Heute',
      title: 'Umweltfreundliche Alternativen zu Plastik',
      content: 'Wussten Sie, dass Bambus-Zahnbürsten eine großartige Alternative zu Plastik sind? Sie sind biologisch abbaubar und wachsen schnell nach. Probieren Sie es aus!'
    },
    {
      date: '2026-01-10',
      display: 'Gestern',
      title: 'Recycling-Tipps für den Alltag',
      content: 'Trennen Sie Ihre Abfälle richtig: Plastik, Papier und Glas sollten getrennt entsorgt werden. So tragen Sie aktiv zur Umwelt bei.'
    },
    {
      date: '2026-01-09',
      display: '09.01.',
      title: 'Energie sparen im Haushalt',
      content: 'Schalten Sie Geräte aus, wenn Sie sie nicht benutzen. LED-Lampen verbrauchen 75% weniger Energie als Glühlampen.'
    },
    {
      date: '2026-01-08',
      display: '08.01.',
      title: 'Nachhaltige Ernährung',
      content: 'Essen Sie mehr lokale und saisonale Produkte. Das reduziert Transportemissionen und unterstützt lokale Bauern.'
    },
    {
      date: '2026-01-07',
      display: '07.01.',
      title: 'Wasser sparen',
      content: 'Nehmen Sie kürzere Duschen und reparieren Sie tropfende Wasserhähne. Jeder Tropfen zählt für unsere Erde.'
    }
  ];

  const [selectedDay, setSelectedDay] = useState(0);
  const [likes, setLikes] = useState({});

  const toggleLike = (date) => {
    setLikes(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const currentData = knowledgeData[selectedDay];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Knowledge Base</h1>

      {/* Tag-Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {knowledgeData.map((day, index) => (
          <button
            key={day.date}
            onClick={() => setSelectedDay(index)}
            style={{
              padding: '10px 15px',
              margin: '5px',
              border: selectedDay === index ? '2px solid #128b09ff' : '1px solid #ccc',
              backgroundColor: selectedDay === index ? '#e8f5e8' : '#fff',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {day.display}
          </button>
        ))}
      </div>

      {/* Inhalt */}
      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>{currentData.title}</h2>
        <p>{currentData.content}</p>
      </div>

      {/* Like-Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => toggleLike(currentData.date)}
          style={{
            padding: '10px 20px',
            backgroundColor: likes[currentData.date] ? '#ff6b6b' : '#f0f0f0',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '0 auto'
          }}
        >
          <span style={{ fontSize: '20px' }}>
            {likes[currentData.date] ? '❤️' : '🤍'}
          </span>
          Gefällt mir
        </button>
      </div>
    </div>
  );
};

export default KnowledgeBase;