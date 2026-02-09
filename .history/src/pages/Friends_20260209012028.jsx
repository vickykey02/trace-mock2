import { useState } from 'react';
import Friend from '../components/Friend';
import { useFriends } from '../context/FriendsContext';
import { useCommunities } from '../context/CommunityContext';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const CommunityCard = ({ community, isJoined, onToggleJoin }) => (
  <div style={{
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 15
  }}>
    <div style={{
      width: 50,
      height: 50,
      borderRadius: 10,
      background: '#e8f5e8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 28
    }}>
      {community.image}
    </div>
    <div style={{ flex: 1 }}>
      <h3 style={{ margin: '0 0 4px 0', color: '#333', fontSize: 15 }}>{community.name}</h3>
      <p style={{ margin: '0 0 6px 0', color: '#666', fontSize: 12 }}>{community.description}</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <span style={{
          background: '#f0f0f0',
          color: '#666',
          padding: '2px 8px',
          borderRadius: 10,
          fontSize: 11
        }}>
          👥 {community.members} Mitglieder
        </span>
        <span style={{
          height: 'fit-content',
          background: '#e8f5e8',
          color: '#128b09',
          padding: '2px 8px',
          borderRadius: 10,
          fontSize: 11
        }}>
          {community.category}
        </span>
      </div>
    </div>
    <button
      onClick={() => onToggleJoin(community.id)}
      style={{
        background: isJoined ? '#fff' : '#128b09',
        color: isJoined ? '#128b09' : '#fff',
        border: isJoined ? '2px solid #128b09' : 'none',
        borderRadius: 8,
        padding: '8px 16px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 13
      }}
    >
      {isJoined ? 'Beigetreten ✓' : 'Beitreten'}
    </button>
  </div>
);

const Friends = () => {
  const { friends: allFriends } = useFriends();
  const { communities, joinedCommunities, toggleJoinCommunity, isJoined } = useCommunities();

  const [activeTab, setActiveTab] = useState('friends');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtere Freunde basierend auf dem Suchbegriff
  const filteredFriends = allFriends.filter(friend => {
    if (!searchTerm.trim()) return true;
    const search = searchTerm.toLowerCase();
    return (
      friend.title?.toLowerCase().includes(search) ||
      friend.bio?.toLowerCase().includes(search)
    );
  });

  // Filtere Communities basierend auf dem Suchbegriff
  const filteredCommunities = communities.filter(community => {
    if (!searchTerm.trim()) return true;
    const search = searchTerm.toLowerCase();
    return (
      community.name.toLowerCase().includes(search) ||
      community.description.toLowerCase().includes(search) ||
      community.category.toLowerCase().includes(search)
    );
  });

  const tabStyle = (isActive) => ({
    flex: 1,
    padding: '12px 20px',
    background: isActive ? '#128b09' : '#fff',
    color: isActive ? '#fff' : '#128b09',
    border: isActive ? 'none' : '2px solid #128b09',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 'bold',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ padding: '30px', paddingBottom: '100px' }}>
      <PageHeader title="Friends & Communities" />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => { setActiveTab('friends'); setSearchTerm(''); }}
          style={tabStyle(activeTab === 'friends')}
        >
          👥 Friends
        </button>
        <button
          onClick={() => { setActiveTab('communities'); setSearchTerm(''); }}
          style={tabStyle(activeTab === 'communities')}
        >
          🏘️ Communities
        </button>
      </div>

      {/* Profil Button - nur bei Freunde-Tab */}
      {activeTab === 'friends' && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Link to="/profile" style={{ flex: 1, textDecoration: 'none' }}>
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
              <img src="/user.png" alt="Profil" style={{ width: '24px', height: '24px' }} />
              Mein Profil
            </button>
          </Link>
        </div>
      )}

      {/* Suchleiste */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder={activeTab === 'friends' 
            ? "Suche nach Namen oder Bio..." 
            : "Suche nach Communities..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Freunde Tab */}
      {activeTab === 'friends' && (
        <>
          {searchTerm.trim() ? (
            filteredFriends.length > 0 ? (
              filteredFriends.map(friend => (
                <Friend key={friend.id} friend={friend} />
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#999'
              }}>
                <p>Keine Freunde gefunden. Versuche andere Suchbegriffe.</p>
              </div>
            )
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#999'
            }}>
              <p>Gib einen Namen ein, um Freunde zu finden.</p>
            </div>
          )}
        </>
      )}

      {/* Communities Tab */}
      {activeTab === 'communities' && (
        <>
          {/* Meine Communities */}
          {joinedCommunities.length > 0 && !searchTerm.trim() && (
            <div style={{ marginBottom: 25 }}>
              <h3 style={{ color: '#128b09', marginBottom: 10 }}>Meine Communities</h3>
              {communities.filter(c => joinedCommunities.includes(c.id)).map(community => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  isJoined={true}
                  onToggleJoin={toggleJoinCommunity}
                />
              ))}
            </div>
          )}

          {/* Alle/Gefilterte Communities */}
          <div>
            <h3 style={{ color: '#333', marginBottom: 10 }}>
              {searchTerm.trim() ? 'Suchergebnisse' : 'Communities entdecken'}
            </h3>
            {filteredCommunities.filter(c => searchTerm.trim() || !joinedCommunities.includes(c.id)).length > 0 ? (
              filteredCommunities
                .filter(c => searchTerm.trim() || !joinedCommunities.includes(c.id))
                .map(community => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    isJoined={isJoined(community.id)}
                    onToggleJoin={toggleJoinCommunity}
                  />
                ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#999'
              }}>
                <p>Keine Communities gefunden.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Friends;


