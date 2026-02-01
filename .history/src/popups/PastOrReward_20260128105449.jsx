import { useNavigate } from 'react-router-dom';

const PastOrReward = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePast = () => {
    navigate('/past');
    onClose();
  };

  const handleReward = () => {
    navigate('/rewards');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        marginTop: '350px', //wenn mit Abbrechen Button 300px
        marginLeft: '50px',
        marginRight: '50px',
        borderRadius: '8px',
        maxWidth: '300px',
        width: '80%',
        textAlign: 'center',
      }} onClick={(e) => e.stopPropagation()}>
        <h3>Rückblick</h3> {/*besseren Namen finden*/}
        <button onClick={handlePast} style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          backgroundColor: '#4abc96',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          Verlauf
        </button>
        <button onClick={handleReward} style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          backgroundColor: '#4abc96',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          Belohnungen
        </button>
        {/*<button onClick={onClose} style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          backgroundColor: '#ccc',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          Abbrechen
        </button>*/}
      </div>
    </div>
  );
};

export default PastOrReward;