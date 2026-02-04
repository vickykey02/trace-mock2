import { useNavigate } from 'react-router-dom';
import { useGoals } from '../context/GoalsContext';

const Delete = ({ isOpen, onClose, goal, onRedeem }) => {
  const navigate = useNavigate();
  const { removeGoal } = useGoals();

  if (!isOpen) return null;

  const handleDelete = () => {
    navigate('/goals');
	removeGoal(goal.id);
    onClose();
  };

  const handleKeep = () => {
    navigate('/goals');
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
        <h2>Möchtest du dieses Ziel wirklich löschen?</h2>
        <button onClick={handleDelete} style={{
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
          Löschen
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

export default Delete;