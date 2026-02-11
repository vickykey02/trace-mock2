import { useNavigate } from 'react-router-dom';

const ScanMethod = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleScan = () => {
    navigate('/scan');
    onClose();
  };

  const handleContribute = () => {
    navigate('/contribute');
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
        marginTop: '350px', //wenn mit Abbrechen Button 300px
        marginLeft: '50px',
        marginRight: '50px',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '300px',
        width: '80%',
        textAlign: 'center',
      }} onClick={(e) => e.stopPropagation()}>
        <h3>Handlung hinzufügen</h3>
        <button onClick={handleScan} style={{
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
          Scan
        </button>
        <button onClick={handleContribute} style={{
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
          manuell eintragen
        </button>
        {/*<button onClick={onClose} style={{   //Abbrechen Button muss eig nicht sein
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

export default ScanMethod;