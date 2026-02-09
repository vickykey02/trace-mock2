const PageHeader = ({ title }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
      position: 'relative',
      marginBottom: '20px',
      minHeight: '40px',
    }}>
      {/* Platzhalter links für den ReturnButton (der ist absolut positioniert in App.jsx) */}
      <div style={{ width: '40px' }} />
      
      <h1 style={{
        margin: 0,
        flex: 1,
        textAlign: 'center',
        fontSize: '24px',
      }}>
        {title}
      </h1>
      
      {/* Platzhalter rechts für Symmetrie */}
      <div style={{ width: '40px' }} />
    </div>
  );
};

export default PageHeader;
