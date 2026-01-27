import { useState } from 'react';

const AddButton = ({id}) => {
  const [isAdded, setIsAdded] = useState(false);

  return (
	 style={
        backgroundColor: '#fff',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }
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