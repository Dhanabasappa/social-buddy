
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

const mockUsers = [
  {
    username: 'alex_dev',
    name: 'Alex Dev',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Web developer & traveler',
    stats: { posts: 120, followers: 3400, following: 210 },
  },
  {
    username: 'emma_travel',
    name: 'Emma Travel',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    bio: 'Travel blogger & foodie',
    stats: { posts: 98, followers: 4200, following: 180 },
  },
  {
    username: 'jessica_bu',
    name: 'Jessica Bu',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Pop singer & artist',
    stats: { posts: 210, followers: 8000, following: 320 },
  },
];

const reels = [
  { id: 1, user: 'alex_dev', music: 'Chill Vibes', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', likes: 123 },
  { id: 2, user: 'emma_travel', music: 'Summer Nights', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', likes: 87 },
  { id: 3, user: 'jessica_bu', music: 'Pop Hit', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400', likes: 201 },
  { id: 4, user: 'john_fitness', music: 'Workout Beats', video: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: 10, likes: 55 },
  { id: 5, user: 'sarah_designs', music: 'Indie Mood', video: 'https://www.w3schools.com/html/movie.mp4', duration: 6, likes: 99 },
  { id: 6, user: 'mike_photo', music: 'Photo Jam', video: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: 15, likes: 77 },
  { id: 7, user: 'karen_bordner', music: 'Dream Pop', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', likes: 142 },
  { id: 8, user: 'emma_travel', music: 'Travel Anthem', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', likes: 65 },
];

const mockComments = [
  { user: 'alex_dev', text: 'Awesome reel!' },
  { user: 'emma_travel', text: 'Love this vibe!' },
  { user: 'jessica_bu', text: 'So cool!' },
];

const mockShareUsers = [
  { name: 'Cynthia B. McNutt', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Karen Bordner', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Ethelene 978', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
];

export default function Reels() {
  const { isDarkMode } = useTheme();
  const [search, setSearch] = useState('');
  const [showShare, setShowShare] = useState(false);
  const [shareReelId, setShareReelId] = useState(null);
  const [liked, setLiked] = useState({});
  const [showComments, setShowComments] = useState(null);
  const [soundOn, setSoundOn] = useState({});
  const [sentMessages, setSentMessages] = useState({});
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate('/profile', { state: { searchName: search.trim() } });
    }
  };

  return (
    <div style={{ padding: 24, minHeight: '100vh', background: isDarkMode ? '#1a1a1a' : 'linear-gradient(135deg, #FFF5F5 0%, #FFE5CC 100%)', color: isDarkMode ? '#fff' : '#000' }}>
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} style={{ maxWidth: 400, margin: '0 auto 24px auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search user..."
          style={{ flex: 1, padding: '10px 16px', borderRadius: 18, border: `1px solid ${isDarkMode ? '#555' : '#FFB6A3'}`, fontSize: 16, background: isDarkMode ? '#2a2a2a' : '#fff', color: isDarkMode ? '#fff' : '#000' }}
        />
        <button type="submit" style={{ background: '#FF8787', color: '#fff', border: 'none', borderRadius: 18, padding: '8px 18px', fontWeight: 700, fontSize: 16 }}>Search</button>
      </form>

      {/* Reels Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 18,
        maxWidth: 935,
        margin: '0 auto',
      }}>
        {reels.map((reel) => (
          <div
            key={reel.id}
            style={{
              borderRadius: 18,
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              position: 'relative',
              aspectRatio: '9/16',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              minHeight: 260,
            }}
          >
            {reel.video ? (
              <video 
                src={reel.video}
                onClick={() => setSoundOn(s => ({ ...s, [reel.id]: !s[reel.id] }))}
                autoPlay
                loop
                muted={!soundOn[reel.id]}
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1, cursor: 'pointer' }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={reel.url} alt={reel.music} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
            )}
            <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, color: '#fff', fontWeight: 700, fontSize: 15, textShadow: '0 2px 8px #0008' }}>
              @{reel.user}
              <div style={{ fontWeight: 400, fontSize: 12 }}>{reel.music}</div>
            </div>
            {/* Sound Indicator (for videos only) */}
            {reel.video && (
              <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, color: '#fff', fontSize: 20, cursor: 'pointer', textShadow: '0 2px 8px #0008' }}>
                {soundOn[reel.id] ? '🔊' : '🔇'}
              </div>
            )}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '12px 10px',
              background: 'linear-gradient(0deg, #0008 60%, transparent 100%)',
              borderBottomLeftRadius: 18,
              borderBottomRightRadius: 18,
              gap: 8,
            }}>
              <button onClick={() => setLiked(l => ({ ...l, [reel.id]: !l[reel.id] }))} style={{ background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 12, padding: '6px 10px', fontSize: 16, marginRight: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                {liked[reel.id] ? '❤️' : '🤍'}
                <span style={{ fontSize: 13, color: '#FF8787', marginLeft: 4 }}>{(liked[reel.id] ? (reel.likes + 1) : reel.likes)}</span>
              </button>
              <button onClick={() => setShowComments(reel.id)} style={{ background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 12, padding: '6px 10px', fontSize: 16, marginRight: 4 }}>💬</button>
              <button onClick={() => { setShowShare(true); setShareReelId(reel.id); }} style={{ background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 12, padding: '6px 10px', fontSize: 16, marginRight: 4 }}>📤</button>
            </div>
            {/* Comments Popup */}
            {showComments === reel.id && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.95)', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Comments</div>
                {mockComments.map((c, i) => (
                  <div key={i} style={{ marginBottom: 8, fontSize: 15 }}><b>{c.user}:</b> {c.text}</div>
                ))}
                <button onClick={() => setShowComments(null)} style={{ marginTop: 18, background: '#FF8787', color: '#fff', border: 'none', borderRadius: 12, padding: '8px 18px', fontWeight: 700, fontSize: 15 }}>Close</button>
              </div>
            )}
            {/* Share Popup */}
            {showShare && shareReelId === reel.id && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.97)', zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Share to...</div>
                {mockShareUsers.map((u, i) => {
                  const sendKey = `${reel.id}-${i}`;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <img src={u.avatar} alt={u.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                      <span>{u.name}</span>
                      <button onClick={() => setSentMessages(s => ({ ...s, [sendKey]: !s[sendKey] }))} style={{ background: '#FF8787', color: '#fff', border: 'none', borderRadius: 12, padding: '4px 12px', fontWeight: 700, fontSize: 13, marginLeft: 8 }}>{sentMessages[sendKey] ? 'Sent' : 'Send'}</button>
                    </div>
                  );
                })}
                <button onClick={() => setShowShare(false)} style={{ marginTop: 18, background: '#FF8787', color: '#fff', border: 'none', borderRadius: 12, padding: '8px 18px', fontWeight: 700, fontSize: 15 }}>Close</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) {
          div[style*='grid-template-columns'] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          div[style*='grid-template-columns'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
