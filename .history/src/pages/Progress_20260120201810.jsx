
import React from 'react';
import { useRemember } from '../context/RememberContext';

// Beispielhafte Badges/Trophäen
const ALL_BADGES = [
  {
    id: 1,
    name: 'Erster Tipp',
    icon: '🏅',
    description: 'Merke dir deinen ersten Tipp!',
    criteria: '1 Tipp merken',
    check: (remembered) => remembered.length >= 1,
  },
  {
    id: 2,
    name: 'Wissenssammler',
    icon: '📚',
    description: '5 Tipps gemerkt!',
    criteria: '5 Tipps merken',
    check: (remembered) => remembered.length >= 5,
  },
  {
    id: 3,
    name: 'Tipp-Profi',
    icon: '🌟',
    description: '10 Tipps gemerkt!',
    criteria: '10 Tipps merken',
    check: (remembered) => remembered.length >= 10,
  },
];

const BadgeCard = ({ badge, unlocked }) => (
  <div
    style={{
      background: unlocked ? '#e8f5e8' : '#f0f0f0',
      color: unlocked ? '#128b09' : '#aaa',
      border: unlocked ? '2px solid #128b09' : '2px dashed #ccc',
      borderRadius: 10,
      padding: 20,
      margin: 10,
      width: '250px',
      textAlign: 'center',
      opacity: unlocked ? 1 : 0.6,
      boxShadow: unlocked ? '0 2px 8px rgba(18,139,9,0.1)' : 'none',
      transition: 'all 0.2s',
      display: 'inline-block',
    }}
  >
    <div style={{ fontSize: 40, marginBottom: 10 }}>{badge.icon}</div>
    <div style={{ fontWeight: 'bold', fontSize: 18 }}>{badge.name}</div>
    <div style={{ fontSize: 14, margin: '8px 0' }}>{badge.description}</div>
    {unlocked ? (
      <div style={{ color: '#128b09', fontWeight: 'bold' }}>Erhalten!</div>
    ) : (
      <div style={{ color: '#888', fontSize: 13 }}>Noch nicht erhalten<br /><span style={{ fontStyle: 'italic' }}>{badge.criteria}</span></div>
    )}
  </div>
);

const BadgesGrid = ({ badges }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {badges.map(({ badge, unlocked }) => (
      <BadgeCard key={badge.id} badge={badge} unlocked={unlocked} />
    ))}
  </div>
);

export default function Progress() {
  const { remembered } = useRemember();

  // Prüfe, welche Badges freigeschaltet sind
  const badgesWithStatus = ALL_BADGES.map(badge => ({
    badge,
    unlocked: badge.check(remembered),
  }));

  return (
    <div style={{ padding: 30 }}>
      <h1>Deine Erfolge</h1>
      <p>Hier siehst du alle Trophäen und Abzeichen. Erhalte mehr, indem du Tipps merkst!</p>
      <BadgesGrid badges={badgesWithStatus} />
    </div>
  );
}