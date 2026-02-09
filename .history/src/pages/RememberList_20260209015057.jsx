import { useRemember } from '../context/RememberContext';
import { useTipps } from '../context/TippsContext';
import Tipp from '../components/Tipp';

const RememberList = () => {
  const { remembered } = useRemember();
  const { tipps: allTipps, friendTipps } = useTipps();

  // Filter: Normale Tipps
  const rememberedTipps = allTipps.filter(tipp => remembered.includes(tipp.id));
  
  // Filter: Freundes-Tipps
  const rememberedFriendTipps = friendTipps?.filter(tipp => remembered.includes(tipp.id)) || [];
  
  // Alle gemerkten Tipps kombinieren
  const allRememberedTipps = [...rememberedTipps, ...rememberedFriendTipps];

  if (allRememberedTipps.length === 0) {
    return (
      <div style={{ padding: '20px', paddingBottom: '100px', marginTop: '3px', marginLeft: '55px' }}>
        <h2>gemerkte Tipps</h2>
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999'
        }}>
          <p>Du hast dir noch keine Tipps gemerkt. Klicke auf den 📌 Button, um dir einen Tipp zu merken!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', paddingBottom: '100px' }}>
      <h1>gemerkte Tipps</h1>
      <p style={{ color: '#666', marginBottom: '15px' }}>
        {allRememberedTipps.length} Tipp(s) gefunden
      </p>

      {/* Favoriten Liste */}
      <div>
        {allRememberedTipps.map(tipp => (
          <Tipp key={tipp.id} tipp={tipp} />
        ))}
      </div>
    </div>
  );
};

export default RememberList;
