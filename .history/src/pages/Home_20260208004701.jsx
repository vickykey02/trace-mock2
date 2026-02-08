//überlegen ob oben Home oder TRACE oder so stehen soll

import { Link } from 'react-router-dom';
import { useActions } from '../context/ActionsContext';
import { useKnowledge } from '../context/KnowledgeContext';
import Esse from '../components/Esse';
import {usePoints} from '../context/PointsContext';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationsContext';

const Home = () => {
  const { actions: allActions } = useActions();
  const { knowledge } = useKnowledge();
  const {points, addPoints} = usePoints();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  const handleAction = () => {
    addPoints(10, 'Testaktion');
  };

  // Fakt des Tages basierend auf dem aktuellen Datum
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const faktDesTages = knowledge[dayOfYear % knowledge.length];

  return (
    <div style={{ padding: '20px', margin: '0 auto', paddingBottom: '100px', boxSizing: 'border-box', maxWidth: '100%', overflowX: 'hidden' }}>
      <h2>TRACE - nachhaltige Spuren hinterlassen</h2>

      {/* 4er Set Buttons */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '20px', overflow: 'hidden', boxSizing: 'border-box' }}>
        <button 
          onClick={() => navigate('/friends')}
          style={{ 
            flex: 1, 
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}>
          <img src="/friends.png" alt="friends" style={{ width: '24px', height: '24px' }} />
        </button>
       {/*} <button 
          onClick={() => navigate('/notifications')}
          style={{ flex: 1, minWidth: 0, boxSizing: 'border-box' }}> 2
        </button>*/}
        <button 
          onClick={() => navigate('/notifications')}
          style={{ 
            flex: 1, 
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            position: 'relative',
          }}>
          <img src="/notification.png" alt="notifications" style={{ width: '24px', height: '24px' }} />
          {unreadCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '0px',
              right: '50%',
              transform: 'translateX(12px)',
              width: '7px',
              height: '7px',
              backgroundColor: '#dc3545',
              borderRadius: '50%',
              border: '2px solid white'
            }} />
          )}
        </button>
        <button 
          onClick={() => navigate('/settings')}
          style={{ 
            flex: 1, 
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}>
          <img src="/setting.png" alt="settings" style={{ width: '24px', height: '24px' }} />
        </button>
        <button 
          onClick={() => navigate('/goals')}
          style={{ 
            flex: 1, 
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}>
          <img src="/target.png" alt="goals" style={{ width: '24px', height: '24px' }} />
        </button>
      </div>

      {/* Fakt des Tages */}
      <Link to="/knowledge-base2" style={{ textDecoration: 'none'}}> 
        <div style={{
          background: 'linear-gradient(135deg, #128b09 0%, #1db954 100%)',
          borderRadius: '10px',
          padding: '12px 15px',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          color: '#fff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
            <span style={{ fontSize: '20px' }}>💡</span>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '11px', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Wissen des Tages</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{faktDesTages.title}</div>
              <div style={{ fontSize: '11px', opacity: 0.9, letterSpacing: '0.5px' }}>{faktDesTages.short}</div>
            </div>
          </div>
          <span style={{ fontSize: '18px', marginLeft: '10px' }}>→</span>
        </div>
      </Link>

        {/*
      Explore & Favoriten nebeneinander 
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', width: '100%' }}>
        {/* Explore Vorschau - kompakt 
        <Link to="/Explore" style={{ textDecoration: 'none', width: 'calc(80% - 5px)', display: 'block' }}>
          <div style={{
            backgroundColor: '#128b09',
            borderRadius: '10px',
            padding: '12px 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            border: 'none',
            height: '100%',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, overflow: 'hidden' }}>
              <span style={{ fontSize: '20px' }}>🌱</span>
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>Handlungen entdecken</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{allActions.length} nachhaltige Aktionen</div>
              </div>
            </div>
            <span style={{ color: '#fff', fontSize: '18px' }}>→</span>
          </div>
        </Link>

        {/* Faves Button 
        <Link to="/favorites" style={{ textDecoration: 'none', width: 'calc(20% - 5px)', display: 'block' }}>
          <div style={{
            borderRadius: '10px',
            padding: '12px 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            height: '100%',
            boxSizing: 'border-box'
          }}>
            <img src="/favorite.png" alt="Favoriten" style={{ width: '44px', height: '44px' }} />
          </div>
        </Link>
      </div>
      */}
      {/*ab hier*/}

      {/* Featured Actions - Horizontal Scroll */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ margin: 0, color: '#333' }}>Für dich empfohlen</h3>
          <Link to="/Explore" style={{ color: '#128b09', fontSize: '14px', textDecoration: 'none' }}>
            Alle anzeigen →
          </Link>
        </div>
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '10px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}>
          {allActions.slice(0, 5).map(action => (
            <Link 
              key={action.id} 
              to={`/action/${action.id}`} 
              state={{ action }}
              style={{ 
                textDecoration: 'none',
                scrollSnapAlign: 'start',
                flexShrink: 0
              }}
            >
              <div style={{
                width: '160px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '15px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: '#e8f5e8',
                  color: '#128b09',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  marginBottom: '8px'
                }}>
                  {action.category}
                </span>
                <h4 style={{ 
                  margin: '0 0 6px 0', 
                  color: '#333', 
                  fontSize: '14px',
                  lineHeight: 1.3,
                  height: '36px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {action.title}
                </h4>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  color: '#128b09',
                  fontSize: '12px',
                  fontWeight: 'bold', 
                  marginTop: '-20px'
                }}>
                  <span>+{action.points}</span>
                  <span style={{ color: '#999', fontWeight: 'normal' }}>Punkte</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
         {/* Faves Button */}
        <Link to="/favorites" style={{ textDecoration: 'none', width: 'calc(20% - 5px)', display: 'block' }}>
          <div style={{
            borderRadius: '10px',
            padding: '12px 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            height: '100%',
            boxSizing: 'border-box'
          }}>
            <img src="/favorite.png" alt="Favoriten" style={{ width: '44px', height: '44px' }} />
          </div>
        </Link>
      </div>
      {/*bis hier*/}
      {/* Esse als Impact-Anzeige */}
      <div style={{ 
        background: "url('/Chemnitz.jpg')",
        //opacity: 0.3,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        marginTop: '-30px',
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '20px',
        padding: '15px',
        //backgroundColor: '#f8f9fa',
        borderRadius: '10px',
       // border: '1px solid #e0e0e0'
      }}>
        
        <Esse width={50} height={160} />

        {/* Impact Button */}
        <Link to="/impact" style={{ textDecoration: 'none', width: '24px', display: 'block' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            height: '100%',
          }}>
            <img src="/information.png" alt="Impact" style={{ width: '24px', height: '24px' }} />
          </div>
        </Link>
      </div>
      {/*<button
        onClick={handleAction}
        style={{
          backgroundColor: '#128b09',
          color: '#fff',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          width: '100%'
        }}
        >
          +10 Punkte
      </button>*/}
    </div>
  );
};

export default Home;