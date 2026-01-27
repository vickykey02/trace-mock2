import { useState, useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import QrReader from '../components/QrReader';

const Scan = () => {

  return (
    <button
            onClick={QrReader} 
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
  )
};


export default Scan;