import { useState } from 'react';

const AddButton = ({action}) => {
  const [isAdded, setIsAdded] = useState(false);

  return (
	<button
        onClick={() => setIsAdded(!isAdded)}
        style={{
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
  );
}