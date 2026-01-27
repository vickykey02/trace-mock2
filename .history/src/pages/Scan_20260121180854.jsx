import { useState, useEffect, useRef } from 'react';

const Scan = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Starte Kamera beim Mount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      // Stoppe vorherigen Stream falls vorhanden
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Rückkamera auf Handys
      });
      
      streamRef.current = stream;
      setHasPermission(true);
      setIsScanning(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          startQRScanning();
        };
      }
    } catch (err) {
      console.error('Kamera-Fehler:', err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  const startQRScanning = () => {
    // Stoppe vorherigen Interval falls vorhanden
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    scanIntervalRef.current = setInterval(() => {
      if (videoRef.current && canvasRef.current && isScanning) {
        try {
          const context = canvasRef.current.getContext('2d');
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          
          context.drawImage(videoRef.current, 0, 0);
          
          // Vereinfachte QR-Erkennung - suche nach QR-Codes im Bild
          const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
          detectQRCode(imageData);
        } catch (err) {
          // Fehler ignorieren, Video lädt noch
        }
      }
    }, 500);
  };

  const detectQRCode = (imageData) => {
    // Simulierter QR-Code-Erkennungsalgorithmus
    const data = imageData.data;
    let darkPixels = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (brightness < 100) darkPixels++;
    }
    
    const darkRatio = darkPixels / (data.length / 4);
    
    // Wenn zwischen 20-80% dunkle Pixel (typisch für QR-Codes), könnte ein QR-Code da sein
    if (darkRatio > 0.2 && darkRatio < 0.8 && !showPopup) {
      simulateQRScan();
    }
  };

  const simulateQRScan = () => {
    // Simulierte QR-Code-Daten
    const mockQRCodes = [
      { id: 'action-1', title: 'Recycling durchgeführt', points: 3 },
      { id: 'action-2', title: 'Unverpackt eingekauft', points: 10 },
      { id: 'action-3', title: 'Fahrrad gefahren', points: 10 },
    ];
    
    const randomCode = mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)];
    
    setScannedData(randomCode);
    setShowPopup(true);
    stopCamera();
  };

  const handleReScan = () => {
    setShowPopup(false);
    setScannedData(null);
    startCamera();
  };

  if (hasPermission === false) {
    return (
      <div style={{ padding: '30px', textAlign: 'center', paddingBottom: '100px' }}>
        <h1>Kamera-Zugriff erforderlich</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Bitte erlaube dieser App, auf deine Kamera zuzugreifen, um QR-Codes zu scannen.
        </p>
        <button
          onClick={startCamera}
          style={{
            backgroundColor: '#128b09',
            color: '#fff',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Kamera aktivieren
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h1>QR-Code scannen</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Halte einen QR-Code vor die Kamera
      </p>

      {/* Kamera-Stream */}
      <div style={{
        position: 'relative',
        backgroundColor: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
        aspectRatio: '1',
        marginBottom: '20px',
      }}>
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        
        {/* Unsichtliches Canvas für QR-Erkennung */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* QR-Scanner-Frame */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          border: '3px solid #128b09',
          borderRadius: '8px',
          boxShadow: '0 0 20px rgba(18, 139, 9, 0.5)',
        }} />

        {isScanning && (
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#fff',
            fontSize: '14px',
            backgroundColor: 'rgba(18, 139, 9, 0.8)',
            padding: '8px 16px',
            borderRadius: '20px',
          }}>
            🔍 Scanniert...
          </div>
        )}
      </div>

      {/* Popup nach QR-Scan */}
      {showPopup && scannedData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '30px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>✓</div>
            <h2 style={{ color: '#128b09', margin: '0 0 10px 0' }}>
              Erfolgreich gescannt!
            </h2>
            <p style={{ color: '#666', margin: '0 0 20px 0' }}>
              {scannedData.title}
            </p>
            <div style={{
              backgroundColor: '#e8f5e8',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#128b09',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              +{scannedData.points} Punkte
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleReScan}
                style={{
                  flex: 1,
                  backgroundColor: '#128b09',
                  color: '#fff',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Erneut scannen
              </button>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  flex: 1,
                  backgroundColor: '#e0e0e0',
                  color: '#333',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Fertig
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scan;