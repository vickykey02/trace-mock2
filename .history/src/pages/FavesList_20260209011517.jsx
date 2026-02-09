import { useFavorites } from '../context/FavoritesContext';
import { useActions } from '../context/ActionsContext';
import ActionCard from '../components/ActionCard';
import PageHeader from '../components/PageHeader';

const FavesList = () => {
  const { favorites } = useFavorites();
  const { actions } = useActions();

  // Debug
  console.log('FavesList - Favoriten:', favorites);
  console.log('FavesList - Actions:', actions);

  // Filter: Nur die favorisierten Handlungen anzeigen
  const favoriteActions = actions.filter(action => favorites.includes(action.id));
  
  console.log('FavesList - Gefilterte Favoriten:', favoriteActions);

  if (favoriteActions.length === 0) {
    return (
      <div style={{ padding: '30px', paddingBottom: '100px' }}>
        <PageHeader title="Favorisierte Handlungen" />
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999'
        }}>
          <p>Du hast noch keine Favoriten. Klicke auf den  Button, um eine Handlung zu favorisieren!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', paddingBottom: '100px' }}>
      <h1>Favoriten</h1>
      <p style={{ color: '#666', marginBottom: '15px' }}>
        {favoriteActions.length} Favorit(en) gefunden
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
