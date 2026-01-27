import { useFavorites } from '../context/FavoritesContext';

const AddButton = ({ actionId }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(actionId);

  const handleToggle = () => {
    toggleFavorite(actionId);
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        backgroundColor: isFav ? '#ff6b6b' : '#f0f0f0',
        color: isFav ? '#fff' : '#333',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.2s'
      }}
      title={isFav ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
    >
      <span style={{ fontSize: '16px' }}>
        {isFav ? '❤️' : '🤍'}
      </span>
      {isFav ? 'Favorit' : 'Favorit +'}
    </button>
  );
};

export default AddButton;
          width: '100%',
          padding: '15px',
          backgroundColor: isAdded ? '#999' : '#128b09ff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '20px',
        }}
      >
        {isAdded ? '✓ Hinzugefügt' : 'Handlung hinzufügen'}
		{/*hier muss noch die Logik rein, die die Handlung in das Nutzerprofil hinzufügt*/}
      </button>
	</div>
  );
}