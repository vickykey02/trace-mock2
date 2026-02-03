//noch stylen aber viel mehr Inhalt ist nicht notwendig
import { useNavigate } from 'react-router-dom';

const SpendPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Erfolg</h1>
      <p>Dein Code so wie alle Hinweise zur Einlösung werden dir per Mail geschickt.</p>
      <p>Du wirst in Kürze zurück zur Startseite geleitet.</p>
      setTimeout(() => {
        navigate('/home');
      }, 5000);
    </div>
  );
};

export default SpendPage;