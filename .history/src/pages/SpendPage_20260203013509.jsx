//noch stylen aber viel mehr Inhalt ist nicht notwendig
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
    <div>
      <h1>Erfolg</h1>
      <p>Dein Code so wie alle Hinweise zur Einlösung werden dir per Mail geschickt.</p>
      <p>Du wirst in Kürze zurück zur Startseite geleitet.</p>
    </div>
  );
};

export default SpendPage;