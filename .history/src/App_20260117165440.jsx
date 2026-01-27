import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Progress from './pages/Progress';
import KnowledgeBase from './pages/KnowledgeBase';
import Scan from './pages/Scan';
import PastAndRewards from './pages/PastAndRewards';
import Contribute from './pages/Contribute';
import ActionDetail from './pages/ActionDetail';
import BottomNav from './components/BottomNav';
import ReturnButton from './components/ReturnButton';
import Explore from './pages/Explore';
import FavesList from './pages/FavesList';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div style={{ paddingBottom: '60px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/past-and-rewards" element={<PastAndRewards />} />
            <Route path="/Explore" element={<Explore />} />
            <Route path="/action/:id" element={<ActionDetail />} />
            <Route path="/favorites" element={<FavesList />} />
          </Routes>
          <ReturnButton />
        </div>
        <BottomNav />
      </Router>
    </FavoritesProvider>
  );
}

export default App;
