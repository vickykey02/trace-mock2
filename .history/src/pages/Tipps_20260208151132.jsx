//Icon gemerke Tipps oder merken überdenken

import { useState } from 'react';
import Tipp from '../components/Tipp';
import { useTipps } from '../context/TippsContext';
import { Link } from 'react-router-dom';

const Tipps = () => {
  const { tipps: allTipps } = useTipps();

  console.log('Tipps - ALL_TIPPS:', allTipps);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Unique Kategorien aus den Daten
  const categories = [...new Set(allTipps.map(tipp => tipp.category))];

  // Filterfunktion
  const filteredTipps = allTipps.filter(tipp => {
    const matchesSearch = searchTerm === '' || 
      tipp.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tipp.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(tipp.category);

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
      <h1>Tipps & Tricks</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {/* Remembered Button */}
        <Link to="/remember" style={{ flex: 1, textDecoration: 'none' }}>
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
              width: '100%',
            }}
          >
            {/*<img src="/favouriteheart.png" alt="Gemerkte Tipps" style={{ width: '24px', height: '24px' }} />*/}
            🗂️ gemerkte Tipps
          </button>
        </Link>

        {/* Tipp Submission Button */}
        <Link to="/submit" style={{ flex: 1, textDecoration: 'none' }}>
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
              width: '100%',
            }}
          >
            <img src="/submit.png" alt="Tipp einreichen" style={{ width: '24px', height: '24px' }} />
            Tipp einreichen
          </button>
        </Link>
      </div>

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
        {filteredTipps.length} Tipps gefunden
      </p>

      {/* Tipps Liste */}
      {filteredTipps.length > 0 ? (
        filteredTipps.map(tipp => (
          <Tipp key={tipp.id} tipp={tipp} />
        ))
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999'
        }}>
          <p>Keine Tipps gefunden. Versuchen Sie andere Suchbegriffe oder Filter.</p>
        </div>
      )}
    </div>
  );
};

export default Tipps;
