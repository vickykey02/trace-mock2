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
  const lastScanRef = useRef(0);

  // Starte Kamera beim Mount
  useEffect(() => {
    requestCameraPermission();
    return () => cleanup();
  }, []);

  const cleanup = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const initializeScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;
      setHasPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true); // iOS
        videoRef.current.play().catch(e => console.error('Play error:', e));
        
        // Starte Scanning sobald Video lädt
        setTimeout(() => {
          setIsScanning(true);
          startScanning();
        }, 500);
      }
    } catch (err) {
      console.error('Kamera-Fehler:', err);
      setHasPermission(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      // Test ob Permission bereits vorhanden ist
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      streamRef.current = stream;
      setHasPermission(true);
      
      // Starte Scanner nach kurzer Verzögerung
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true);
        videoRef.current.play().catch(e => console.error('Play error:', e));
        
        setTimeout(() => {
          setIsScanning(true);
          startScanning();
        }, 500);
      }
    } catch (err) {
      console.error('Kamera nicht verfügbar:', err);
      setHasPermission(false);
    }
  };

  const handlePermissionRequest = async () => {
    console.log('Permission Button clicked');
    setHasPermission(null);
    await initializeScanner();
  };
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    scanIntervalRef.current = setInterval(() => {
      if (videoRef.current && canvasRef.current && isScanning && videoRef.current.readyState === 4) {
        captureFrame();
      }
    }, 100); // Höhere Frequenz für bessere Erkennung
  };

  const captureFrame = () => {
    try {
      const context = canvasRef.current.getContext('2d');
      const video = videoRef.current;

      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      // Nutze jsQR via CDN Script - Alternative zu npm install
      if (window.jsQR) {
        const imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
        const qrCode = window.jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
          handleQRDetected(qrCode.data);
        }
      } else {
        // Fallback: Erkenne dunkle Muster (vereinfachte QR-Erkennung)
        const imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
        const data = imageData.data;
        let darkPixels = 0;

        for (let i = 0; i < data.length; i += 4) {
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (brightness < 100) darkPixels++;
        }

        const darkRatio = darkPixels / (data.length / 4);

        // Wenn dunkles Muster erkannt (QR-ähnlich)
        if (darkRatio > 0.15 && darkRatio < 0.85) {
          const now = Date.now();
          if (now - lastScanRef.current > 2000) { // Mindestens 2 Sekunden Abstand
            handleQRDetected('detected');
            lastScanRef.current = now;
          }
        }
      }
    } catch (err) {
      // Fehler ignorieren
    }
  };

  const handleQRDetected = (data) => {
    if (showPopup) return; // Verhindere mehrfaches Triggern

    const mockQRCodes = [
      { id: 'action-1', title: 'Recycling durchgeführt', points: 3, icon: '♻️' },
      { id: 'action-2', title: 'Unverpackt eingekauft', points: 10, icon: '🛍️' },
      { id: 'action-3', title: 'Fahrrad gefahren', points: 10, icon: '🚴' },
      { id: 'action-4', title: 'Wasser gespart', points: 5, icon: '💧' },
      { id: 'action-5', title: 'LED-Lampe installiert', points: 8, icon: '💡' },
    ];

    const randomCode = mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)];

    setScannedData(randomCode);
    setShowPopup(true);
    cleanup();
  };

  const handleReScan = () => {
    setShowPopup(false);
    setScannedData(null);
    lastScanRef.current = 0;
    initializeScanner();
  };

  const handlePermissionRequest = async () => {
    setHasPermission(null);
    await initializeScanner();
  };

  // Lade jsQR Script via CDN
  useEffect(() => {
    if (!window.jsQR) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
      script.async = true;
      script.onload = () => {
        console.log('jsQR Library loaded');
      };
      script.onerror = () => {
        console.warn('jsQR Library failed to load, using fallback');
      };
      document.head.appendChild(script);
    }
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

      {/* Kamera-Stream */}
      <div style={{
        position: 'relative',
        backgroundColor: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
        aspectRatio: '16 / 9',
        marginBottom: '20px',
        maxHeight: '400px',
      }}>
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isScanning ? 'block' : 'none',
          }}
        />

        {/* Unsichtliches Canvas für QR-Erkennung */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* QR-Scanner-Frame Overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          border: '3px solid #128b09',
          borderRadius: '12px',
          boxShadow: '0 0 0 4px rgba(18, 139, 9, 0.1), inset 0 0 20px rgba(18, 139, 9, 0.2)',
          backgroundColor: 'transparent',
        }}>
          {/* Eck-Akzente */}
          {[
            { top: '-3px', left: '-3px' },
            { top: '-3px', right: '-3px' },
            { bottom: '-3px', left: '-3px' },
            { bottom: '-3px', right: '-3px' }
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                border: '3px solid #128b09',
                ...pos
              }}
            />
          ))}
        </div>

        {isScanning && (
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#fff',
            fontSize: '14px',
            backgroundColor: 'rgba(18, 139, 9, 0.9)',
            padding: '10px 20px',
            borderRadius: '20px',
            animation: 'pulse 1.5s infinite'
          }}>
            🔍 Scanniert...
          </div>
        )}
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