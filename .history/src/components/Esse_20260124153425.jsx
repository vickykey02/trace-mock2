import { useSubmittedActions } from '../context/SubmittedActionsContext';

// Die Chemnitzer Esse als Impact-Anzeige
// Füllt sich von unten nach oben basierend auf dem Punktestand
// 1% Färbung pro 10 Punkte (100% = 1000 Punkte)

const Esse = ({ width = 60, height = 200 }) => {
  const { submitted } = useSubmittedActions();
  
  // Berechne Gesamtpunkte aus eingereichten Handlungen (10 Punkte pro approved)
  const totalPoints = submitted
    .filter(action => action.status === 'approved')
    .length * 10;
  
  // 1% pro 10 Punkte = 100% bei 1000 Punkten
  const fillPercent = Math.min(100, totalPoints / 10);
  
  // Die 7 Farbsegmente der Esse (von unten nach oben)
  const segments = [
	{ color: '#2596be', height: 8 },  // hellblau Fuß
    { color: '#f05157', height: 16 },  // Rot
    { color: '#6fe68e', height: 16 },  // Grün
    { color: '#1daaff', height: 16 },  // himmelblau
    { color: '#fecc5b', height: 16 },  // orange
    { color: '#b16eb7', height: 16 },  // violett
    { color: '#fef052', height: 16 }    // gelb
  ];
  
  // Gesamthöhe der Segmente
  const totalSegmentHeight = segments.reduce((sum, s) => sum + s.height, 0);
  
  // Berechne wie viel Prozent jedes Segment einnimmt (kumulativ von unten)
  let cumulative = 0;
  const segmentsWithPercent = segments.map(s => {
    const startPercent = cumulative;
    cumulative += (s.height / totalSegmentHeight) * 100;
    return { ...s, startPercent, endPercent: cumulative };
  });
  
  // Berechne Füllung für jedes Segment
  const getSegmentFill = (segment) => {
    if (fillPercent >= segment.endPercent) {
      return 1; // Voll gefüllt
    } else if (fillPercent <= segment.startPercent) {
      return 0; // Leer
    } else {
      // Teilweise gefüllt
      return (fillPercent - segment.startPercent) / (segment.endPercent - segment.startPercent);
    }
  };
  
  // SVG Proportionen
  const esseWidth = 12; // Breite der Esse
  const kopfWidth = 16; // Breite des Kopfes
  const viewBoxWidth = 30;
  const viewBoxHeight = 100;
  const centerX = viewBoxWidth / 2;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Clip-Paths für jeden Segment */}
          {segmentsWithPercent.map((segment, index) => {
            const y = viewBoxHeight - (segment.endPercent / 100 * viewBoxHeight);
            const segmentHeight = (segment.height / totalSegmentHeight) * viewBoxHeight;
            const isTop = index === segments.length - 1;
            const w = isTop ? kopfWidth : esseWidth;
            const x = centerX - w / 2;
            
            return (
              <clipPath key={`clip-${index}`} id={`segment-clip-${index}`}>
                <rect 
                  x={x} 
                  y={y} 
                  width={w} 
                  height={segmentHeight} 
                />
              </clipPath>
            );
          })}
        </defs>
        
        {/* Zeichne jedes Segment */}
        {segmentsWithPercent.map((segment, index) => {
          const y = viewBoxHeight - (segment.endPercent / 100 * viewBoxHeight);
          const segmentHeight = (segment.height / totalSegmentHeight) * viewBoxHeight;
          const isTop = index === segments.length - 1;
          const w = isTop ? kopfWidth : esseWidth;
          const x = centerX - w / 2;
          const fill = getSegmentFill(segment);
          const fillHeight = segmentHeight * fill;
          const fillY = y + segmentHeight - fillHeight;
          
          return (
            <g key={index}>
              {/* Schwarzer Rahmen */}
              <rect 
                x={x} 
                y={y} 
                width={w} 
                height={segmentHeight} 
                fill="transparent"
                stroke="#000"
                strokeWidth="1.5"
              />
              
              {/* Farbfüllung (von unten nach oben) */}
              {fill > 0 && (
                <rect 
                  x={x + 0.75} 
                  y={fillY} 
                  width={w - 1.5} 
                  height={fillHeight} 
                  fill={segment.color}
                />
              )}
            </g>
          );
        })}
        
        {/* Kleine Ringe am Kopf */}
        <rect 
          x={centerX - kopfWidth / 2 - 1} 
          y={2} 
          width={kopfWidth + 2} 
          height={3} 
          fill="transparent"
          stroke="#000"
          strokeWidth="1"
        />
      </svg>
      
      {/* Punkteanzeige */}
      <div style={{ 
        marginTop: '8px', 
        fontSize: '12px', 
        fontWeight: 'bold',
        color: '#333'
      }}>
        {totalPoints} Punkte
      </div>
      <div style={{ 
        fontSize: '10px', 
        color: '#666'
      }}>
        {fillPercent.toFixed(0)}% gefüllt
      </div>
    </div>
  );
};

export default Esse;
