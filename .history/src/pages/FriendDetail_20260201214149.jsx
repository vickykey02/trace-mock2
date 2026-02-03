//ausbauen mit Karte, Zielen, eingereichten Tipps usw.

import { useParams } from 'react-router-dom';
//import LocationMap from '../components/LocationMap';
import FollowButton from '../components/FollowButton';
import { useFriends } from '../context/FriendsContext';

const FriendDetail = () => {
  const { id } = useParams();
  const { friends } = useFriends();
  
  const friend = friends.find(f => f.id === parseInt(id));
  if (!friend) {
    return <div style={{ padding: '20px' }}>Freund nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>

	  {/* Profilbild */}
      <div style={{
        width: '85px',
        height: '85px',
        borderRadius: '50%',
        backgroundColor: '#128b09',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
		marginLeft: '30px',
        marginRight: '12px',
		marginTop: '20px',
        overflow: 'hidden',
      }}>
        {friend.picture ? (
          <img 
            src={friend.picture} 
            alt={friend.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `<span style="color: white; font-weight: bold; font-size: 18px">${friend.title?.charAt(0) || '?'}</span>`;
            }}
          />
        ) : (
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
            {friend.title?.charAt(0) || '?'}
          </span>
        )}
      </div>
	  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
		<h3 style={{ margin: 0, marginTop: '-135px', marginLeft: '130px' }}>{friend.title}</h3>
      </div>

	  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
		<p style={{ margin: 0, marginTop: '-100px', marginLeft: '130px', textAlign: 'center', lineHeight: '1.2' }}>
          <strong>{friend.followers}</strong><br/>
          Follower
        </p>
      </div>

	  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
		<p style={{ margin: 0, marginTop: '-140px', marginLeft: '230px', textAlign: 'center', lineHeight: '1.2' }}>
          <strong>{friend.follows}</strong><br/>
          Gefolgt
        </p>
      </div>

	   {/* Beschreibung */}
      <div style={{ marginTop: '-20px', marginLeft: '30px', marginRight: '30px' }}>
        <p>{friend.bio}</p>
      </div>

		<div style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
			<FollowButton friendId={friend.id} />
		</div>

      {/* Informationen */}
      <div style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p><strong>Folgt:</strong> {friend.follows}</p>
        <p><strong>Follower:</strong> {friend.followers}</p>
        <p><strong>Punkte:</strong> {friend.points}</p>
      </div>

    </div>
  );
};

export default FriendDetail;
