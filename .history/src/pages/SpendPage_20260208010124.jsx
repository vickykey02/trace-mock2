//evtl. noch aufhübschen
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpendPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);

    // Cleanup: Timer abbrechen wenn Komponente unmountet
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      //style={{ padding: '30px' }}>
      style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '50px', 
        marginBottom: '20px',
      }}>
      <h1>Erfolg</h1>
      <p>Dein Code so wie alle Hinweise zur Einlösung werden dir per Mail geschickt.</p>
      <p>Du wirst in Kürze zurück zur Startseite geleitet.</p>
    </div>
  );
};

export default SpendPage;