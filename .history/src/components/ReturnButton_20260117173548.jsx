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
		position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        zIndex: 1500,
        padding: '0',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title="Zurück"
    >
      <img
        src="/previous.png"
        alt="Zurück"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '4px',
        }}
      />
    </button>
  );
};

export default ReturnButton;