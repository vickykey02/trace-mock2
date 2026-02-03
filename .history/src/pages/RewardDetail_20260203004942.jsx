import { useParams } from 'react-router-dom';
import LocationMap from '../components/LocationMap'; //evtl überlegen ob sinnvoll
//import RememberButton from '../components/RememberButton'; -> evtl. einlösen Button rein
import { useRewards } from '../context/RewardsContext';

const RewardDetail = () => {
  const { id } = useParams();
  const { rewards } = useRewards();
  
  const reward = rewards.find(r => r.id === parseInt(id));
  if (!reward) {
    return <div style={{ padding: '20px' }}>Belohnung nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, marginTop: '35px' }}>{reward.title}</h1>
        {/* <RememberButton rewardId={reward.id} /> */}
      </div>

      {/* Beschreibung */}
      <div style={{ marginBottom: '20px' }}>
        <h2>So löst du den Gutschein ein:</h2>
        <p>{reward.instruction}</p>
      </div>

      {/* Informationen */}
      <div style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
		<p><strong> {reward.description}</strong></p>
        <p><strong>Punkte:</strong> {reward.pointsCost}</p>
      </div>

      {/* LocationMap falls verfügbar */}
      {reward.showMap && (
        <div style={{ marginBottom: '20px' }}>
		<p><strong>teilnehmende Standorte:</strong> {reward.pointsCost}</p>
          <LocationMap rewardCategory={reward.category} />
        </div>
      )}
    </div>
  );
};

export default RewardDetail;
