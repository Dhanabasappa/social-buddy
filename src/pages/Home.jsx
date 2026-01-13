import { useState } from "react";
import { useTheme } from '../context/ThemeContext.jsx';
import Stories from '../components/Stories.jsx';
import Post from '../components/Post.jsx';
import BottomNav from '../components/BottomNav.jsx';
import ProfilePage from './Profile.jsx';
import MessagesPage from './Messages.jsx';

const Home = () => {
  const {  isDarkMode } = useTheme();
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [activePage, setActivePage] = useState('home');

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleSave = (postId) => {
    setSavedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    console.log(`Navigating to: ${page}`);
  };
  // Mock data for stories
    const mockStories = [
    { id: 1, username: 'Your Story', avatar: '👤', isYou: true },
    { id: 2, username: 'jessica_bu', avatar: '👩‍🦰', hasStory: true },
    { id: 3, username: 'alex_dev', avatar: '👨‍💻', hasStory: true },
    { id: 4, username: 'sarah_designs', avatar: '👩‍🎨', hasStory: true },
    { id: 5, username: 'mike_photo', avatar: '📸', hasStory: true },
    { id: 6, username: 'emma_travel', avatar: '✈️', hasStory: true },
    { id: 7, username: 'john_fitness', avatar: '💪', hasStory: true },
    { id: 8, username: 'lisa_food', avatar: '🍕', hasStory: true }
    ];

    // Mock data for posts
    const mockPosts = [
    {
        id: 1,
        username: 'jessica_bu',
        avatar: '👩‍🦰',
        location: 'Paris, France',
        verified: true,
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=800&fit=crop',
        likes: 1247,
        caption: 'Living my best life in Paris! 🇫🇷✨ #travel #paris',
        timestamp: '2 hours ago',
        comments: 89
    },
    {
        id: 2,
        username: 'alex_dev',
        avatar: '👨‍💻',
        location: 'San Francisco, CA',
        verified: true,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=800&fit=crop',
        likes: 892,
        caption: 'New setup! Finally got my dream workspace 💻⚡',
        timestamp: '5 hours ago',
        comments: 56
    },
    {
        id: 3,
        username: 'sarah_designs',
        avatar: '👩‍🎨',
        location: 'New York, NY',
        verified: false,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
        likes: 2341,
        caption: 'Color palette inspiration for today\'s project 🎨',
        timestamp: '1 day ago',
        comments: 134
    }
    ];

  // Render different pages based on activePage
  if (activePage === 'profile') {
    return <ProfilePage />;
  }

  if (activePage === 'notifications') {
    return <MessagesPage />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: isDarkMode ? '#1a1a1a' : 'linear-gradient(135deg, #FFF5F5 0%, #FFE5CC 100%)',
      paddingBottom: '80px',
      color: isDarkMode ? '#fff' : 'inherit'
    }}>
      <style>{`
        @media (max-width: 768px) {
          main {
            max-width: 100% !important;
            padding: 0 12px !important;
          }
        }
        @media (max-width: 480px) {
          main {
            max-width: 100% !important;
            padding: 0 8px !important;
          }
        }
      `}</style>

      {/* Main Content */}
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Stories Section */}
        <Stories stories={mockStories} />

        {/* Posts Feed */}
        <div style={{ 
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {mockPosts.map(post => (
            <Post
              key={post.id}
              post={post}
              isLiked={likedPosts[post.id]}
              isSaved={savedPosts[post.id]}
              onLike={toggleLike}
              onSave={toggleSave}
            />
          ))}
        </div>
      </main>
      {/* Bottom Navigation */}
      <BottomNav activePage={activePage} onNavigate={handleNavigate} />
    </div>
  );
};
export default Home;