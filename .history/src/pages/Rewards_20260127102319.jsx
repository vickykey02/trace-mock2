//Einlösemechanismus und Punkteverwaltung überarbeiten
//sollten klickbar sein, um Details anzuzeigen (Beschreibung, wie viele Punkte
//noch fehlen etc.)
//hier noch Unterscheidung verschiedene Punktearten rausarbeiten 

import React, { useState } from 'react';
import { usePoints } from '../context/PointsContext';
//import { Link } from 'react-router-dom';
import Spend from '../popups/Spend';

// Beispiel-Belohnungen mit Punktekosten
const ALL_REWARDS = [
  {
    id: 1,
    title: 'Vinted-Gutschein',
    description: '10€ Gutschein für nachhaltiges Second-Hand Shopping',
    pointsCost: 100,
  },
  {
    id: 2,
    title: 'Bio-Café Gutschein',
    description: 'Ein Heißgetränk deiner Wahl im lokalen Bio-Café',
    pointsCost: 50,
  },
  {
    id: 3,
    title: 'Unverpackt-Laden Rabatt',
    description: '15% Rabatt auf deinen nächsten Einkauf',
    pointsCost: 150,
  },
  {
    id: 4,
    title: 'Fahrrad-Check',
    description: 'Kostenloser Fahrrad-Sicherheitscheck beim lokalen Händler',
    pointsCost: 200,
  },
  {
    id: 5,
    title: 'Stadtbibliothek Monatskarte',
    description: 'Ein Monat gratis Ausleihen in der Stadtbibliothek',
    pointsCost: 80,
  },
  {
    id: 6,
    title: 'Baum pflanzen lassen',
    description: 'Ein Baum wird in deinem Namen in Chemnitz gepflanzt',
    pointsCost: 300,
  },
];

const RewardCard = ({ reward, currentPoints, onRedeem, isRedeemed }) => {
  const canRedeem = currentPoints >= reward.pointsCost && !isRedeemed;
  const progress = Math.min(100, Math.round((currentPoints / reward.pointsCost) * 100));
  const pointsNeeded = Math.max(0, reward.pointsCost - currentPoints);
  const [isSpendOpen, setIsSpendOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: canRedeem ? '#fff' : '#f5f5f5',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '8px',
        border: canRedeem ? '2px solid #128b09' : '1px solid #ddd',
        boxShadow: canRedeem ? '0 4px 8px rgba(18,139,9,0.15)' : '0 2px 4px rgba(0,0,0,0.05)',
        opacity: canRedeem ? 1 : 0.7,
        transition: 'all 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 8px 0', 
            color: canRedeem ? '#128b09' : '#888',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {reward.title}
            {canRedeem && <span style={{ fontSize: '16px' }}>✨</span>}
            {isRedeemed && <span style={{ fontSize: '14px', color: '#128b09' }}>✓ Eingelöst</span>}
          </h3>
          <p style={{ 
            margin: '0 0 12px 0', 
            color: canRedeem ? '#666' : '#999', 
            fontSize: 14 
          }}>
            {reward.description}
          </p>

          {/* Fortschrittsbalken */}
          {!isRedeemed && (
            <>
              <div style={{
                background: '#eee',
                borderRadius: 8,
                height: 18,
                overflow: 'hidden',
                marginBottom: 8,
                boxShadow: '0 1px 2px #ccc inset',
              }}>
                <div style={{
                  width: progress + '%',
                  background: canRedeem 
                    ? 'linear-gradient(90deg, #128b09 60%, #4be04b 100%)' 
                    : 'linear-gradient(90deg, #aaa 60%, #ccc 100%)',
                  height: '100%',
                  borderRadius: 8,
                  transition: 'width 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: 8,
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                  {progress >= 15 && `${progress}%`}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: canRedeem ? '#128b09' : '#999' }}>
                {canRedeem 
                  ? `${reward.pointsCost} Punkte - Jetzt einlösbar!` 
                  : `${currentPoints} / ${reward.pointsCost} Punkte (noch ${pointsNeeded} nötig)`
                }
              </p>
            </>
          )}
        </div>

        {/* Einlösen Button */}
        {canRedeem && !isRedeemed && (
          <button
            onClick={() => 
				setIsSpendOpen(true);
				onRedeem(reward)
			
			}
            style={{
              background: '#128b09',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '10px 16px',
              marginLeft: 15,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
            }}
          >
            Einlösen
          </button>
        )}

        {/* Punktekosten Badge */}
        <div style={{
          backgroundColor: canRedeem ? '#e8f5e8' : '#eee',
          color: canRedeem ? '#128b09' : '#888',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          marginLeft: canRedeem ? 0 : 15,
          whiteSpace: 'nowrap',
        }}>
          {reward.pointsCost} P
        </div>
      </div>
    </div>
  );
};

export default function Rewards() {
  const { points, subtractPoints } = usePoints();
  const [redeemedIds, setRedeemedIds] = useState([]);

  const handleRedeem = (reward) => {
    if (points >= reward.pointsCost) {
      subtractPoints(reward.pointsCost, `Belohnung eingelöst: ${reward.title}`);
      setRedeemedIds(prev => [...prev, reward.id]);
    }
  };

  // Sortiere: Einlösbare zuerst, dann nach Punktekosten
  const sortedRewards = [...ALL_REWARDS].sort((a, b) => {
    const aCanRedeem = points >= a.pointsCost && !redeemedIds.includes(a.id);
    const bCanRedeem = points >= b.pointsCost && !redeemedIds.includes(b.id);
    const aRedeemed = redeemedIds.includes(a.id);
    const bRedeemed = redeemedIds.includes(b.id);

    // Eingelöste ganz nach unten
    if (aRedeemed && !bRedeemed) return 1;
    if (!aRedeemed && bRedeemed) return -1;
    
    // Einlösbare nach oben
    if (aCanRedeem && !bCanRedeem) return -1;
    if (!aCanRedeem && bCanRedeem) return 1;
    
    // Bei gleicher Einlösbarkeit nach Punktekosten sortieren
    return a.pointsCost - b.pointsCost;
  });

  const redeemableCount = ALL_REWARDS.filter(r => 
    points >= r.pointsCost && !redeemedIds.includes(r.id)
  ).length;

  return (
    <div style={{ padding: '30px', paddingBottom: '100px' }}>
      <h1>Belohnungen</h1>
      
      {/* Punktestand Anzeige */}
      <div style={{
        backgroundColor: '#128b09',
        color: '#fff',
        padding: '15px 20px',
        borderRadius: '10px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Deine Punkte</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{points}</div>
        </div>
        {redeemableCount > 0 && (
          <div style={{
            backgroundColor: '#fff',
            color: '#128b09',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '14px',
          }}>
            {redeemableCount} einlösbar ✨
          </div>
        )}
      </div>

      {/* Ergebnisanzahl */}
      <p style={{ color: '#666', marginBottom: '15px' }}>
        {ALL_REWARDS.length} Belohnungen verfügbar
      </p>

      {/* Belohnungen Liste */}
      {sortedRewards.map(reward => (
        <RewardCard 
          key={reward.id} 
          reward={reward} 
          currentPoints={points}
          onRedeem={handleRedeem}
          isRedeemed={redeemedIds.includes(reward.id)}
        />
      ))}
    </div>
  );
}