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
    <div style={{ padding: '25px', paddingBottom: '100px' }}>
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
			<div key={action.id}>
            	<ActionCard action={action} />
				{/*<AddButton id={action.id} />*/}
          </div>
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
