import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Progress from './pages/Progress';
import KnowledgeBase2 from './pages/KnowledgeBase2';
import Scan from './pages/Scan';
import PastAndRewards from './pages/PastAndRewards';
import Contribute from './pages/Contribute';
import ActionDetail from './pages/ActionDetail';
import BottomNav from './components/BottomNav';
import ReturnButton from './components/ReturnButton';
import Explore from './pages/Explore';
import FavesList from './pages/FavesList';
import { FavoritesProvider } from './context/FavoritesContext';
import { ActionsProvider } from './context/ActionsContext';
import { LikesProvider } from './context/LikesContext';
import { KnowledgeProvider } from './context/KnowledgeContext';

function App() {
  return (
    <ActionsProvider>
      <FavoritesProvider>
        <LikesProvider>
          <KnowledgeProvider>
            <Router>
              <div style={{ paddingBottom: '60px' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/knowledge-base2" element={<KnowledgeBase2 />} />
                  <Route path="/scan" element={<Scan />} />
                  <Route path="/contribute" element={<Contribute />} />
                  <Route path="/past-and-rewards" element={<PastAndRewards />} />
                  <Route path="/Explore" element={<Explore />} />
                  <Route path="/action/:id" element={<ActionDetail />} />
                  <Route path="/favorites" element={<FavesList />} />
                  <Route path="/likes" element={<LikesList />} />
                </Routes>
                <ReturnButton />
              </div>
              <BottomNav />
            </Router>
          </KnowledgeProvider>
        </LikesProvider>
      </FavoritesProvider>
    </ActionsProvider>
  );
}

export default App;
