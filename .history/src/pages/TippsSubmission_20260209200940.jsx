import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTipps } from '../context/TippsContext';
import PageHeader from '../components/PageHeader';

const TippsSubmission = () => {
  const navigate = useNavigate();
  const { tipps } = useTipps();

  const [formData, setFormData] = useState({
    title : '', 
    category: '',
    shortDescription: '',
    description: '',
    images: [] 
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);

  // Unique Kategorien aus den Handlungen
  //const categories = [...new Set(tipps.map(tipp => tipp.category))];
  const categories = ['Allgemeine Nachhaltigkeit', 'Shopping', 'Mobilität', 'Energie', 'Haushalt', 'Abfall', 'Recycling', 'Natur', 'Ernährung', 'Freizeit', 'Bildung', 'Soziales', 'Sonstiges'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      alert('Maximal 5 Bilder erlaubt');
      return;
    }
    
    // Erstelle Preview-URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreview(prev => [...prev, ...newPreviews]);
    
    // Speichere Dateien im formData
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    // Revoke URL to prevent memory leaks
    URL.revokeObjectURL(imagePreview[index]);
    
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validierung
    if (!formData.category || !formData.description.trim() || !formData.title.trim() || !formData.shortDescription.trim() || formData.images.length === 0) {
      alert('Bitte füllen Sie alle Felder aus');
      return;
    }

    // Hier könnte man die Daten an einen Server senden
    console.log('Eingereichter Tipp:', formData);

    setIsSubmitting(true);
    setSubmitted(true);

    // Automatische Weiterleitung nach 2 Sekunden
    setTimeout(() => {
      navigate('/tipps');
    }, 2000);
  };

  if (submitted) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', paddingBottom: '100px' }}>
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '40px',
          borderRadius: '10px',
          border: '2px solid #128b09ff'
        }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#128b09ff', margin: '0 0 10px 0' }}>
            ✓ Erfolgreich eingereicht!
          </p>
          <p style={{ color: '#666', margin: '0 0 20px 0' }}>
            Danke für deinen Beitrag! Gleich kannst du weitere Tipps erkunden...
          </p>
          <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
            (oder <a href="/tipps" style={{ color: '#128b09ff', textDecoration: 'none', fontWeight: 'bold' }}>klicke hier</a> zum sofortigen Zurückkehren)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <PageHeader title="Tipp einreichen" />
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Bitte fülle alle Felder aus!
      </p>

      <form onSubmit={handleSubmit}>

        {/* Freitextfeld Titel */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Titel *
          </label>
          <textarea
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Gib deinem Tipp einen aussagekräftigen Titel"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              //minHeight: '200px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Kategorie Dropdown */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Kategorie *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxSizing: 'border-box',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
          >
            <option value="">-- Kategorie auswählen --</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Freitextfeld */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Kurzbeschreibung *
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            placeholder="Beschreibe deinen Tipp oder Trick in 1-2 Sätzen"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              minHeight: '200px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Freitextfeld */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Schritt-für-Schritt Anleitung *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Beschreibe alle Schritte, die zutun sind"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              minHeight: '200px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Bilder Upload */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Bitte lade hier aussagekräftige Bilder oder Videos hoch.  *
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#f0f0f0',
              border: '2px dashed #ccc',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              width: '100%',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
          >
            📷 Bilder / Videos / Links einfügen
          </label>
          
          {/* Bildvorschau */}
          {imagePreview.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '15px'
            }}>
              {imagePreview.map((src, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img
                    src={src}
                    alt={`Vorschau ${index + 1}`}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #ddd'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#ff4444',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1,
                      padding: 0
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Absenden Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: isSubmitting ? '#999' : '#128b09ff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.2s'
          }}
        >
          {isSubmitting ? 'Wird eingereicht...' : 'Einreichen'}
        </button>
      </form>
    </div>
  );
};

export default TippsSubmission;
