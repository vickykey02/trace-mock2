import { useRemember } from '../context/RememberContext';
import { useActions } from '../context/ActionsContext';

const count = (remembered) => remembered.length;
const countApproved = (actions) => actions.filter(a => a.status === 'approved').length;
// Beispielhafte Badges/Trophäen
const ALL_BADGES = [
  {
    id: 1,
    name: 'Sustainability Starter',
    icon: '/nachhaltiges-leben.png',  
    isImage: true,  
    description: 'Füge deine erste Handlung hinzu!',
    criteria: '1 Handling hinzufügen',
    check: (approved) => approved.length >= 1,
  },
  {
    id: 2,
    name: 'Erster Tipp',
    icon: '/ersterTipp.png',  
    isImage: true,  
    description: 'Merke dir deinen ersten Tipp!',
    criteria: '1 Tipp merken',
    check: (remembered) => remembered.length >= 1,
  },
  {
    id: 3,
    name: 'Wissenssammler',
	levels: [
		{ level: 1, count: 5, name: 'Bronze', icon: '🥉', color: 'cd7f32' },
		{ level: 2, count: 15, name: 'Silber', icon: '🥈', color: 'c0c0c0'},
		{ level: 3, count: 30, name: 'Gold', icon: '🥇', color: 'ffd700'},
	],
    //icon: '📚',
    description: '5 Tipps gemerkt!',
    criteria: '5 Tipps merken',
    //check: (remembered) => remembered.length >= 5,
	getLevel: (count) => {
      if (count >= 5) return 3;
      if (count >= 4) return 2;
      if (count >= 2) return 1;
      return null;
	}
  },
  {
    id: 4,
    name: 'Tipp-Profi',
    //icon: '🌟',
    icon: '/tippProfi.png',  
    isImage: true, 
    description: '10 Tipps gemerkt!',
    criteria: '10 Tipps merken',
    check: (remembered) => remembered.length >= 10,
  },
];


const BadgeCard = ({ badge, unlocked, levelInfo }) => {
  // Für Badges mit Leveln
  if (badge.levels) {
    const { currentLevel, currentLevelObj, nextLevelObj } = levelInfo;
    return (
      <div
        style={{
          background: currentLevelObj ? currentLevelObj.color + '22' : '#f0f0f0',
          color: currentLevelObj ? '#128b09' : '#aaa',
          border: currentLevelObj ? `2px solid ${currentLevelObj.color || '#128b09'}` : '2px dashed #ccc',
          borderRadius: 10,
          padding: 20,
          margin: 10,
          width: '250px',
          textAlign: 'center',
          opacity: currentLevelObj ? 1 : 0.6,
          boxShadow: currentLevelObj ? '0 2px 8px rgba(18,139,9,0.1)' : 'none',
          transition: 'all 0.2s',
          display: 'inline-block',
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 10 }}>
          {currentLevelObj ? currentLevelObj.icon :  <img src="/Wissenssammler.png" alt="Erster Tipp" style={{ width: 50, height: 50, objectFit: 'contain' }} />}
        </div>
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>{badge.name}</div>
        <div style={{ fontSize: 14, margin: '8px 0' }}>{badge.description}</div>
        <div style={{ margin: '10px 0' }}>
          {badge.levels.map(lvl => (
            <span key={lvl.level} style={{
              fontSize: 22,
              margin: '0 4px',
              opacity: currentLevel >= lvl.level ? 1 : 0.3,
              filter: currentLevel >= lvl.level ? 'none' : 'grayscale(1)',
            }}>{lvl.icon}</span>
          ))}
        </div>
        {currentLevelObj ? (
          <div style={{ color: currentLevelObj.color || '#128b09', fontWeight: 'bold' }}>
            {currentLevelObj.name} erreicht!
          </div>
        ) : (
          <div style={{ color: '#888', fontSize: 13 }}>Noch nicht erhalten<br /><span style={{ fontStyle: 'italic' }}>{badge.levels[0].count} Tipps für Bronze</span></div>
        )}
        {nextLevelObj && (
          <div style={{ color: '#888', fontSize: 12, marginTop: 6 }}>
            Noch <b>{nextLevelObj.count - levelInfo.count}</b> Tipps bis <b>{nextLevelObj.name}</b>
          </div>
        )}
      </div>
    );
  }
  // Für einfache Badges
  return (
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
      <div style={{ fontSize: 40, marginBottom: 10 }}>
        {badge.isImage ? (
          <img src={badge.icon} alt={badge.name} style={{ width: 50, height: 50, objectFit: 'contain' }} />
        ) : (
          badge.icon
        )}
      </div>
      <div style={{ fontWeight: 'bold', fontSize: 18 }}>{badge.name}</div>
      <div style={{ fontSize: 14, margin: '8px 0' }}>{badge.description}</div>
      {unlocked ? (
        <div style={{ color: '#128b09', fontWeight: 'bold' }}>Erhalten!</div>
      ) : (
        <div style={{ color: '#888', fontSize: 13 }}>Noch nicht erhalten<br /><span style={{ fontStyle: 'italic' }}>{badge.criteria}</span></div>
      )}
    </div>
  );
};

const BadgesGrid = ({ badges }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {badges.map(({ badge, unlocked, levelInfo }) => (
      <BadgeCard key={badge.id} badge={badge} unlocked={unlocked} levelInfo={levelInfo} />
    ))}
  </div>
);

export default function Progress() {
  const { remembered } = useRemember();
  const currentCount = remembered.length;

  // Prüfe, welche Badges freigeschaltet sind und Level für Level-Badges
  const badgesWithStatus = ALL_BADGES.map(badge => {
    if (badge.levels) {
      // Finde aktuelle und nächste Stufe
      let currentLevel = 0;
      let currentLevelObj = null;
      let nextLevelObj = null;
      for (let i = badge.levels.length - 1; i >= 0; i--) {
        if (currentCount >= badge.levels[i].count) {
          currentLevel = badge.levels[i].level;
          currentLevelObj = badge.levels[i];
          break;
        }
      }
      for (let i = 0; i < badge.levels.length; i++) {
        if (currentCount < badge.levels[i].count) {
          nextLevelObj = badge.levels[i];
          break;
        }
      }
      return {
        badge,
        unlocked: !!currentLevelObj,
        levelInfo: { currentLevel, currentLevelObj, nextLevelObj, count: currentCount },
      };
    } else {
      return {
        badge,
        unlocked: badge.check(remembered),
        levelInfo: null,
      };
    }
  });

  // Fortschrittsanzeige: nächstes Badge (nur für einfache Badges)
  const nextBadge = ALL_BADGES.find(b => !b.levels && !b.check?.(remembered));
  const nextGoal = nextBadge ? parseInt(nextBadge.criteria.match(/\d+/)?.[0] || '0', 10) : currentCount;
  const progressPercent = nextBadge ? Math.min(100, Math.round((currentCount / nextGoal) * 100)) : 100;

  return (
    <div style={{ padding: 30 }}>
      <h1>Deine Erfolge</h1>
      <p>Hier siehst du alle Trophäen und Abzeichen. Erhalte mehr, indem du Tipps merkst!</p>

      {/* Fortschrittsanzeige für einfache Badges */}
      {nextBadge && (
        <div style={{ margin: '30px 0', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ marginBottom: 8, fontWeight: 'bold', textAlign: 'center' }}>
            {`Fortschritt: ${currentCount} / ${nextGoal} Tipps für "${nextBadge.name}"`}
          </div>
          <div style={{ background: '#eee', borderRadius: 10, height: 22, overflow: 'hidden', boxShadow: '0 1px 2px #ccc inset' }}>
            <div style={{
              width: progressPercent + '%',
              background: 'linear-gradient(90deg, #128b09 60%, #4be04b 100%)',
              height: '100%',
              borderRadius: 10,
              transition: 'width 0.4s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 14,
              paddingRight: 10
            }}>{progressPercent}%</div>
          </div>
        </div>
      )}

      <BadgesGrid badges={badgesWithStatus} />
    </div>
  );
}