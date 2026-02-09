import { useNavigate } from 'react-router-dom';
import RememberButton from './RememberButton';

const Tipp = ({ tipp }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tipp-detail/${tipp.id}`, { state: { tipp } });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: '#fff',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        	<RememberButton tippId={tipp.id} />
		</div>
      <h3 style={{ margin: '0 0 8px 0', color: '#128b09ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tipp.title}</h3>
      <p style={{ margin: '0 0 8px 0', color: '#666' }}>{tipp.shortDescription}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#e8f5e8',
            color: '#128b09ff',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {tipp.category}
        </span>
		
      </div>
    </div>
  );
};

export default Tipp;
