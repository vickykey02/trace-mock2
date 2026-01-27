const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Hier muss auch das Feedback und die narrative Gamification mit hin</p>
	  <Link to="/Explore" style={{ textDecoration: 'none' }}>
          <img src="/clock.png" alt="Past & Rewards" style={{ width: '24px', height: '24px' }} />
    </Link>
    </div>
  );
};

export default Home;