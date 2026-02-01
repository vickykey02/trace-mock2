import { useNavigate } from 'react-router-dom';
import FollowButton from './FollowButton';

const Friend = ({ friend }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/friend-detail/${friend.id}`, { state: { friend } });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: '#fff',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      {/* Profilbild in der rechten oberen Ecke */}
      <img 
        src={friend.picture} 
        alt={friend.title} 
        style={{ 
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #128b09ff'
        }} 
      />
      <div style={{ paddingRight: '60px' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#128b09ff' }}>{friend.title}</h3>
        <p style={{ margin: '0 0 8px 0', color: '#666' }}>{friend.bio}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
		<div onClick={(e) => e.stopPropagation()}>
        	<FollowButton friendId={friend.id} />
		</div>
      </div>
    </div>
  );
};

export default Friend;