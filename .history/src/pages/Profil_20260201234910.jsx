//noch ordentlich umsetzen (Bild einstellen, auf Follower zugreifen usw.)
//bei Zielen, Tipps, Trophäen auf eigene Daten zugreifen (bzw. faken -> geht erst wenn 
//Aufgaben geplant, dann anpassen)

const Profil = () => {
	const own = {
		goals: [
			"Reduziere meinen Plastikverbrauch",
		],
		tips: [
			"Nutze wiederverwendbare Einkaufstaschen",
		],
		trophies: [
			"Plastikfrei-Champion",
		]
	};

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>

	  {/* Profilbild */}
      <div style={{
        width: '85px',
        height: '85px',
        borderRadius: '50%',
        backgroundColor: '#128b09',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
		marginLeft: '30px',
        marginRight: '12px',
		marginTop: '20px',
        overflow: 'hidden',
      }}>
          <img 
            src="/headerbild_massentierhaltung.webp" 
            alt="Schweinchen"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
	  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
		<h3 style={{ margin: 0, marginTop: '-135px', marginLeft: '130px' }}>Du</h3>
      </div>

	  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
		<p style={{ margin: 0, marginTop: '-100px', marginLeft: '130px', textAlign: 'center', lineHeight: '1.2' }}>
          <strong>12</strong><br/>
          Follower
        </p>
      </div>

	  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
		<p style={{ margin: 0, marginTop: '-140px', marginLeft: '230px', textAlign: 'center', lineHeight: '1.2' }}>
          <strong>8</strong><br/>
          Gefolgt
        </p>
      </div>

	   {/* Beschreibung */}
      <div style={{ marginTop: '-40px', marginLeft: '30px', marginRight: '30px' }}>
        <p>Nachhaltigkeit ist die Lösung.</p>
      </div>

	  {/* Ziele */}
      <div style={{ marginTop: '30px', marginLeft: '20px', marginRight: '20px' }}>
        <h3 style={{ color: '#128b09', marginBottom: '15px' }}>🎯 Ziele</h3>
        {own.goals && own.goals.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {own.goals.map((goal, index) => (
              <div key={index} style={{
                backgroundColor: '#f8f9fa',
                padding: '12px 15px',
                borderRadius: '8px',
                borderLeft: '4px solid #128b09',
                fontSize: '14px'
              }}>
                {goal}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>Keine Ziele vorhanden</p>
        )}
      </div>

      {/* Tipps */}
      <div style={{ marginTop: '25px', marginLeft: '20px', marginRight: '20px' }}>
        <h3 style={{ color: '#ffc107', marginBottom: '15px' }}>💡 Eingereichte Tipps</h3>
        {own.tips && own.tips.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {own.tips.map((tip, index) => (
              <div key={index} style={{
                backgroundColor: '#fff9e6',
                padding: '12px 15px',
                borderRadius: '8px',
                borderLeft: '4px solid #ffc107',
                fontSize: '14px'
              }}>
                {tip}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>Keine Tipps eingereicht</p>
        )}
      </div>

      {/* Trophäen/Abzeichen */}
      <div style={{ marginTop: '25px', marginLeft: '20px', marginRight: '20px' }}>
        <h3 style={{ color: '#9c27b0', marginBottom: '15px' }}>🏆 Trophäen</h3>
        {own.trophies && own.trophies.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {own.trophies.map((trophy, index) => (
              <div key={index} style={{
                backgroundColor: '#f3e5f5',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
                color: '#7b1fa2'
              }}>
                🏅 {trophy}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>Keine Trophäen vorhanden</p>
        )}
      </div>

    </div>
  );
};

export default Profil;

