import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Impact from './pages/Impact';
import Progress from './pages/Progress';
import KnowledgeBase2 from './pages/KnowledgeBase2';
import Tipps from './pages/Tipps';
import Scan from './pages/Scan';
import Past from './pages/Past';
import Rewards from './pages/Rewards';
import SpendPage from './pages/SpendPage';
import Contribute from './pages/Contribute';
import ActionDetail from './pages/ActionDetail';
import KnowledgeDetail from './pages/KnowledgeDetail';
import TippDetail from './pages/TippDetail';
import BottomNav from './components/BottomNav';
import ReturnButton from './components/ReturnButton';
import Explore from './pages/Explore';
import FavesList from './pages/FavesList';
import Goals from './pages/Goals';
import NewGoal from './pages/NewGoal';
import GoalDetail from './pages/GoalDetail';
import LikesList from './pages/LikesList';
import RememberList from './pages/RememberList';
import TippsSubmission from './pages/TippsSubmission';
import Friends from './pages/Friends';
import FriendDetail from './pages/FriendDetail';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import { FavoritesProvider } from './context/FavoritesContext';
import { ActionsProvider } from './context/ActionsContext';
import { LikesProvider } from './context/LikesContext';
import { KnowledgeProvider } from './context/KnowledgeContext';
import { RememberProvider } from './context/RememberContext';
import { TippsProvider } from './context/TippsContext';
import { SubmittedActionsProvider } from './context/SubmittedActionsContext';
import { PointsProvider } from './context/PointsContext';
import { BonusPointsProvider } from './context/BonusPointsContext';
import { GoalsProvider } from './context/GoalsContext';
import {FriendsProvider} from './context/FriendsContext';
import {FollowProvider} from './context/FollowContext';

function App() {
  return (
    <ActionsProvider>
      <FavoritesProvider>
        <LikesProvider>
          <KnowledgeProvider>
            <RememberProvider>
              <TippsProvider>
                <SubmittedActionsProvider>
                  <PointsProvider>
                    <BonusPointsProvider>
                      <GoalsProvider>
                      <FriendsProvider>
                      <FollowProvider>
                      <Router>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      flex: 1,
                      overflow: 'auto',
                      paddingBottom: '60px',
                      position: 'relative',
                    }}>
                      <ReturnButton />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/progress" element={<Progress />} />
                        <Route path="/knowledge-base2" element={<KnowledgeBase2 />} />
                        <Route path="/tipps" element={<Tipps />} />
                        <Route path="/scan" element={<Scan />} />
                        <Route path="/contribute" element={<Contribute />} />
                        <Route path="/past" element={<Past />} />
                        <Route path="/rewards" element={<Rewards />} />
                        <Route path="/spend-page" element={<SpendPage />} />
                        <Route path="/Explore" element={<Explore />} />
                        <Route path="/action/:id" element={<ActionDetail />} />
                        <Route path="/knowledge/:id" element={<KnowledgeDetail />} />
                        <Route path="/tipp-detail/:id" element={<TippDetail />} />
                        <Route path="/friend-detail/:id" element={<FriendDetail />} />
                        <Route path="/favorites" element={<FavesList />} />
                        <Route path="/likes" element={<LikesList />} />
                        <Route path="/remember" element={<RememberList />} />
                        <Route path="/submit" element={<TippsSubmission />} />
                        <Route path="/goals" element={<Goals />} />
                        <Route path="/goal/:id" element={<GoalDetail />} />
                        <Route path="/new-goal" element={<NewGoal />} />
                        <Route path="/impact" element={<Impact />} />
                        <Route path="/friends" element={<Friends />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/ranking" element={<Ranking />} />
                      </Routes>
                    </div>
                    <BottomNav />
                  </div>
                      </Router>
                      </FollowProvider>
                      </FriendsProvider>
                      </GoalsProvider>
                    </BonusPointsProvider>
                  </PointsProvider>
                </SubmittedActionsProvider>
              </TippsProvider>
            </RememberProvider>
          </KnowledgeProvider>
        </LikesProvider>
      </FavoritesProvider>
    </ActionsProvider>
  );
}

export default App;
