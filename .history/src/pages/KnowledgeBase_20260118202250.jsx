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
      title: 'Hier soll eine Planet-N Story rein',
      content: 'Diese interaktive Story zeigt Dilemmas im Umweltschutz auf und regt zum Nachdenken an.'
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

import { useState } from 'react';
import ActionCard from '../components/ActionCard';
import { useActions } from '../context/ActionsContext';

const Explore = () => {
  const { actions: allActions } = useActions();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Unique Kategorien aus den Daten
  const categories = [...new Set(allActions.map(action => action.category))];

  // Filterfunktion
  const filteredActions = allActions.filter(action => {
    const matchesSearch = searchTerm === '' || 
      action.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
      action.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(action.category);

    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div style={{ padding: '30px', paddingBottom: '100px' }}>
      <h1>Handlungen erkunden</h1>

      {/* Suchleiste */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Suche nach Schlagwörtern..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxSizing: 'border-box',
            marginBottom: '10px'
          }}
        />

        {/* Filter Button */}
        <button
          onClick={() => setShowCategoryFilter(!showCategoryFilter)}
          style={{
            backgroundColor: '#128b09ff',
            color: '#fff',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%'
          }}
        >
          {showCategoryFilter ? '▼ Filter ausblenden' : '▶ Filter zeigen'}
        </button>
      </div>

      {/* Kategorien Filter */}
      {showCategoryFilter && (
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <h3>Kategorien:</h3>
          {categories.map(category => (
            <label key={category} style={{ display: 'block', marginBottom: '10px' }}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              />
              {category}
            </label>
          ))}
        </div>
      )}

      {/* Ergebnisanzahl */}
      <p style={{ color: '#666', marginBottom: '15px' }}>
        {filteredActions.length} Handlung(en) gefunden
      </p>

      {/* Aktionen Liste */}
      {filteredActions.length > 0 ? (
        filteredActions.map(action => (
          <ActionCard key={action.id} action={action} />
        ))
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999'
        }}>
          <p>Keine Handlungen gefunden. Versuchen Sie andere Suchbegriffe oder Filter.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
