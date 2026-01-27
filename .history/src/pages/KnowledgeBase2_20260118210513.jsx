import { useState } from 'react';
import KnowledgeBite from '../components/KnowledgeBite';
import { useKnowledge } from '../context/KnowledgeContext';

const Knowledgebase2 = () => {
  const { knowledge: allKnowledge } = useKnowledge();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Unique Kategorien aus den Daten
  const categories = [...new Set(allKnowledge.map(knowledge => knowledge.category))];

  // Filterfunktion
  const filteredKnowledge = allKnowledge.filter(knowledge => {
    const matchesSearch = searchTerm === '' || 
      knowledge.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
      knowledge.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(knowledge.category);

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
      <h1>Wissen erkunden</h1>

	  button

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
        {filteredKnowledge.length} Wissenshappen gefunden
      </p>

      {/* Wissenshappen Liste */}
      {filteredKnowledge.length > 0 ? (
        filteredKnowledge.map(knowledge => (
          <KnowledgeBite key={knowledge.id} knowledge={knowledge} />
        ))
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999'
        }}>
          <p>Keine Wissenshappen gefunden. Versuchen Sie andere Suchbegriffe oder Filter.</p>
        </div>
      )}
    </div>
  );
};

export default Knowledgebase2;