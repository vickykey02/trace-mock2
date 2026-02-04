import { useRemember } from '../context/RememberContext';
import { useTipps } from '../context/TippsContext';
import { useFriends } from '../context/FriendsContext';
import Tipp from '../components/Tipp';

const RememberList = () => {
  const { remembered } = useRemember();
  const { tipps: allTipps } = useTipps();
  const { friends } = useFriends();

  // Filter: Tipps aus TippsContext
  const rememberedTipps = allTipps.filter(tipp => remembered.includes(tipp.id));

  // Filter: Tipps von Freunden (Format: "friend-{id}-tip-{index}")
  const friendTipps = [];
  remembered.forEach(id => {
    if (id.startsWith('friend-')) {
      const parts = id.split('-'); // ["friend", "1", "tip", "0"]
      const friendId = parseInt(parts[1]);
      const tipIndex = parseInt(parts[3]);
      const friend = friends.find(f => f.id === friendId);
      if (friend && friend.tips && friend.tips[tipIndex]) {
        friendTipps.push({
          id: id,
          title: friend.tips[tipIndex],
          source: friend.title,
          isFriendTip: true
        });
      }
    }
  });

  const totalCount = rememberedTipps.length + friendTipps.length;

  if (totalCount === 0) {
    return (
      <div style={{ padding: '20px', paddingBottom: '100px' }}>
        <h1>gemerkte Tipps</h1>
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999'
        }}>
          <p>Du hast dir noch keine Tipps gemerkt. Klicke auf den ❤️ Button, um dir einen Tipp zu merken!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h1>Lieblingstipps</h1>
      <p style={{ color: '#666', marginBottom: '15px' }}>
        {totalCount} Tipps gefunden
      </p>

      {/* Tipps aus TippsContext */}
      <div>
        {rememberedTipps.map(tipp => (
          <Tipp key={tipp.id} tipp={tipp} />
        ))}
      </div>

      {/* Tipps von Freunden */}
      {friendTipps.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#ffc107', marginBottom: '10px' }}>💡 Von Freunden</h3>
          {friendTipps.map(tip => (
            <div key={tip.id} style={{
              backgroundColor: '#fff9e6',
              padding: '15px',
              borderRadius: '8px',
              borderLeft: '4px solid #ffc107',
              marginBottom: '10px',
            }}>
              <p style={{ margin: 0, fontSize: '14px' }}>{tip.title}</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#888' }}>
                Von: {tip.source}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RememberList;
