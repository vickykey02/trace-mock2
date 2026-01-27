import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTipps } from '../context/TippsContext';

const NewGoal = () => {
  const navigate = useNavigate();
  const { tipps } = useTipps();

  const [formData, setFormData] = useState({
    category: '',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Unique Kategorien aus den Handlungen
  const categories = [...new Set(tipps.map(tipp => tipp.category))];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validierung
    if (!formData.category || !formData.description.trim()) {
      alert('Bitte füllen Sie alle Felder aus');
      return;
    }

    // Hier könnte man die Daten an einen Server senden
    console.log('Eingereichtes Ziel:', formData);

    setIsSubmitting(true);
    setSubmitted(true);

    // Automatische Weiterleitung nach 2 Sekunden
    setTimeout(() => {
      navigate('/goals');
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
            Danke für dein neues Ziel! Gleich kannst du weitere Ziele erkunden...
          </p>
          <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
            (oder <a href="/goals" style={{ color: '#128b09ff', textDecoration: 'none', fontWeight: 'bold' }}>klicke hier</a> zum sofortigen Zurückkehren)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <h1>Neues Ziel erstellen</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Bitte fülle alle Felder aus!
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
            <option value="">-- Handlung auswählen --</option>
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
            ausführliche Beschreibung/Anleitung *
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

export default NewGoal;






{/*}
//komplett selbst schreiben 
import React, { useState } from 'react';
import { GoalCard } from '../pages/Goals.jsx';
import { Goals } from '../pages/Goals.jsx';

const NewGoal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState('');
  const [unit, setUnit] = useState('');	
  <div>
	Hallo.
  </div>

};

//Vorauswahl bestehende Ziele


//Eingabefelder neues Ziel



export default NewGoal;
*/}