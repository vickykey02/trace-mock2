import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LocationMap from '../components/LocationMap'; //evtl überlegen ob sinnvoll
//import RememberButton from '../components/RememberButton'; -> evtl. einlösen Button rein
import { useRewards } from '../context/RewardsContext';
import { useBonusPoints } from '../context/BonusPointsContext';
import Spend from '../popups/Spend';

const RewardDetail = () => {
  const { id } = useParams();
  const { rewards } = useRewards();
  const { bonusPoints, subtractBonusPoints } = useBonusPoints();
  const [isSpendOpen, setIsSpendOpen] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  
  const reward = rewards.find(r => r.id === parseInt(id));
  if (!reward) {
    return <div style={{ padding: '20px' }}>Belohnung nicht gefunden</div>;
  }

  const canRedeem = bonusPoints >= reward.pointsCost && !isRedeemed;
  const pointsNeeded = Math.max(0, reward.pointsCost - bonusPoints);

  const handleRedeem = (rewardToRedeem) => {
    if (bonusPoints >= rewardToRedeem.pointsCost) {
      subtractBonusPoints(rewardToRedeem.pointsCost, `Belohnung eingelöst: ${rewardToRedeem.title}`);
      setIsRedeemed(true);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, marginTop: '35px' }}>{reward.title}</h1>
        {/* <RememberButton rewardId={reward.id} /> */}
      </div>

      {/* Einlösen Button */}
      <div style={{
        backgroundColor: canRedeem ? '#e8f5e8' : '#f5f5f5',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        {isRedeemed ? (
          <p style={{ color: '#128b09', fontWeight: 'bold', margin: 0 }}>
            ✓ Erfolgreich eingelöst!
          </p>
        ) : canRedeem ? (
          <>
            <p style={{ margin: '0 0 10px 0', color: '#128b09' }}>
              Du hast genug Punkte! ({bonusPoints} / {reward.pointsCost})
            </p>
            <button
              onClick={() => setIsSpendOpen(true)}
              style={{
                background: '#128b09',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 30px',
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Jetzt einlösen ✨
            </button>
          </>
        ) : (
          <p style={{ margin: 0, color: '#888' }}>
            Noch {pointsNeeded} Punkte nötig ({bonusPoints} / {reward.pointsCost})
          </p>
        )}
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
