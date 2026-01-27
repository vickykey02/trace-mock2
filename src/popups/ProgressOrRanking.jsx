import { useNavigate } from 'react-router-dom';

const ProgressOrRanking = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleProgress = () => {
    navigate('/progress');
    onClose();
  };

  const handleRanking = () => {
    navigate('/ranking');
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
        borderRadius: '8px',
        maxWidth: '300px',
        width: '80%',
        textAlign: 'center',
      }} onClick={(e) => e.stopPropagation()}>
        <h2>Wähle eine Option</h2>
        <button onClick={handleProgress} style={{
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
          Erfolge
        </button>
        <button onClick={handleRanking} style={{
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
          Rangliste
        </button>
        <button onClick={onClose} style={{
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
        </button>
      </div>
    </div>
  );
};


export default ProgressOrRanking;