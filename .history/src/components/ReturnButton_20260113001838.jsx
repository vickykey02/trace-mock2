import { useNavigate, useLocation } from 'react-router-dom';

const ReturnButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Zeige den Button nicht auf der Home-Seite
  if (location.pathname === '/' || location.pathname === '/home') {
    return null;
  }

  const handleBack = () => {
    navigate(-1); // Geht zur vorherigen Seite zurück
  };

  return (
    <button
      onClick={handleBack}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
		img src: '/back.png' alt: 'Zurück',
        /*backgroundColor: '#128b09ff',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        zIndex: 1500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',*/
      }}
	  
      title="Zurück"
    >
      ←
    </button>
  );
};

export default ReturnButton;