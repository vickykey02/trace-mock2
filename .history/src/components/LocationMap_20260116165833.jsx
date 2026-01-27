import { useState, useRef, useEffect } from 'react';

const LocationMap = ({ actionCategory }) => {
  const [postalCode, setPostalCode] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // Google Maps Geocoding API - Postleitzahl zu Koordinaten
  const geocodePostalCode = async (code) => {
    try {
      setLoading(true);
      setError('');
      
      // Verwende die OpenStreetMap Nominatim API (kostenlos, keine API-Keys erforderlich)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${code}&country=DE&format=json`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const result = data[0];
        const coords = {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon)
        };
        setCoordinates(coords);
        searchPlaces(coords);
      } else {
        setError('Postleitzahl nicht gefunden. Bitte überprüfe die Eingabe.');
        setPlaces([]);
      }
    } catch (err) {
      setError('Fehler beim Laden der Orte. Bitte später erneut versuchen.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Suche nach relevanten Orten in der Nähe
  const searchPlaces = async (coords) => {
    try {
      setLoading(true);
      
      // Verschiedene Such-Strategien je nach Kategorie
      let queries = [];
      
      if (actionCategory === 'Shopping') {
        // Unverpackt-Läden, Bioläden, Supermärkte
        queries = [
          `[bbox:${coords.lat - 0.05},${coords.lng - 0.05},${coords.lat + 0.05},${coords.lng + 0.05}];(node["shop"="health_food"];way["shop"="health_food"];node["shop"="supermarket"];way["shop"="supermarket"];node["bulk_purchase"="yes"];way["bulk_purchase"="yes"];);out center;`,
          `[bbox:${coords.lat - 0.05},${coords.lng - 0.05},${coords.lat + 0.05},${coords.lng + 0.05}];(node["shop"];way["shop"];);out center;`
        ];
      } else if (actionCategory === 'Natur') {
        // Parks, Gärten, Naturschutzgebiete
        queries = [
          `[bbox:${coords.lat - 0.05},${coords.lng - 0.05},${coords.lat + 0.05},${coords.lng + 0.05}];(node["leisure"="park"];way["leisure"="park"];node["leisure"="garden"];way["leisure"="garden"];);out center;`
        ];
      } else if (actionCategory === 'Energie') {
        // Energieberatung, Läden
        queries = [
          `[bbox:${coords.lat - 0.05},${coords.lng - 0.05},${coords.lat + 0.05},${coords.lng + 0.05}];(node["shop"="hardware"];way["shop"="hardware"];node["amenity"="public_building"];way["amenity"="public_building"];);out center;`
        ];
      } else if (actionCategory === 'Abfall') {
        // Recycling-Zentren
        queries = [
          `[bbox:${coords.lat - 0.05},${coords.lng - 0.05},${coords.lat + 0.05},${coords.lng + 0.05}];(node["amenity"="recycling"];way["amenity"="recycling"];);out center;`
        ];
      } else if (actionCategory === 'Mobilität') {
        // Fahrradläden, Bushaltestellen
        queries = [
          `[bbox:${coords.lat - 0.05},${coords.lng - 0.05},${coords.lat + 0.05},${coords.lng + 0.05}];(node["shop"="bicycle"];way["shop"="bicycle"];node["amenity"="bus_station"];way["amenity"="bus_station"];);out center;`
        ];
      } else if (actionCategory === 'Ernährung') {
        // Bio-Läden, Märkte
        queries = [
          `[bbox:${coords.lat - 0.05},${coords.lng - 0.05},${coords.lat + 0.05},${coords.lng + 0.05}];(node["shop"="health_food"];way["shop"="health_food"];node["shop"="farm"];way["shop"="farm"];node["amenity"="marketplace"];way["amenity"="marketplace"];);out center;`
        ];
      }

      let foundPlaces = [];
      
      // Führe Queries nacheinander aus
      for (let query of queries) {
        try {
          const response = await fetch(
            `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
            { timeout: 10000 }
          );
          const data = await response.json();
          
          if (data.elements && data.elements.length > 0) {
            data.elements.forEach((element) => {
              const lat = element.center?.lat || element.lat;
              const lon = element.center?.lon || element.lon;
              const name = element.tags?.name || 'Unbekannter Ort';
              
              if (lat && lon) {
                // Verhindere Duplikate
                const isDuplicate = foundPlaces.some(p => p.name === name && Math.abs(p.lat - lat) < 0.001);
                if (!isDuplicate) {
                  foundPlaces.push({
                    id: element.id,
                    name: name,
                    lat: lat,
                    lon: lon,
                    distance: calculateDistance(coords.lat, coords.lng, lat, lon)
                  });
                }
              }
            });
          }
          
          // Wenn wir genug Ergebnisse haben, brich ab
          if (foundPlaces.length >= 5) break;
        } catch (queryErr) {
          console.error('Fehler bei Overpass-Query:', queryErr);
        }
      }
      
      // Sortiere nach Entfernung und begrenzen auf 10
      foundPlaces
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10);
      
      setPlaces(foundPlaces.slice(0, 10));
    } catch (err) {
      console.error('Fehler bei der Ortssuche:', err);
      setError('Fehler bei der Suche nach Orten. Bitte versuche es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  // Berechne Entfernung zwischen zwei Punkten (Haversine-Formel)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Erdradius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (postalCode.trim()) {
      geocodePostalCode(postalCode);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Orte in deiner Nähe</h3>
      
      {/* Postleitzahl Input */}
      <form onSubmit={handleSearch} style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Gib deine Postleitzahl ein..."
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#128b09ff',
              color: '#fff',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Wird gesucht...' : 'Suchen'}
          </button>
        </div>
      </form>

      {/* Fehler-Meldung */}
      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '10px'
        }}>
          {error}
        </div>
      )}

      {/* Orte-Liste */}
      {places.length > 0 && (
        <div>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            {places.length} Ort(e) gefunden:
          </p>
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '5px'
          }}>
            {places.map((place, index) => (
              <div
                key={place.id}
                style={{
                  padding: '12px',
                  borderBottom: index < places.length - 1 ? '1px solid #eee' : 'none',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff'
                }}
              >
                <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
                  {place.name}
                </p>
                <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                  Entfernung: {place.distance.toFixed(1)} km
                </p>
                <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
                  Lat: {place.lat.toFixed(4)}, Lon: {place.lon.toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leere Zustand */}
      {coordinates && places.length === 0 && !error && !loading && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
          color: '#999'
        }}>
          <p>Keine Orte in dieser Kategorie gefunden. Versuche es mit einem anderen Suchbereich.</p>
        </div>
      )}

      {/* Anleitung */}
      {!coordinates && (
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '15px',
          borderRadius: '5px',
          color: '#128b09ff',
          fontSize: '14px'
        }}>
          <p>
            Gib deine Postleitzahl ein, um relevante Orte in deiner Nähe zu finden. 
            Diese App zeigt dir die nächsten Läden und Einrichtungen für diese Handlung.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
