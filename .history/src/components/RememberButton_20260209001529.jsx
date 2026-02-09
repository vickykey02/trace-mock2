import { useRemember } from '../context/RememberContext';

const RememberButton = ({ tippId }) => {
  const { toggleRemember, isRemembered } = useRemember();
  const isRem = isRemembered(tippId);

  const handleToggle = () => {
	toggleRemember(tippId);
  };

  return (
	<button
	  onClick={handleToggle}
	  style={{
		//backgroundColor: isRem ? '#128b09ff' : '#f0f0f0',
		backgroundColor: 'transparent',
		//color: isRem ? '#fff' : '#333',
		padding: '10px 15px',
		border: 'none',
		outline: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		fontSize: '14px',
		fontWeight: 'bold',
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		transition: 'background-color 0.2s'
	  }}
	  title={isRem ? 'Nicht mehr merken' : 'Merken'}
	>
	  <span style={{ fontSize: '16px', color:'#128b09ff'  }}>
		{/*isRem ? '★' : '☆'*/}
		{isRem ? '🗂️' : '📌'}
		
	  </span>
	  {/*isRem ? 'gemerkt' : 'merken'*/}
	</button>
  );
};

export default RememberButton;