const Help = () => {

  return (
    <div style={{ padding: '30px', margin: '0 auto', paddingBottom: '10px', boxSizing: 'border-box', maxWidth: '100%', overflowX: 'hidden' }}>
		<h2>Hilfe</h2>
    <div
      //style={{ padding: '30px' }}>
      style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '10px', 
        marginBottom: '20px',
      }}>
      <h3>Bonuspunkte vs. Punkte</h3>
      <p>Sowohl Bonuspunkte als auch Punkte sind wichtige Elemente in unserem Belohnungssystem. 
		Du erhältst für jede Handlung immer die gleiche Anzahl an Bonuspunkten und Punkten. 
		Während Bonuspunkte für Belohnungen eingelöst werden können - und damit auch aufgebraucht werden, 
		sammelst du Punkte, um deinen Fortschritt zu verfolgen und neue Level zu erreichen. Du kannst 
		Punkte also nicht einlösen, sondern sie zeigen dir, wie weit du auf deiner Nachhaltigkeitsreise gekommen bist.
		Bonuspunkte verlieren ihre Gültigkeit nach 24 Monaten, während Punkte unbegrenzt gültig bleiben.
	  </p>
    </div>
    </div>
  );
};

export default Help;