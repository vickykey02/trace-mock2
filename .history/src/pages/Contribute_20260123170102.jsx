import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../context/ActionsContext';
import { useSubmittedActions } from '../context/SubmittedActionsContext';

const Contribute = () => {
  const navigate = useNavigate();
  const { actions } = useActions();
  const { addSubmittedAction } = useSubmittedActions();

  const [formData, setFormData] = useState({
    category: '',
    actionName: '',
    description: '',
    date: '',
    location: '',
    images: []
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);

  // Unique Kategorien aus den Handlungen
  const categories = [...new Set(actions.map(action => action.category))];
  const actionNames = actions.map(action => action.title);

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
    if (!formData.category || !formData.description.trim() || !formData.date || !formData.location.trim() || formData.images) {
      alert('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    // Speichere in SubmittedActionsContext mit Status "pending"
    addSubmittedAction(formData);
    console.log('Eingetragene Handlung:', formData);

    setIsSubmitting(true);
    setSubmitted(true);

    // Automatische Weiterleitung nach 4 Sekunden
    setTimeout(() => {
      navigate('/');
    }, 4000);
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
            ✓ Erfolgreich eingereicht! Deine Handlung wird geprüft.
          </p>
          <p style={{ color: '#666', margin: '0 0 20px 0' }}>
            Danke für deinen Beitrag! Du wirst gleich zur Startseite weitergeleitet...
          </p>
          <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
            (oder <a href="/" style={{ color: '#128b09ff', textDecoration: 'none', fontWeight: 'bold' }}>klicke hier</a> zum sofortigen Zurückkehren)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <h1>Handlung erfassen</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Bitte fülle alle Felder wahrheitsgemäß aus!
      </p>

      <form onSubmit={handleSubmit}>
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

		{/* Handlungsart Dropdown */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            gute Tat *
          </label>
          <select
            name="actionName"
            value={formData.actionName}
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
            <option value="">-- Handlung auswählen --</option>
            {actionNames.map(actionName => (
              <option key={actionName} value={actionName}>
                {actionName}
              </option>
            ))}
          </select>
        </div>

        {/* Freitextfeld */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Kurzbeschreibung *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Beschreibe kurz deine Handlung..."
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              minHeight: '100px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Datum */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Datum *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            max={new Date().toISOString().split('T')[0]}
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
          />
        </div>

        {/* Ort */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Ort *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="z.B. Chemnitz, Supermarkt XYZ"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Bilder Upload */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Bitte lade hier deinen Kassenbon und ein Bild deines Produktes hoch.  *
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
            📷 Bilder auswählen
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
                      justifyContent: 'center'
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
          {isSubmitting ? 'Wird eingereicht...' : 'Absenden'}
        </button>
      </form>
    </div>
  );
};

export default Contribute;
