import { useState, useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';

const Scan = () => {
  const scannerContainerRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const qrScannerRef = useRef(null);
  const [error, setError] = useState(null);

  const cleanup = () => {
    if (qrScannerRef.current) {
      try {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      } catch (err) {
        console.error('Error during cleanup:', err);
      }
    }
    setIsScanning(false);
  };

  const handleQRDetected = (result) => {
    if (showPopup) return; // Verhindere mehrfaches Triggern

    const mockQRCodes = [
      { id: 'action-1', title: 'Recycling durchgeführt', points: 3, icon: '♻️' },
      { id: 'action-2', title: 'Unverpackt eingekauft', points: 10, icon: '🛍️' },
      { id: 'action-3', title: 'Fahrrad gefahren', points: 10, icon: '🚴' },
      { id: 'action-4', title: 'Wasser gespart', points: 5, icon: '💧' },
      { id: 'action-5', title: 'LED-Lampe installiert', points: 8, icon: '💡' },
    ];

    // In real app, use result.data to look up the actual action
    const randomCode = mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)];

    console.log('QR Code detected:', result.data);
    setScannedData(randomCode);
    setShowPopup(true);
  };

  const initializeScanner = async () => {
    try {
      setError(null);
      
      if (!scannerContainerRef.current) {
        console.error('Scanner container not available');
        setHasPermission(false);
        return;
      }

      // Zerstöre alten Scanner wenn existiert
      if (qrScannerRef.current) {
        await cleanup();
      }

      // Erstelle QrScanner Instanz - QrScanner erstellt sein eigenes Video/Canvas
      qrScannerRef.current = new QrScanner(
        scannerContainerRef.current,
        handleQRDetected,
        {
          onDecodeError: (error) => {
            // Fehler ignorieren, das ist normal beim Scannen
            console.debug('QR decode error:', error?.message);
          },
          preferredCamera: 'environment',
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScans: Infinity, // Unbegrenzt scannen
        }
      );

      await qrScannerRef.current.start();
      setHasPermission(true);
      setIsScanning(true);

      console.log('QR Scanner erfolgreich gestartet');
    } catch (err) {
      console.error('Kamera-Fehler:', err);
      setError(err.message);
      setHasPermission(false);
      setIsScanning(false);
    }
  };

  const handlePermissionRequest = async () => {
    console.log('Permission Button clicked');
    setHasPermission(null);
    await initializeScanner();
  };

  const handleReScan = () => {
    setShowPopup(false);
    setScannedData(null);
  };

  useEffect(() => {
    // Versuche automatisch die Kamera zu starten beim Mount
    initializeScanner();
    return () => cleanup();
  }, []);

  if (hasPermission === false) {
    return (
      <div style={{ padding: '30px', textAlign: 'center', paddingBottom: '100px' }}>
        <div style={{
          backgroundColor: '#fff3cd',
          padding: '40px 20px',
          borderRadius: '12px',
          border: '2px solid #ffc107'
        }}>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>📷</div>
          <h2 style={{ margin: '0 0 10px 0', color: '#856404' }}>
            Kamera-Zugriff erforderlich
          </h2>
          <p style={{ color: '#666', margin: '0 0 25px 0', fontSize: '16px' }}>
            Um QR-Codes zu scannen, benötigen wir Zugriff auf deine Kamera.
          </p>
          <button
            onClick={handlePermissionRequest}
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
            Kamera aktivieren
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h1>QR-Code scannen</h1>
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '16px' }}>
        Halte einen QR-Code vor die Kamera um eine Handlung zu registrieren
      </p>

      {/* Kamera-Stream - QrScanner erstellt sein eigenes Video/Canvas hier */}
      <div
        ref={scannerContainerRef}
        style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          marginBottom: '20px',
          maxHeight: '400px',
          backgroundColor: '#000',
          width: '100%',
        }}
      >
        {/* QrScanner wird den Video-Stream und Canvas hier selbst einfügen */}
      </div>

      {/* Hinweis */}
      <div style={{
        backgroundColor: '#e8f5e8',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #128b09',
        color: '#128b09',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        💡 Tipp: Stelle sicher, dass der QR-Code gut beleuchtet ist und in der Mitte des Rahmens liegt
      </div>

      {/* Popup nach QR-Scan */}
      {showPopup && scannedData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px',
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '40px 30px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.4)',
            animation: 'slideUp 0.3s ease-out'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>
              {scannedData.icon}
            </div>
            <div style={{
              fontSize: '40px',
              color: '#128b09',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              ✓
            </div>
            <h2 style={{ color: '#333', margin: '0 0 10px 0', fontSize: '20px' }}>
              Erfolgreich gescannt!
            </h2>
            <p style={{ color: '#666', margin: '0 0 20px 0', fontSize: '16px' }}>
              {scannedData.title}
            </p>
            <div style={{
              backgroundColor: '#e8f5e8',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '25px',
              color: '#128b09',
              fontWeight: 'bold',
              fontSize: '28px'
            }}>
              +{scannedData.points} Punkte
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleReScan}
                style={{
                  flex: 1,
                  backgroundColor: '#128b09',
                  color: '#fff',
                  padding: '15px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  transition: 'background-color 0.2s'
                }}
              >
                Erneut scannen
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setScannedData(null);
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#e0e0e0',
                  color: '#333',
                  padding: '15px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  transition: 'background-color 0.2s'
                }}
              >
                Fertig
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Scan;