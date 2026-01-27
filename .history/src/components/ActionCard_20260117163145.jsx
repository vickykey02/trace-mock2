import { useNavigate } from 'react-router-dom';

const ActionCard = ({ action }) => {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    navigate(`/action/${action.id}`, { state: { action } });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: '#fff',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', color: '#128b09ff' }}>{action.title}</h3>
      <p style={{ margin: '0 0 8px 0', color: '#666' }}>{action.description}</p>
      <span
        style={{
          display: 'inline-block',
          backgroundColor: '#e8f5e8',
          color: '#128b09ff',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {action.category}
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
      </span>
    </div>
  );
};

export default ActionCard;
