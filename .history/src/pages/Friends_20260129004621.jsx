//noch komplett aufbauen


import { useState } from 'react';
import Friend from '../components/Friend';
import { useFriends } from '../context/FriendsContext';
import { Link } from 'react-router-dom';

const Friends = () => {
  const { friends: allFriends } = useFriends();

  console.log('Friends - ALL_FRIENDS:', allFriends);

  const [searchTerm, setSearchTerm] = useState('');
  //const [selectedCategories, setSelectedCategories] = useState([]);
  //const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  return (
    <div style={{ padding: '30px', paddingBottom: '100px' }}>
      <h1>Freunde finden</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {/* Remembered Button */}
        <Link to="/remember" style={{ flex: 1, textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: '#128b09ff',
              color: '#fff',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
            }}
          >
            <img src="/favouriteheart.png" alt="Gefundene Freunde" style={{ width: '24px', height: '24px' }} />
            gefundene Freunde
          </button>
        </Link>

        {/* Tipp Submission Button */}
        <Link to="/submit" style={{ flex: 1, textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: '#128b09ff',
              color: '#fff',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
            }}
          >
            <img src="/submit.png" alt="Freund hinzufügen" style={{ width: '24px', height: '24px' }} />
            Freund hinzufügen
          </button>
        </Link>
      </div>

      {/* Suchleiste */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Suche nach Schlagwörtern..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxSizing: 'border-box',
            marginBottom: '10px'
          }}
        />
      </div>


      {/* Freunde Liste */}
      {allFriends.length > 0 ? (
        allFriends.map(friend => (
          <Friend key={friend.id} friend={friend} />
        ))
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999'
        }}>
          <p>Keine Freunde gefunden. Versuchen Sie andere Suchbegriffe oder Filter.</p>
        </div>
      )}
    </div>
  );
};

export default Friends;


