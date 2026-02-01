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
        padding: '10px 15px',
        marginBottom: '10px',
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
      {/* Rechte Seite: Profilbild und Follow-Button */}
      <div style={{ 
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px'
      }}>
        <img 
          src={friend.picture} 
          alt={friend.title} 
          style={{ 
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #128b09ff'
          }} 
        />
        <div onClick={(e) => e.stopPropagation()}>
          <FollowButton friendId={friend.id} compact />
        </div>
      </div>
      <div style={{ paddingRight: '70px' }}>
        <h3 style={{ margin: '0 0 4px 0', color: '#128b09ff', fontSize: '15px' }}>{friend.title}</h3>
        <p style={{ 
          margin: 0, 
          color: '#666', 
          fontSize: '13px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.4'
        }}>{friend.bio}</p>
      </div>
    </div>
  );
};

export default Friend;