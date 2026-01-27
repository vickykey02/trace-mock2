import { useRemember } from '../context/RememberContext';
import { useTipp } from '../context/TippsContext';
import Tipp from '../components/Tipp';

const RememberList = () => {
  const { remember } = useRemember();
  const { tipps: allTipps } = useTipp();
  // Debug
  console.log('RememberList - Remember:', remember);
  console.log('RememberList - Tipps:', allTipps);
  // Filter: Nur die geliketen Wissenshappen anzeigen
  const rememberedTipps = allTipps.filter(tipp => remember.includes(tipp.id));

  console.log('RememberList - Gemerkte Tipps:', rememberedTipps);

  if (rememberedTipps.length === 0) {
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
        {rememberedTipps.length} Tipps gefunden
      </p>

      {/* Favoriten Liste */}
      <div>
        {rememberedTipps.map(tipp => (
          <Tipp key={tipp.id} tipp={tipp} />
        ))}
      </div>
    </div>
  );
};

export default RememberList;
