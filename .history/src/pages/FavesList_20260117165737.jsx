import { useFavorites } from '../context/FavoritesContext';
import ActionCard from '../components/ActionCard';

const FavesList = () => {
  const { favorites } = useFavorites();

  // Alle verfügbaren Handlungen
  const allActions = [
    {
      id: 1,
      title: 'Unverpackt kaufen',
      description: 'Einkaufen mit eigenen Behältnissen',
      category: 'Shopping',
      keywords: ['plastik', 'einkaufen', 'umwelt', 'shopping']
    }
  ];

  // Filter: Nur die favorisierten Handlungen anzeigen
  const favoriteActions = allActions.filter(action => favorites.includes(action.id));

  if (favoriteActions.length === 0) {
    return (
      <div style={{ padding: '20px', paddingBottom: '100px' }}>
        <h1>Favoriten</h1>
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999'
        }}>
          <p>Du hast noch keine Favoriten. Klicke auf den ❤️ Button, um eine Handlung zu favorisieren!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h1>Favoriten</h1>
      <p style={{ color: '#666', marginBottom: '15px' }}>
        {favoriteActions.length} Favorit(e) gefunden
      </p>

      {/* Favoriten Liste */}
      <div>
        {favoriteActions.map(action => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
};

export default FavesList;
