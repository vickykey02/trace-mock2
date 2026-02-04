//noch ordentlich ausarbeiten und gestalten (ggf. Algorithmus für Impact-Berechnung)
//hierauf in der Diskussion eingehen -> Algorithmusmöglichkeiten beschreiben, aber hier nur Mock

const Impact = () => {
  return (
    <div style = {{ marginTop: '30px', marginBottom: '30px', background: "url('/NachhaltigesChemnitz.png')" }}>
    <div>
      <h1>Impact</h1>

      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2>Dein aktueller Impact:</h2>
        <ul>
          <li><strong>CO2-Einsparung:</strong> 120 kg</li>
          <li><strong>Wasserersparnis:</strong> 5000 Liter</li>
          <li><strong>Abfallvermeidung:</strong> 30 kg</li>
          <li><strong>Gesparte Kosten:</strong> 75 €</li>
        </ul>
      </div>
      <p>Mit deinen Handlungen trägst du dazu bei, Chemnitz nachhaltiger, lebenswerter und bunter zu machen.
        Eine nachhaltige Stadtentwicklung erfordert gemeinsames Engagement und kontinuierliche Anstrengungen.
        Dein Beitrag zählt und inspiriert andere, ebenfalls aktiv zu werden. Gemeinsam können wir eine positive Veränderung bewirken
        und die Welt zu einem besseren Ort für alle machen!
      </p>
    </div>
    </div>
  );
};

export default Impact;