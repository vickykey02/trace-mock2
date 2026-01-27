//Belohnungen sollen nicht getrennt sein nach ausstehend und freigeschaltet,
//sondern in einer Ansicht beide Zustände zeigen, nur in unterschiedlichen Farben
//außerdem ist noch Button zum Einlösen notwendig (nur weil die Belösung einlösbar ist,
//heißt das ja nicht, dass der Nutzer das auch machen will, Punkte kann man auch länger
//sammeln -> Vorbild Mc Donalds App)
//außerdem brauchen Belohnungen keine Kategorien
//außerdem sollten Belohnungen klickbar sein, um Details anzuzeigen (Beschreibung, wie viele Punkte
//noch fehlen etc.)

import React, { useState } from 'react';

// Beispiel-Belohnungen mit Trackern
const ALL_REWARDS = [
  {
	id: 1,
	title: 'Vinted-Gutschein',
	description: 'Sammle 100 Punkte für einen 10€ Gutschein',
	target: 100,
	current: 1,
	unit: 'Punkte',
	completed: false,
  },
  {
	id: 2,
	title: 'Wasser sparen',
	description: 'Duschen unter 5 Minuten',
	target: 7,
	current: 4,
	unit: 'Tage',
	completed: false,
	category: 'Energie',
  },
  {
	id: 3,
	title: 'Fahrrad-Challenge',
	description: 'Diese Woche 5x mit dem Fahrrad fahren',
	target: 5,
	current: 5,
	unit: 'Fahrten',
	completed: true,
	category: 'Mobilität',
  },
  {
	id: 4,
	title: 'Plastikfrei',
	description: 'Letzte Woche erfolgreich abgeschlossen',
	target: 1,
	current: 1,
	unit: 'Woche',
	completed: true,
	category: 'Umwelt',
  },
];

const RewardCard = ({ reward, onProgress }) => {
  const progress = Math.min(100, Math.round((reward.current / reward.target) * 100));
  
  return (
	<div style={{
	  background: reward.completed ? '#e8f5e8' : '#fff',
	  border: reward.completed ? '2px solid #128b09' : '1px solid #ddd',
	  borderRadius: 10,
	  padding: 20,
	  marginBottom: 15,
	  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
	  opacity: reward.completed ? 0.8 : 1,
	}}>
	  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
		<div style={{ flex: 1 }}>
		  <h3 style={{ margin: '0 0 8px 0', color: '#128b09' }}>{reward.title}</h3>
		  <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: 14 }}>{reward.description}</p>
		  
		  {!reward.completed && (
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
				  background: 'linear-gradient(90deg, #128b09 60%, #4be04b 100%)',
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
				}} >{progress}%</div>
			  </div>
			  <p style={{ margin: 0, fontSize: 12, color: '#999' }}>
				{reward.current} / {reward.target} {reward.unit}
			  </p>
			</>
		  )}
		</div>
		
		{!reward.completed && (
		  <button
			onClick={() => onProgress(reward.id)}
			style={{
			  background: '#128b09',
			  color: '#fff',
			  border: 'none',
			  borderRadius: 6,
			  padding: '8px 12px',
			  marginLeft: 15,
			  cursor: 'pointer',
			  fontSize: 12,
			  fontWeight: 'bold',
			  whiteSpace: 'nowrap',
			}}
		  >
			+1
		  </button>
		)}
		
		{reward.completed && (
		  <div style={{ color: '#128b09', fontWeight: 'bold', fontSize: 18 }}>✓</div>
		)}
	  </div>
	</div>
  );
};

export default function Rewards(props) {
  const [rewards, setRewards] = useState(ALL_REWARDS);
  const handleProgress = (rewardId) => {
	setRewards(rewards.map(r => 
	  r.id === rewardId
		? { ...r, current: Math.min(r.current + 1, r.target), completed: r.current + 1 >= r.target }
		: r
	));
  };

  const activeRewards = rewards.filter(r => !r.completed);
  const completedRewards = rewards.filter(r => r.completed);

  return (
	<div style={{
	  display: 'flex',
	  flexDirection: 'column',
	  height: '100%',
	  overflow: 'hidden',
	  //background: '#f9f9f9',
	}}>
	  {/* Ausstehende Belohnungen */}
	  <div style={{
		flex: '0 0 50%',
		display: 'flex',
		flexDirection: 'column',
		//borderBottom: '1px solid #ddd',
		minHeight: 0,
	  }}>
		<div style={{
		  padding: '20px 30px',
		  //borderBottom: '1px solid #ddd',
		  //background: '#fff',
		  flexShrink: 0,
		}}>
		  <h3 style={{ margin: 0, color: '#128b09' }}>Ausstehende Belohnungen</h3>
		</div>
		<div style={{
		  flex: 1,
		  overflowY: 'auto',
		  padding: '20px 30px',
		  minHeight: 0,
		}}>
		  {activeRewards.length > 0 ? (
			activeRewards.map(reward => (
			  <RewardCard key={reward.id} reward={reward} onProgress={handleProgress} />
			))
		  ) : (
			<p style={{ color: '#999', textAlign: 'center', marginTop: 20 }}>Keine ausstehenden Belohnungen. Starte eine neue Belohnung!</p>
		  )}
		</div>
	  </div>

	  {/* Freigeschaltete Belohnungen */}
	  <div style={{
		flex: '0 0 50%',
		display: 'flex',
		flexDirection: 'column',
		minHeight: 0,
	  }}>
		<div style={{
		  padding: '20px 30px',
		  //borderBottom: '1px solid #ddd',
		  //background: '#fff',
		  flexShrink: 0,
		}}>
		  <h2 style={{ margin: 0, color: '#128b09' }}>Freigeschaltete Belohnungen 🎉</h2>
		</div>
		<div style={{
		  flex: 1,
		  overflowY: 'auto',
		  padding: '20px 30px',
		  minHeight: 0,
		}}>
		  {completedRewards.length > 0 ? (
			completedRewards.map(reward => (
			  <RewardCard key={reward.id} reward={reward} onProgress={handleProgress} />
			))
		  ) : (
			<p style={{ color: '#999', textAlign: 'center', marginTop: 20 }}>Noch keine Belohnungen freigeschaltet. Du schaffst das!</p>
		  )}
		</div>
	  </div>
	</div>
  );
}