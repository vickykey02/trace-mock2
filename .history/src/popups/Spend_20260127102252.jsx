import { useNavigate } from 'react-router-dom';
//import {Rewards} from '../pages/Rewards.jsx';

const Spend = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  //const reward = Rewards; 

  if (!isOpen) return null;

  const handleSpend = () => {
    navigate('/spend');
	//onRedeem(reward);
	//eigentlich sollte sich hier ein weiteres popup öffnen, das sagt, 
	//dass der Gutscheincode per Mail kommt und auch erst dann sollten die Punkte abgezogen werden
    onClose();
  };

  const handleKeep = () => {
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
        borderRadius: '8px',
        maxWidth: '300px',
        width: '80%',
        textAlign: 'center',
      }} onClick={(e) => e.stopPropagation()}>
        <h2>Möchtest du diese Belohnung wirklich einlösen?</h2>
        <button onClick={handleSpend} style={{
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
          Einlösen
        </button>
        <button onClick={handleKeep} style={{
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
          Abbrechen
        </button>
      </div>
    </div>
  );
};

export default Spend;