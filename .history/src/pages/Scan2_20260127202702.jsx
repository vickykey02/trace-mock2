//kann weg

import { useState } from 'react';
import QrReader from '../components/QrReader';

const Scan = () => {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      {!showScanner ? (
        <div style={{ textAlign: 'center' }}>
          <h1>QR-Code scannen</h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Klicke auf den Button um die Kamera zu öffnen
          </p>
          <button
            onClick={() => setShowScanner(true)}
            style={{
              backgroundColor: '#128b09',
              color: '#fff',
              padding: '15px 40px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s'
            }}
          >
            QR-Code scannen
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setShowScanner(false)}
            style={{
              marginBottom: '20px',
              padding: '10px 20px',
              backgroundColor: '#e0e0e0',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ← Zurück
          </button>
          <QrReader />
        </div>
      )}
    </div>
  );
};


export default Scan;