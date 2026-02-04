//evtl. noch einbauen, dass man Ziele übernehmen kann und dass sich Followerzahl ändert
//evtl. noch letzte Handlungen einbauen

import { useParams } from 'react-router-dom';
import FollowButton from '../components/FollowButton';
import { useFriends } from '../context/FriendsContext';
import { useGoals } from '../context/GoalsContext';
import { useRemember } from '../context/RememberContext';

const FriendDetail = () => {
  const { id } = useParams();
  const { friends } = useFriends();
  const { addGoal } = useGoals();
  const { addRemember, remembered } = useRemember();
  
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
      <div style={{ marginTop: '-40px', marginLeft: '30px', marginRight: '30px' }}>
        <p>{friend.bio}</p>
      </div>

		<div style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
			<FollowButton friendId={friend.id} />
		</div>

      {/* Ziele */}
      <div style={{ marginTop: '30px', marginLeft: '20px', marginRight: '20px' }}>
        <h3 style={{ color: '#128b09', marginBottom: '15px' }}>🎯 Ziele</h3>
        {friend.goals && friend.goals.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {friend.goals.map((goal, index) => (
              <div key={index} style={{
                backgroundColor: '#f8f9fa',
                padding: '12px 15px',
                borderRadius: '8px',
                borderLeft: '4px solid #128b09',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span>{goal}</span>
                <button
                  onClick={() => {
                    addGoal({
                      title: goal,
                      description: `Übernommen von ${friend.title}`,
                      category: 'Sonstiges',
                      target: 30,
                      unit: 'days',
                      type: 'friend'
                    });
                    //alert(`Ziel "${goal}" wurde hinzugefügt!`);
                  }}
                  style={{
                    backgroundColor: '#128b09',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginLeft: '10px',
                  }}
                >
                  {isGoalActive ? '✓' : '+'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>Keine Ziele vorhanden</p>
        )}
      </div>

      {/* Tipps */}
      <div style={{ marginTop: '25px', marginLeft: '20px', marginRight: '20px' }}>
        <h3 style={{ color: '#ffc107', marginBottom: '15px' }}>💡 Eingereichte Tipps</h3>
        {friend.tips && friend.tips.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {friend.tips.map((tip, index) => {
              const tipId = `friend-${friend.id}-tip-${index}`;
              const isRemembered = remembered.includes(tipId);
              return (
                <div key={index} style={{
                  backgroundColor: '#fff9e6',
                  padding: '12px 15px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #ffc107',
                  fontSize: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span>{tip}</span>
                  <button
                    onClick={() => {
                      addRemember(tipId);
                      alert(`Tipp "${tip}" wurde gemerkt!`);
                    }}
                    disabled={isRemembered}
                    style={{
                      backgroundColor: isRemembered ? '#ccc' : '#ffc107',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      fontSize: '16px',
                      cursor: isRemembered ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginLeft: '10px',
                    }}
                  >
                    {isRemembered ? '✓' : '+'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>Keine Tipps eingereicht</p>
        )}
      </div>

      {/* Trophäen/Abzeichen */}
      <div style={{ marginTop: '25px', marginLeft: '20px', marginRight: '20px' }}>
        <h3 style={{ color: '#9c27b0', marginBottom: '15px' }}>🏆 Trophäen</h3>
        {friend.trophies && friend.trophies.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {friend.trophies.map((trophy, index) => (
              <div key={index} style={{
                backgroundColor: '#f3e5f5',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
                color: '#7b1fa2'
              }}>
                🏅 {trophy}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>Keine Trophäen vorhanden</p>
        )}
      </div>
    </div>
  );
};

export default FriendDetail;

