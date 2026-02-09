import { useFavorites } from '../context/FavoritesContext';

const AddButton2 = ({ actionId, style }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(actionId);

  const handleToggle = () => {
	toggleFavorite(actionId);
  };

  return (
	<button
	  onClick={handleToggle}
	  style={{
		//backgroundColor: isFav ? '#ff6b6b' : '#f0f0f0',
		//color: isFav ? '#fff' : '#333',
		background: 'transparent',
		padding: '10px 15px',
		border: 'none',
		outline: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		fontSize: '14px',
		fontWeight: 'bold',
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		transition: 'background-color 0.2s',
		...style
	  }}
	  title={isFav ? 'Von Merkliste entfernen' : 'Zur Merkliste hinzufügen'}
	>
	  <span style={{ fontSize: '46px', color: isFav ? '#128b09' : '#333' }}>
		{isFav ? '★' : '☆'} 
	  </span>
	</button>
  );
};

export default AddButton2;