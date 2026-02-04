//evtl. wenn noch viel Zeit Profile klickbar machen (aber alle das selbe und nur Name usw. je anpassen)
//evtl. noch verschönern wenn Rangliste deaktiviert ist (Schloss, Anleitung wie aktivieren usw.)

import { useState } from 'react';
import { usePoints } from '../context/PointsContext';
import { useFriends } from '../context/FriendsContext';
import { useFollow } from '../context/FollowContext';
import { useNavigate } from 'react-router-dom';

// Simulierte globale Nutzer für die Rangliste
const globalUsers = [
  { id: 'g1', title: 'GreenWarrior', points: 4850, picture: '/avatars/avatar1.png' },
  { id: 'g2', title: 'EcoChampion', points: 4200, picture: '/avatars/avatar2.png' },
  { id: 'g3', title: 'NatureLover', points: 3900, picture: '/avatars/avatar3.png' },
  { id: 'g4', title: 'ClimateHero', points: 3450, picture: '/avatars/avatar4.png' },
  { id: 'g5', title: 'SustainableSam', points: 2800, picture: '/avatars/avatar5.png' },
  { id: 'g6', title: 'TreeHugger', points: 2350, picture: '/avatars/avatar6.png' },
  { id: 'g7', title: 'PlanetProtector', points: 1950, picture: '/avatars/avatar7.png' },
  { id: 'g8', title: 'GreenThumb', points: 1600, picture: '/avatars/avatar8.png' },
  { id: 'g9', title: 'EcoMinded', points: 1200, picture: '/avatars/avatar9.png' },
  { id: 'g10', title: 'NatureNinja', points: 800, picture: '/avatars/avatar10.png' },
];

const RankingItem = ({ rank, user, isCurrentUser }) => {
  // Medaillen für Top 3
  const getMedal = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 15px',
      marginBottom: '8px',
      backgroundColor: isCurrentUser ? '#e8f5e8' : '#fff',
      border: isCurrentUser ? '2px solid #128b09' : '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }}>
      {/* Platz */}
      <div style={{
        width: '40px',
        fontSize: rank <= 3 ? '24px' : '18px',
        fontWeight: 'bold',
        color: rank <= 3 ? '#333' : '#666',
        textAlign: 'center'
      }}>
        {getMedal(rank)}
      </div>

      {/* Profilbild */}
      <div style={{
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        backgroundColor: '#128b09',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '12px',
        overflow: 'hidden',
        border: isCurrentUser ? '2px solid #128b09' : 'none'
      }}>
        {user.picture ? (
          <img 
            src={user.picture} 
            alt={user.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `<span style="color: white; font-weight: bold; font-size: 18px">${user.title?.charAt(0) || '?'}</span>`;
            }}
          />
        ) : (
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
            {user.title?.charAt(0) || '?'}
          </span>
        )}
      </div>

      {/* Name */}
      <div style={{ flex: 1 }}>
        <p style={{ 
          margin: 0, 
          fontWeight: isCurrentUser ? 'bold' : '500',
          fontSize: '16px',
          color: '#333'
        }}>
          {user.title} {isCurrentUser && '(Du)'}
        </p>
      </div>

      {/* Punkte */}
      <div style={{
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#128b09'
      }}>
        {parseInt(user.points).toLocaleString('de-DE')} Pkt.
      </div>
    </div>
  );
};

const Ranking = () => {
  const [view, setView] = useState('global'); // 'global' oder 'friends'
  const { points } = usePoints();
  const { friends } = useFriends();
  const { followed } = useFollow();
  const rankingDisabled = JSON.parse(localStorage.getItem('rankingDisabled') || 'false');
  const navigate = useNavigate();

  if (rankingDisabled) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => navigate('/personalization')}
          style={{ 
            flex: 1, 
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}>
          <img src="/setting.png" alt="settings" style={{ width: '24px', height: '24px' }} />
        </button>
        <p>Die Rangliste ist deaktiviert.</p>
      </div>
    );
  }

  // Aktueller Nutzer
  const currentUser = {
    id: 'me',
    title: 'Du',
    points: points,
    picture: 'headerbild_massentierhaltung.webp'
  };

  // Freunde filtern (nur die, denen man folgt)
  const followedFriends = friends.filter(friend => followed.includes(friend.id));

  // Rangliste erstellen
  const getRanking = () => {
    let users;
    
    if (view === 'global') {
      // Globale Rangliste: simulierte User + gefolgten Freunde + aktueller User
      users = [...globalUsers, ...followedFriends, currentUser];
    } else {
      // Freunde-Rangliste: nur Freunde denen man folgt + aktueller User
      users = [...followedFriends, currentUser];
    }

    // Nach Punkten sortieren (absteigend)
    return users.sort((a, b) => parseInt(b.points) - parseInt(a.points));
  };

  const ranking = getRanking();

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h1 style={{ textAlign: 'center', marginTop: 0 }}>Rangliste</h1>
      <button 
          onClick={() => navigate('/settings')}
          style={{ 
            flex: 1, 
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}>
          <img src="/setting.png" alt="settings" style={{ width: '24px', height: '24px' }} />
        </button>

      {/* Toggle zwischen Global und Freunde */}
      <div style={{
        display: 'flex',
        backgroundColor: '#f0f0f0',
        borderRadius: '25px',
        padding: '4px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setView('global')}
          style={{
            flex: 1,
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            backgroundColor: view === 'global' ? '#128b09' : 'transparent',
            color: view === 'global' ? '#fff' : '#666',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          🏙️ Chemnitz {/*🌍 Global*/}
        </button>
        <button
          onClick={() => setView('friends')}
          style={{
            flex: 1,
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            backgroundColor: view === 'friends' ? '#128b09' : 'transparent',
            color: view === 'friends' ? '#fff' : '#666',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          👥 Freunde
        </button>
      </div>

      {/* Rangliste */}
      {ranking.length > 0 ? (
        ranking.map((user, index) => (
          <RankingItem
            key={user.id}
            rank={index + 1}
            user={user}
            isCurrentUser={user.id === 'me'}
          />
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          {view === 'friends' ? (
            <p>Du folgst noch niemandem. Folge Freunden, um sie in der Rangliste zu sehen!</p>
          ) : (
            <p>Keine Nutzer gefunden.</p>
          )}
        </div>
      )}

      {/* Deine Position */}
      {ranking.length > 0 && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e8f5e8',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: '#128b09', fontWeight: 'bold' }}>
            Dein Platz: {ranking.findIndex(u => u.id === 'me') + 1} von {ranking.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Ranking;