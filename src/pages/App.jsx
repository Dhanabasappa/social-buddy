import { useState } from 'react';
import Home from './pages/Home.jsx';
import Messages from './pages/Messages.jsx';
import Profile from './pages/Profile.jsx';
import Reels from './pages/Reels.jsx';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  return (
    <div>
      <Header />
      <main className="main-instagram-width">
        {page === 'home' && <Home />}
        {page === 'reels' && <Reels />}
        {page === 'notifications' && <Messages />}
        {page === 'profile' && <Profile />}
      </main>
      <BottomNav activePage={page} onNavigate={setPage} />
    </div>
  );
}
