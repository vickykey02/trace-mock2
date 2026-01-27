import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Progress from './pages/Progress';
import KnowledgeBase from './pages/KnowledgeBase';
import Scan from './pages/Scan';
import PastAndRewards from './pages/PastAndRewards';
import Contribute from './pages/Contribute';
import BottomNav from './components/BottomNav';
import ReturnButton from './components/ReturnButton';

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: '60px' }}> {/* Add padding to avoid overlap with fixed nav */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/past-and-rewards" element={<PastAndRewards />} />
        </Routes>
      </div>
      <BottomNav />
    </Router>
  );
}

export default App;
