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
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validierung
    if (!formData.category || !formData.description.trim()) {
      alert('Bitte füllen Sie alle Felder aus');
      return;
    }

    // Speichere in SubmittedActionsContext mit Status "pending"
    addSubmittedAction(formData);
    console.log('Beigetragene Handlung:', formData);

    setIsSubmitting(true);
    setSubmitted(true);

    // Automatische Weiterleitung nach 2 Sekunden
    setTimeout(() => {
      navigate('/');
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
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Zeitpunkt, Ort und Kurzbeschreibung *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Beschreibe die Handlung und wann und wo du sie ausgeführt hast."
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
          {isSubmitting ? 'Wird eingereicht...' : 'Absenden'}
        </button>
      </form>
    </div>
  );
};

export default Contribute;
