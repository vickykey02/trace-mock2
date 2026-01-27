import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderTop: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px 0',
      zIndex: 1000,
    }}>
      <Link to="/progress" style={{ textDecoration: 'none' }}>
        <img src="/progress.png" alt="Progress" style={{ width: '24px', height: '24px' }} />
      </Link>
      <Link to="/knowledge-base" style={{ textDecoration: 'none' }}>
       <img src="/idea.png" alt="Knowledge Base" style={{ width: '24px', height: '24px' }} />
      </Link>
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <img src="/home.png" alt="Home" style={{ width: '24px', height: '24px' }} />
      </Link>
      <Link to="/scan" style={{ textDecoration: 'none', color: '#333', fontSize: '14px' }}>
        Scan
      </Link>
      <Link to="/past-and-rewards" style={{ textDecoration: 'none', color: '#333', fontSize: '14px' }}>
        Past & Rewards
      </Link>
    </nav>
  );
};

export default BottomNav;