//evtl. noch verschönern
//hierauf in der Diskussion eingehen -> Algorithmusmöglichkeiten für Impact-Berechnung beschreiben, aber hier nur Mock

const ImpactCard = ({ icon, title, value, unit, comparison, color }) => (
  <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    borderLeft: `5px solid ${color}`,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div style={{
        fontSize: '40px',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${color}20`,
        borderRadius: '12px',
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: color }}>
          {value} <span style={{ fontSize: '16px', fontWeight: 'normal' }}>{unit}</span>
        </div>
        <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>
          {comparison}
        </div>
      </div>
    </div>
  </div>
);

const Impact = () => {
  const impactData = [
    {
      icon: '🌱',
      title: 'CO₂-Einsparung',
      value: '120',
      unit: 'kg',
      comparison: '≈ 600 km Autofahrt vermieden',
      color: '#128b09',
    },
    {
      icon: '💧',
      title: 'Wasserersparnis',
      value: '5.000',
      unit: 'Liter',
      comparison: '≈ 33 Badewannen voll Wasser',
      color: '#2196F3',
    },
    {
      icon: '♻️',
      title: 'Abfallvermeidung',
      value: '30',
      unit: 'kg',
      comparison: '≈ 150 Plastikflaschen weniger',
      color: '#FF9800',
    },
    {
      icon: '💰',
      title: 'Gesparte Kosten',
      value: '75',
      unit: '€',
      comparison: '≈ 5 Kinobesuche mehr möglich',
      color: '#9C27B0',
    },
  ];

  return (
    <div style={{ 
      marginTop: '30px', 
      marginBottom: '30px', 
      backgroundImage: "url('/Sustainability.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }}>
      <div style={{ padding: '30px', paddingBottom: '100px' }}>
        <h1 style={{ 
          color: '#fff', 
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          marginBottom: '10px',
        }}>
          Dein Impact
        </h1>
        <p style={{ 
          color: '#fff', 
          textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
          marginBottom: '25px',
          fontSize: '16px',
        }}>
          So hast du Chemnitz nachhaltiger gemacht 🌍
        </p>

        {/* Impact Karten */}
        {impactData.map((item, index) => (
          <ImpactCard key={index} {...item} />
        ))}

        {/* Motivations-Box */}
        <div style={{
          backgroundColor: 'rgba(18, 139, 9, 0.9)',
          borderRadius: '16px',
          padding: '20px',
          marginTop: '25px',
          color: '#fff',
        }}>
          <h3 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🎉 Großartig gemacht!
          </h3>
          <p style={{ margin: 0, lineHeight: '1.6', fontSize: '14px' }}>
            Mit deinen Handlungen trägst du dazu bei, Chemnitz nachhaltiger, lebenswerter und bunter zu machen. 
            Dein Beitrag zählt und inspiriert andere, ebenfalls aktiv zu werden. Gemeinsam können wir eine positive 
            Veränderung bewirken!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impact;