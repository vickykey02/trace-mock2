import { Link } from 'react-router-dom';
import { use, useState } from 'react';
import ScanMethod from '../popups/ScanMethod';
import KnowledgeType from '../popups/KnowledgeType';
import PastOrReward from '../popups/PastOrReward';
import ProgressOrRanking from '../popups/ProgressOrRanking';
import GoalState from '../popups/GoalState';
import { useLocation } from 'react-router-dom';

const BottomNav = () => {
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
  const [isPoROpen, setIsPoROpen] = useState(false);
  const [isPoRaOpen, setIsPoRaOpen] = useState(false);
  const [isGoalStateOpen, setIsGoalStateOpen] = useState(false);
  const location = useLocation();

  const isActive = (paths) => paths.some(p=> location.pathname.startsWith(p));

  const getActiveStyle = (paths) => ({
    background: isActive(paths) ? 'rgba(255,255,255,0.3)' : 'none',
  });

  // Basis-Style für alle Nav-Items (gleichmäßige Breite)
  const navItemStyle = {
    flex: '1 1 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0',
    border: 'none',
    cursor: 'pointer',
  };

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
        justifyContent: 'stretch',
        alignItems: 'stretch',
        padding: 0,
        zIndex: 1000,
        height: 50,
      }}>
        <button onClick={() => setIsPoRaOpen(true)} style={{
          ...navItemStyle,
          ...getActiveStyle(['/progress', '/ranking']),
        }}>
          <img src="./trophy.png" alt="ProgressOrRanking" style={{ width: '24px', height: '24px' }} />
        </button>

        {/*<Link to="/progress" style={{ textDecoration: 'none' }}>
          <img src="/progress.png" alt="Progress" style={{ width: '24px', height: '24px' }} />
        </Link>
        <Link to="/knowledge-base2" style={{ textDecoration: 'none' }}>
         <img src="/idea.png" alt="Knowledge Base" style={{ width: '24px', height: '24px' }} />
        </Link>*/}

		<button onClick={() => setIsKnowledgeOpen(true)} style={{
          ...navItemStyle,
          ...getActiveStyle(['/knowledge-base2', '/tipps', '/knowledge', '/likes', '/tipp-detail', '/tipps-submission', '/remember', '/submit']),
        }}>
          <img src="./idea.png" alt="Knowledge Base" style={{ width: '24px', height: '24px' }} />
        </button>


        <Link to="/home" style={{ 
          ...navItemStyle, 
          textDecoration: 'none', 
          ...getActiveStyle(['/home', '/friends', '/notifications', '/settings', '/goals', '/Explore', '/favorites', '/personalization', '/new-goal', '/profile']), 
        }}>
          <img src="./home.png" alt="Home" style={{ width: '24px', height: '24px' }} />
        </Link>

        <button onClick={() => setIsGoalStateOpen(true)} style={{
          ...navItemStyle,
          ...getActiveStyle(['/goals', '/done-goals', '/new-goal', '/goal-detail']),
        }}>
          <img src="./target.png" alt="Add" style={{ width: '24px', height: '24px' }} />
        </button>

        <button onClick={() => setIsPoROpen(true)} style={{
          ...navItemStyle,
          ...getActiveStyle(['/past', '/rewards', '/reward-detail', '/impact']),
        }}>
          <img src="./progress.png" alt="PastOrReward" style={{ width: '24px', height: '24px' }} />
        </button>

        {/*<Link to="/past" style={{ textDecoration: 'none' }}>
          <img src="/clock.png" alt="Past & Rewards" style={{ width: '24px', height: '24px' }} />
        </Link>*/}
      </nav>
      <ScanMethod isOpen={isScanOpen} onClose={() => setIsScanOpen(false)} />
		<KnowledgeType isOpen={isKnowledgeOpen} onClose={() => setIsKnowledgeOpen(false)} />
      <PastOrReward isOpen={isPoROpen} onClose={() => setIsPoROpen(false)} />
      <ProgressOrRanking isOpen={isPoRaOpen} onClose={() => setIsPoRaOpen(false)} />
      <GoalState isOpen={isGoalStateOpen} onClose={() => setIsGoalStateOpen(false)} />
    </>
  );
};

export default BottomNav; 