import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Home</h1>
      <p>Hier muss auch das Feedback und die narrative Gamification mit hin</p>

      {/* Explore Button */}
      <Link to="/Explore" style={{ textDecoration: 'none' }}>
        <button
          style={{
            backgroundColor: '#128b09ff',
            color: '#fff',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '20px'
          }}
        >
          <img src="/data-analysis.png" alt="Explore" style={{ width: '24px', height: '24px' }} />
        </button>
      </Link>

	  {/* Explore Button */}
      <Link to="/favorites" style={{ textDecoration: 'none' }}>
        <button
          style={{
            backgroundColor: '#128b09ff',
            color: '#fff',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '20px'
          }}
        >
          <img src="/favorite.png" alt="Favoriten" style={{ width: '24px', height: '24px' }} />
        </button>
      </Link>
    </div>
  );
};

export default Home;