import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import LocationMap from '../components/LocationMap';

const ActionDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isCompleted, setIsCompleted] = useState(false);

  // Beispieldaten für Handlungen mit erweiterten Details
  const actionsData = {
    1: {
      id: 1,
      title: 'Unverpackt kaufen',
      description: 'Bring deine eigenen Gefäße und Beutel für den Kauf von Lebensmitteln mit in den Laden. Dort lässt du diese wiegen, füllst sie und bezahlst. Beim Bezahlen kannst du einen QR Code scannen, um die Handlung einzutragen.', //Beim Unverpackt-Einkauf geht es darum Verpackungsmaterial zu vermeiden, indem Produkte in mitgebrachte, wiederverwendbare Gefäße gefüllt werden.',
      category: 'Shopping',
      fullContent: 'Plastik ist eines der größten Umweltprobleme unserer Zeit. Durch den Einsatz von Stoffbeuteln beim Einkaufen kannst du einen großen Beitrag zur Reduktion von Einwegplastik leisten. Dies ist eine einfache, aber wirkungsvolle Maßnahme.',
      impact: 'Reduziert Plastikmüll um bis zu 500 Beutel pro Jahr',
      difficulty: 'Leicht',
      points: '10 Punkte pro Einkauf. Maximal 20 Punkte pro Woche.',
      timeEstimate: '30 Minuten',
      tips: ['Nimm Behälter mit', 'Spare Verpackungsmaterial', 'Unterstütze unverpackt Läden'],
      showMap: true
    },
    2: {
      id: 2,
      title: 'Bäume pflanzen',
      description: 'Pflanzen Sie einen Baum in Ihrer Gemeinde und kümmern Sie sich um ihn',
      category: 'Natur',
      fullContent: 'Bäume sind essentiell für unser Ökosystem. Sie produzieren Sauerstoff, speichern Kohlenstoff und bieten Lebensraum für Tiere. Das Pflanzen von Bäumen ist eine wirkungsvolle Maßnahme gegen den Klimawandel.',
      impact: 'Ein Baum bindet etwa 1 Tonne CO2 in seinem Leben',
      difficulty: 'Mittel',
      timeEstimate: '1-2 Stunden',
      tips: ['Wähle den richtigen Baum für deine Region', 'Pflanze im Herbst oder Frühjahr', 'Kümmere dich regelmäßig um den Baum']
    },
    3: {
      id: 3,
      title: 'Wasser sparen',
      description: 'Dusch dich kürzer und repariere tropfende Wasserhähne',
      category: 'Energie',
      fullContent: 'Wasser ist eine kostbare Ressource. Durch bewusstes Sparen im Haushalt kannst du nicht nur die Umwelt schützen, sondern auch deine Wasserrechnung senken.',
      impact: 'Spart bis zu 18 Kubikmeter Wasser pro Jahr',
      difficulty: 'Leicht',
      timeEstimate: 'Täglich anwendbar',
      tips: ['Duschen statt Baden', 'Wasserhahn beim Zähneputzen ausmachen', 'Regelmäßig auf Lecks prüfen']
    },
    4: {
      id: 4,
      title: 'Recycling',
      description: 'Trenne deinen Müll korrekt und recycele wo möglich',
      category: 'Abfall',
      fullContent: 'Richtiges Recycling trägt maßgeblich zur Reduktion von Müll bei. Durch Trennung von Plastik, Papier und Glas kann Material wiederverwendet werden.',
      impact: 'Reduziert Deponieabfälle um bis zu 75%',
      difficulty: 'Leicht',
      timeEstimate: 'Täglich anwendbar',
      tips: ['Lerne die Recycling-Symbole', 'Trenne verschiedene Materialien', 'Informiere dich über lokale Regeln']
    },
    5: {
      id: 5,
      title: 'Nachhaltige Mode',
      description: 'Kaufe Second-Hand Kleidung oder nachhaltige Labels',
      category: 'Shopping',
      fullContent: 'Die Modeindustrie ist einer der größten Umweltver unreiniger. Durch den Kauf von Second-Hand oder nachhaltigen Labels unterstützt du umweltfreundliche Praktiken.',
      impact: 'Spart Wasser und reduziert Chemikalien in der Produktion',
      difficulty: 'Leicht',
      timeEstimate: '1-2 Stunden',
      tips: ['Besuche Second-Hand Läden', 'Recherchiere nachhaltige Marken', 'Tausche Kleidung mit Freunden']
    },
    6: {
      id: 6,
      title: 'Fahrrad fahren',
      description: 'Nutze dein Fahrrad statt das Auto für kurze Strecken',
      category: 'Mobilität',
      fullContent: 'Das Fahrrad ist eine umweltfreundliche Alternative zum Auto. Es spart nicht nur CO2-Emissionen, sondern ist auch gesund und kosteneffizient.',
      impact: 'Spart bis zu 1 Tonne CO2 pro Jahr',
      difficulty: 'Leicht',
      timeEstimate: 'Je nach Strecke',
      tips: ['Plane deine Routen', 'Investiere in ein gutes Fahrrad', 'Nutze es für tägliche Besorgungen']
    },
    7: {
      id: 7,
      title: 'LED-Lampen',
      description: 'Wechsle zu LED-Lampen und spare bis zu 75% Energie',
      category: 'Energie',
      fullContent: 'LED-Lampen verbrauchen deutlich weniger Strom als Glühlampen und halten länger. Ein einfacher Wechsel mit großer Wirkung.',
      impact: 'Spart 75% Stromverbrauch und 15€ pro Lampe pro Jahr',
      difficulty: 'Sehr leicht',
      timeEstimate: '10 Minuten',
      tips: ['Ersetze alte Glühlampen schrittweise', 'Wähle die richtige Farbtemperatur', 'Spare Geld durch Mengenrabatte']
    },
    8: {
      id: 8,
      title: 'Lokale Produkte',
      description: 'Kaufe Produkte von lokalen Bauern und Herstellern',
      category: 'Ernährung',
      fullContent: 'Lokale Produkte haben kürzere Transportwege und unterstützen die lokale Wirtschaft. Sie sind oft frischer und geschmackvoller.',
      impact: 'Reduziert Transportemissionen um bis zu 80%',
      difficulty: 'Leicht',
      timeEstimate: '1-2 Stunden Einkaufen',
      tips: ['Besuche Bauernmärkte', 'Unterstütze lokale Läden', 'Bekenne dich zur Saisonalität']
    }
  };

  const action = actionsData[id];

  if (!action) {
    return <div style={{ padding: '20px' }}>Handlung nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <h1>{action.title}</h1>

      {/* Kategorie Badge */}
      <span
        style={{
          display: 'inline-block',
          backgroundColor: '#e8f5e8',
          color: '#128b09ff',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        {action.category}
      </span>

      {/* Beschreibung */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Beschreibung</h2>
        <p>{action.fullContent}</p>
      </div>

      {/* Informationen */}
      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <h3>Informationen</h3>
        <p><strong>Schwierigkeit:</strong> {action.difficulty}</p>
        <p><strong>Geschätzte Zeit:</strong> {action.timeEstimate}</p>
        <p><strong>Umweltauswirkung:</strong> {action.impact}</p>
      </div>

      {/* Tipps */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Tipps zum Umsetzen:</h3>
        <ul>
          {action.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Complete Button */}
      <button
        onClick={() => setIsCompleted(!isCompleted)}
        style={{
          width: '100%',
          padding: '15px',
          backgroundColor: isCompleted ? '#999' : '#128b09ff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '20px',
        }}
      >
        {isCompleted ? '✓ Abgeschlossen' : 'Handlung durchführen'}
      </button>
    </div>
  );
};

export default ActionDetail;
