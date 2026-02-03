//noch ordentlich umsetzen (Bild einstellen, auf Follower zugreifen usw.)

const Profil = () => {

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
    </div>
  );
};

export default Profil;

