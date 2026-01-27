import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix für Leaflet Marker Icons (bekanntes Problem mit Webpack/Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Komponente um Karte auf neue Koordinaten zu zentrieren
const MapUpdater = ({ center }) => {
  const map = useMap();
  if (center) {
    map.setView(center, 13);
  }
  return null;
};

// Mock-Daten für verschiedene Kategorien (für Prototyp)
const MOCK_PLACES = {
  Shopping: [
    { id: '1', name: 'Unverpackt Chemnitz', address: 'Zwickauer Str. 132, 09116 Chemnitz', rating: 4.8 },
    { id: '2', name: 'Bio-Markt Naturkost', address: 'Theaterplatz 4, 09111 Chemnitz', rating: 4.5 },
    { id: '3', name: 'Weltladen Chemnitz', address: 'Innere Klosterstr. 1, 09111 Chemnitz', rating: 4.7 },
    { id: '4', name: 'Reformhaus Bacher', address: 'Straße der Nationen 12, 09111 Chemnitz', rating: 4.3 },
  ],
  Natur: [
    { id: '1', name: 'Stadtpark Chemnitz', address: 'Parkstraße, 09111 Chemnitz', rating: 4.6 },
    { id: '2', name: 'Botanischer Garten', address: 'Leipziger Str. 147, 09114 Chemnitz', rating: 4.8 },
    { id: '3', name: 'Schlossteich', address: 'Schloßberg, 09113 Chemnitz', rating: 4.4 },
    { id: '4', name: 'Küchwald', address: 'Küchwaldring, 09113 Chemnitz', rating: 4.5 },
  ],
  Energie: [
    { id: '1', name: 'Energieberatung Chemnitz', address: 'Brückenstr. 10, 09111 Chemnitz', rating: 4.2 },
    { id: '2', name: 'Solar-Fachhandel Meyer', address: 'Zwickauer Str. 54, 09112 Chemnitz', rating: 4.6 },
    { id: '3', name: 'LED-Shop Sachsen', address: 'Limbacher Str. 89, 09116 Chemnitz', rating: 4.4 },
  ],
  Abfall: [
    { id: '1', name: 'Wertstoffhof Chemnitz-Nord', address: 'Blankenburgstr. 62, 09114 Chemnitz', rating: 4.1 },
    { id: '2', name: 'Recyclinghof Süd', address: 'Südring 135, 09116 Chemnitz', rating: 4.0 },
    { id: '3', name: 'Altkleider-Container DRK', address: 'Mühlenstr. 22, 09111 Chemnitz', rating: 4.3 },
  ],
  Mobilität: [
    { id: '1', name: 'Fahrrad XXL Emporon', address: 'Am Walkgraben 13, 09119 Chemnitz', rating: 4.5 },
    { id: '2', name: 'Radhaus Chemnitz', address: 'Augustusburger Str. 102, 09126 Chemnitz', rating: 4.7 },
    { id: '3', name: 'CVAG Kundenzentrum', address: 'Carl-von-Ossietzky-Str. 186, 09127 Chemnitz', rating: 4.2 },
    { id: '4', name: 'Nextbike Station Zentrum', address: 'Markt, 09111 Chemnitz', rating: 4.4 },
  ],
  Ernährung: [
    { id: '1', name: 'Wochenmarkt Chemnitz', address: 'Markt, 09111 Chemnitz', rating: 4.6 },
    { id: '2', name: 'Hofladen Grünefeld', address: 'Dorfstr. 45, 09224 Grüna', rating: 4.8 },
    { id: '3', name: 'BioCompany', address: 'Zwickauer Str. 12, 09112 Chemnitz', rating: 4.4 },
    { id: '4', name: 'Bauernmarkt Röhrsdorf', address: 'Hauptstr. 78, 09247 Röhrsdorf', rating: 4.7 },
  ],
};

const LocationMap = ({ actionCategory }) => {
  const [postalCode, setPostalCode] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  const geocodePostalCode = async (code) => {
    try {
      setLoading(true);
      setError('');
      
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

  const searchPlaces = async (coords) => {
    try {
      setLoading(true);
      
      // Mock-Daten basierend auf Kategorie laden
      const mockData = MOCK_PLACES[actionCategory] || MOCK_PLACES['Shopping'];
      
      // Füge zufällige Koordinaten um den gesuchten Ort hezu (für Kartenanzeige)
      const placesWithCoords = mockData.map((place, index) => ({
        ...place,
        lat: coords.lat + (Math.random() - 0.5) * 0.05,
        lng: coords.lng + (Math.random() - 0.5) * 0.05,
        distance: (Math.random() * 4 + 0.5).toFixed(1) // 0.5 - 4.5 km
      }));
      
      // Sortiere nach "Entfernung"
      placesWithCoords.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      
      setPlaces(placesWithCoords);
    } catch (err) {
      console.error('Fehler bei der Ortssuche:', err);
      setError('Fehler bei der Suche nach Orten.');
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (postalCode.trim()) {
      geocodePostalCode(postalCode);
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    marginBottom: '15px'
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Orte in deiner Nähe</h3>
      
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

      {coordinates && (
        <MapContainer
          center={[coordinates.lat, coordinates.lng]}
          zoom={13}
          style={{
            width: '100%',
            height: '300px',
            borderRadius: '8px',
            marginBottom: '15px'
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={[coordinates.lat, coordinates.lng]} />
          
          {/* Standort-Marker */}
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>Dein Standort</Popup>
          </Marker>
          
          {/* Orte-Marker */}
          {places.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lng]}
              eventHandlers={{
                click: () => setSelectedPlace(place),
              }}
            >
              <Popup>
                <div style={{ maxWidth: '200px' }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>{place.name}</h4>
                  <p style={{ margin: '0 0 5px 0', fontSize: '12px' }}>
                    {place.address}
                  </p>
                  {place.rating && (
                    <p style={{ margin: '0', fontSize: '12px' }}>
                      ⭐ Rating: {place.rating}/5
                    </p>
                  )}
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#128b09ff' }}>
                    📍 {place.distance} km entfernt
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

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
                onClick={() => setSelectedPlace(place)}
                style={{
                  padding: '12px',
                  borderBottom: index < places.length - 1 ? '1px solid #eee' : 'none',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f5e8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#fff'}
              >
                <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
                  {place.name}
                </p>
                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>
                  {place.address}
                </p>
                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>
                  Entfernung: {place.distance.toFixed(1)} km
                </p>
                {place.rating && (
                  <p style={{ margin: '0', fontSize: '12px', color: '#128b09ff' }}>
                    ⭐ {place.rating}/5
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {coordinates && places.length === 0 && !error && !loading && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
          color: '#999'
        }}>
          <p>Keine Orte in dieser Kategorie gefunden.</p>
        </div>
      )}

      {!coordinates && (
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '15px',
          borderRadius: '5px',
          color: '#128b09ff',
          fontSize: '14px'
        }}>
          <p>
            Gib deine Postleitzahl ein, um relevante Orte in deiner Nähe zu finden auf der Karte.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
