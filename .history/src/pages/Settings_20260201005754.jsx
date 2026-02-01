//noch aufbauen aber sehr basic und statisch

const Settings = () => {
  return (
    <div>
    <div
      style={{ padding: '30px', paddingBottom: '100px' }}>
      <h1>Einstellungen</h1>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <h1>Personalisierung</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <h1>Datenschutz</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <h1>Benachrichtigungen</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <h1>Allgemein</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
    </div>
  );
};

export default Settings;
