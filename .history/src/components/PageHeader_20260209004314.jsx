const PageHeader = ({ title }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginBottom: '20px',
      marginTop: '-15px',
      minHeight: '40px',
    }}>
      {/* Platzhalter links für den ReturnButton (der ist absolut positioniert in App.jsx) */}
      <div style={{ width: '40px' }} />
      
      <h1 style={{
        margin: 0,
        flex: 1,
        textAlign: 'center',
        fontSize: '24px',
        lineHeight: '40px',
      }}>
        {title}
      </h1>
      
      {/* Platzhalter rechts für Symmetrie */}
      <div style={{ width: '40px' }} />
    </div>
  );
};

export default PageHeader;
