import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Messages from './pages/Messages.jsx';
import Profile from './pages/Profile.jsx';
import Reels from './pages/Reels.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';

export default function App() {
  return (
    <Router>
      <Header />
      <main className="main-instagram-width">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/notifications" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <BottomNav />
    </Router>
  );
}
