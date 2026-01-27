import { Link } from 'react-router-dom';
import { useState } from 'react';
import ScanMethod from '../popups/ScanMethod';
import KnowledgeType from '../popups/KnowledgeType';

const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#4abc96',
        borderTop: '1px solid #4abc96',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 0',
        zIndex: 1000,
      }}>
        <Link to="/progress" style={{ textDecoration: 'none' }}>
          <img src="/progress.png" alt="Progress" style={{ width: '24px', height: '24px' }} />
        </Link>
        {/*<Link to="/knowledge-base2" style={{ textDecoration: 'none' }}>
         <img src="/idea.png" alt="Knowledge Base" style={{ width: '24px', height: '24px' }} />
        </Link>*/}

		<button onClick={() => setIsOpen(true)} style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}>
          <img src="/idea.png" alt="Knowledge Base" style={{ width: '24px', height: '24px' }} />
        </button>


        <Link to="/home" style={{ textDecoration: 'none' }}>
          <img src="/home.png" alt="Home" style={{ width: '24px', height: '24px' }} />
        </Link>

        <button onClick={() => setIsOpen(true)} style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}>
          <img src="/plus.png" alt="Add" style={{ width: '24px', height: '24px' }} />
        </button>

        <Link to="/past-and-rewards" style={{ textDecoration: 'none' }}>
          <img src="/clock.png" alt="Past & Rewards" style={{ width: '24px', height: '24px' }} />
        </Link>
      </nav>
      <ScanMethod isOpen={isOpen} onClose={() => setIsOpen(false)} />
		<KnowledgeType isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default BottomNav; 