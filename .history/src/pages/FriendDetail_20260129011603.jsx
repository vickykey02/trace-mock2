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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
		<h1 style={{ margin: 0, marginTop: '35px' }}>{friend.title}</h1>
        <FollowButton friendId={friend.id} />
      </div>

      {/* Beschreibung */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Bio</h2>
        <p>{friend.bio}</p>
      </div>

      {/* Informationen */}
      <div style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p><strong>Folgt:</strong> {friend.follows}</p>
        <p><strong>Follower:</strong> {friend.follower}</p>
        <p><strong>Punkte:</strong> {friend.points}</p>
        <p><strong>Bild:</strong> {friend.picture}</p>
      </div>

      {/* Tipps */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Tipps zum Umsetzen:</h3>
        <ul>
          {friend.friends.map((friendItem, index) => (
            <li key={index}>{friendItem}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default FriendDetail;
