import { useState } from 'react';
import ActionCard from '../components/ActionCard';

const Explore = () => {
  // Beispieldaten für Handlungen
  const allActions = [
    {
      id: 1,
      title: 'Unverpackt kaufen',
      description: 'Einkaufen mit eigenen Behältnissen',
      category: 'Shopping',
      keywords: ['plastik', 'einkaufen', 'umwelt', 'shopping']
    },
    /*{
      id: 2,
      title: 'Bäume pflanzen',
      description: 'Pflanzen Sie einen Baum in Ihrer Gemeinde und kümmern Sie sich um ihn',
      category: 'Natur',
      keywords: ['baum', 'natur', 'grün', 'umwelt', 'pflanzen']
    },
    {
      id: 3,
      title: 'Wasser sparen',
      description: 'Dusch dich kürzer und repariere tropfende Wasserhähne',
      category: 'Energie',
      keywords: ['wasser', 'energie', 'sparen', 'haushalt']
    },
    {
      id: 4,
      title: 'Recycling',
      description: 'Trenne deinen Müll korrekt und recycele wo möglich',
      category: 'Abfall',
      keywords: ['recycling', 'müll', 'abfall', 'umwelt']
    },
    {
      id: 5,
      title: 'Nachhaltige Mode',
      description: 'Kaufe Second-Hand Kleidung oder nachhaltige Labels',
      category: 'Shopping',
      keywords: ['mode', 'kleidung', 'shopping', 'nachhaltig']
    },
    {
      id: 6,
      title: 'Fahrrad fahren',
      description: 'Nutze dein Fahrrad statt das Auto für kurze Strecken',
      category: 'Mobilität',
      keywords: ['fahrrad', 'mobilität', 'transport', 'co2']
    },
    {
      id: 7,
      title: 'LED-Lampen',
      description: 'Wechsle zu LED-Lampen und spare bis zu 75% Energie',
      category: 'Energie',
      keywords: ['lampe', 'energie', 'strom', 'sparen']
    },
    {
      id: 8,
      title: 'Lokale Produkte',
      description: 'Kaufe Produkte von lokalen Bauern und Herstellern',
      category: 'Ernährung',
      keywords: ['lokal', 'produkte', 'bauern', 'regional']
    }*/
  ];

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
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
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
        <div>
          {filteredActions.map(action => (
            <ActionCard key={action.id} action={action} />
          ))}
        </div>
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
