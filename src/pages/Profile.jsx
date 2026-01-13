import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import BottomNav from '../components/BottomNav.jsx';

const mainUserData = {
  username: 'dennis_mendoza',
  name: 'Dennis Mendoza',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  verified: true,
  bio: 'Pet Lover, CEO & Creative Director\n🎬 Cinema Musician',
  stats: {
    posts: 1367,
    followers: 28843,
    following: 678
  },
  highlights: [
    { id: 1, title: 'Travel', emoji: '✈️' },
    { id: 2, title: 'Food', emoji: '🍕' },
    { id: 3, title: 'Work', emoji: '💼' },
    { id: 4, title: 'Fitness', emoji: '💪' }
  ],
  posts: [
    { id: 1, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', likes: 1576 },
    { id: 2, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', likes: 2341 },
    { id: 3, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', likes: 892 },
    { id: 4, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop', likes: 3286 },
    { id: 5, image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=400&fit=crop', likes: 1847 },
    { id: 6, image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop', likes: 4521 }
  ]
};

// Mock function to generate searched user data
const mockSearchedUser = (username) => {
  return {
    username: username.toLowerCase().replace(/\s+/g, '_'),
    name: username,
    avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`,
    verified: Math.random() > 0.7,
    bio: 'Digital creator | Always creating something new 🎨',
    stats: {
      posts: Math.floor(Math.random() * 5000),
      followers: Math.floor(Math.random() * 100000),
      following: Math.floor(Math.random() * 5000)
    },
    highlights: [
      { id: 1, title: 'Design', emoji: '🎨' },
      { id: 2, title: 'Tech', emoji: '💻' },
      { id: 3, title: 'Travel', emoji: '✈️' }
    ],
    posts: [
      { id: 1, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop', likes: Math.floor(Math.random() * 5000) },
      { id: 2, image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop', likes: Math.floor(Math.random() * 5000) }
    ]
  };
};

const Profile = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  // If coming from search, use searched user mock data
  const searchName = location.state && location.state.searchName;
  const profileData = searchName ? mockSearchedUser(searchName) : mainUserData;

  // Instagram-style SVG icons
  const RemixIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M7 7l10 10" stroke="#FF8787" strokeWidth="2" />
    </svg>
  );
  const UserIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
  const contentTabs = [
    { id: 'posts', icon: '🔲' },
    { id: 'reels', icon: '🎬' },
    { id: 'remix', icon: RemixIcon },
    { id: 'tagged', icon: UserIcon }
  ];

  // Mock posts for tagged and remix tabs
  const taggedPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop', likes: 321 },
    { id: 2, image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop', likes: 210 }
  ];
  const remixPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=400&fit=crop', likes: 123 },
    { id: 2, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop', likes: 456 }
  ];
  const personalProfileReels = [
    { id: 1, video: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: 10, likes: 234 },
    { id: 2, video: 'https://www.w3schools.com/html/movie.mp4', duration: 6, likes: 456 },
    { id: 3, video: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: 15, likes: 789 }
  ];

  return (
    <div style={{ background: isDarkMode ? '#1a1a1a' : 'linear-gradient(135deg, #FFF5F5 0%, #FFE5CC 100%)', minHeight: '100vh', color: isDarkMode ? '#fff' : 'inherit' }}>
      <main style={{ maxWidth: 600, margin: '0 auto', padding: '16px 12px 80px 12px', position: 'relative' }}>
        {/* Settings icon with dropdown for personal profile */}
        {!searchName && (
          <div style={{ position: 'absolute', top: 18, right: 18, zIndex: 10 }}>
            <button
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              aria-label="Settings">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 0 1 4 0v.09c.38.16.7.46 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82c.16.38.46.7 1.51 1H21a2 2 0 0 1 0 4h-.09c-.16.38-.46.7-1.51 1z" />
              </svg>
            </button>
            {showThemeDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: theme.background,
                border: `2px solid ${theme.border}`,
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: '160px',
                zIndex: 1000}}>
                {!isDarkMode ? (
                  <button onClick={() => { toggleTheme('dark'); setShowThemeDropdown(false); }} style={{ display: 'block', width: '100%', padding: '12px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '14px', color: theme.text, transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.background = theme.secondary} onMouseLeave={(e) => e.target.style.background = 'none'}>
                    🌙 Dark Mode
                  </button>
                ) : (
                  <button onClick={() => { toggleTheme('light'); setShowThemeDropdown(false); }} style={{ display: 'block', width: '100%', padding: '12px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '14px', color: theme.text, transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.background = theme.secondary} onMouseLeave={(e) => e.target.style.background = 'none'}>
                    ☀️ Light Mode
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        {/* Profile Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <img src={profileData.avatar} alt={profileData.name} style={{ width: 180, height: 180, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />
          {/* Stats below avatar */}
          <div style={{ display: 'flex', gap: 32, marginBottom: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 20 }}>{profileData.stats.posts.toLocaleString()}</div>
              <div style={{ color: theme.textSecondary, fontSize: 14 }}>Posts</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 20 }}>{profileData.stats.followers.toLocaleString()}</div>
              <div style={{ color: theme.textSecondary, fontSize: 14 }}>Followers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 20 }}>{profileData.stats.following.toLocaleString()}</div>
              <div style={{ color: theme.textSecondary, fontSize: 14 }}>Following</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontWeight: 'bold', fontSize: 16, color: theme.text, marginBottom: 4 }}>{profileData.name} {profileData.verified && <span style={{ color: theme.primary, fontSize: 18 }}>✓</span>}</div>
          <div style={{ fontSize: 14, color: theme.text, lineHeight: '1.5', whiteSpace: 'pre-line' }}>{profileData.bio}</div>
        </div>

        {/* Follow & Message Buttons (searched user only) */}
        {searchName && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 18 }}>
          <button onClick={() => setIsFollowing(f => f === 'following' ? 'unfollow' : f === 'unfollow' ? '' : 'following')}
            style={{
              background: isFollowing === 'following' ? '#fff' : '#FF8787',
              color: isFollowing === 'following' ? '#FF8787' : '#fff',
              border: '2px solid #FF8787',
              borderRadius: 18,
              padding: '8px 28px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: 120}}>
            {isFollowing === 'following' ? 'Following' : isFollowing === 'unfollow' ? 'Unfollow' : 'Follow'}
          </button>
          <button
            onClick={() => setShowChat(true)}
            style={{
              background: '#fff',
              color: '#FF8787',
              border: '2px solid #FF8787',
              borderRadius: 18,
              padding: '8px 28px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              minWidth: 120}}>
            Message
          </button>
        </div>
        )}

        {/* Chatroom Modal */}
        {showChat && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: theme.cardBg, borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.25)', width: 480, maxWidth: '95vw', padding: 0, display: 'flex', flexDirection: 'column', minHeight: 520, maxHeight: '80vh' }}>
              <div style={{ padding: 18, borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={profileData.avatar} alt={profileData.name} style={{ width: 44, height: 44, borderRadius: '50%' }} />
                <span style={{ fontWeight: 700, color: theme.text }}>{profileData.name}</span>
                <button onClick={() => setShowChat(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#FF8787', fontWeight: 700, fontSize: 20, cursor: 'pointer', padding: '4px 8px' }}>✕</button>
              </div>
              <div style={{ flex: 1, padding: 18, overflowY: 'auto', fontSize: 15, color: theme.text, background: isDarkMode ? '#3a3a3a' : theme.secondary }}>
                <div style={{ marginBottom: 16, alignSelf: 'flex-start', background: isDarkMode ? '#2a2a2a' : '#f3f3f3', borderRadius: 16, padding: '10px 16px', maxWidth: '75%', color: isDarkMode ? '#fff' : '#333' }}>
                  Hi! This is a new chatroom for {profileData.name}.
                </div>
              </div>
              <form style={{ display: 'flex', borderTop: `1px solid ${theme.border}`, padding: 14, gap: 10, background: theme.cardBg }} onSubmit={e => { e.preventDefault(); }}>
                <input type="text" placeholder="Type a message..." style={{ flex: 1, border: `1px solid ${theme.border}`, outline: 'none', fontSize: 15, padding: '12px 16px', borderRadius: 16, background: theme.secondary, color: theme.text }} />
                <button type="submit" style={{ background: '#FF8787', color: '#fff', border: 'none', borderRadius: 16, padding: '12px 20px', fontWeight: 700, fontSize: 15 }}>Send</button>
              </form>
            </div>
          </div>
        )}

        {/* Highlights above posts */}
        <div className="highlights" style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          margin: '24px 0',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          justifyContent: 'center'}}>
          {profileData.highlights.map(highlight => (
            <div key={highlight.id} className="highlight-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '80px',
              cursor: 'pointer'}}>
              <div className="highlight-circle" style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                border: `2px solid ${theme.border}`,
                background: theme.secondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '8px'}}>
                {highlight.emoji}
              </div>
              <span style={{ fontSize: '12px', color: theme.text }}>{highlight.title}</span>
            </div>
          ))}
        </div>



        {/* Content Type Selector (Tabs) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 24,
          margin: '18px 0 8px 0'}}>
          {contentTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#FF8787' : '#fff',
                color: activeTab === tab.id ? '#fff' : '#FF8787',
                border: '2px solid #FF8787',
                borderRadius: 14,
                padding: '6px 18px',
                fontWeight: 700,
                fontSize: 18,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 8}}>
              <span>{tab.icon}</span>
            </button>
          ))}
        </div>

        {/* Visual Separator */}
        <hr style={{ border: 'none', borderTop: '1.5px solid #FFB6A3', opacity: 0.18, margin: '10px 0 18px 0' }} />

        {/* Posts Grid Section */}
        {activeTab === 'posts' && (
          <div className="posts-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            marginBottom: 32}}>
            {profileData.posts.map((post, i) => (
              <div key={post.id} style={{
                borderRadius: 18,
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 2px 8px #0001',
                gridColumn: i % 7 === 0 ? 'span 2' : 'span 1',
                aspectRatio: i % 7 === 0 ? '2/1' : '1/1',
                minHeight: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'}}>
                <img src={post.image} alt="post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: 8, right: 12, color: '#fff', fontWeight: 700, textShadow: '0 2px 8px #0008', fontSize: 15 }}>❤️ {post.likes}</span>
              </div>
            ))}
          </div>
        )}
        {/* Tagged Posts Grid */}
        {activeTab === 'tagged' && (
          <div className="posts-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            marginBottom: 32}}>
            {taggedPosts.map((post, i) => (
              <div key={post.id} style={{
                borderRadius: 18,
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 2px 8px #0001',
                minHeight: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'}}>
                <img src={post.image} alt="tagged" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: 8, right: 12, color: '#fff', fontWeight: 700, textShadow: '0 2px 8px #0008', fontSize: 15 }}>❤️ {post.likes}</span>
              </div>
            ))}
          </div>
        )}
        {/* Reels Section (Personal Profile Only) */}
        {!searchName && activeTab === 'reels' && (
          <div className="reels-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            marginBottom: 32}}>
            {personalProfileReels.map((reel) => (
              <div key={reel.id} style={{
                borderRadius: 18,
                overflow: 'hidden',
                background: '#000',
                boxShadow: '0 2px 8px #0001',
                aspectRatio: '9/16',
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'}}>
                <video 
                  src={reel.video} 
                  autoPlay 
                  muted 
                  loop
                  preload="metadata"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <span style={{ position: 'absolute', bottom: 8, right: 12, color: '#fff', fontWeight: 700, textShadow: '0 2px 8px #0008', fontSize: 15 }}>❤️ {reel.likes}</span>
              </div>
            ))}
          </div>
        )}
        {/* Reels Section (Searched Profile) */}
        {searchName && activeTab === 'reels' && (
          <div className="reels-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            marginBottom: 32}}>
            {personalProfileReels.slice(0, 2).map((reel) => (
              <div key={reel.id} style={{
                borderRadius: 18,
                overflow: 'hidden',
                background: '#000',
                boxShadow: '0 2px 8px #0001',
                aspectRatio: '9/16',
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'}}>
                <video 
                  src={reel.video} 
                  autoPlay 
                  muted 
                  loop
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <span style={{ position: 'absolute', bottom: 8, right: 12, color: '#fff', fontWeight: 700, textShadow: '0 2px 8px #0008', fontSize: 15 }}>❤️ {reel.likes}</span>
              </div>
            ))}
          </div>
        )}
        {/* Remix Posts Grid */}
        {activeTab === 'remix' && (
          <div className="posts-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            marginBottom: 32}}>
            {remixPosts.map((post, i) => (
              <div key={post.id} style={{
                borderRadius: 18,
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 2px 8px #0001',
                minHeight: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'}}>
                <img src={post.image} alt="remix" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: 8, right: 12, color: '#fff', fontWeight: 700, textShadow: '0 2px 8px #0008', fontSize: 15 }}>❤️ {post.likes}</span>
              </div>
            ))}
          </div>
        )}
        <style>{`
          @media (max-width: 900px) {
            .posts-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 600px) {
            .posts-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </main>
      <BottomNav activePage="profile" onNavigate={() => {}} />
    </div>
  );
}
export default Profile;