//noch aufbauen aber sehr basic und statisch

const Settings = () => {
  return (
    <div>
      <h1>Einstellungen</h1>
      <div
      style = {{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>
        <h1>Personalisierung</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
      <div>
        <h1>Datenschutz</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
      <div>
        <h1>Benachrichtigungen</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
      <div>
        <h1>Allgemein</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
    </div>
  );
};

export default Settings;
