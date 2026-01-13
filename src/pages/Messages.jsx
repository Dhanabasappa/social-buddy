import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import BottomNav from '../components/BottomNav.jsx';
import ChatRoom from './ChatRoom.jsx';

const MessagesPage = () => {
  const {  isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('inbox');
  const [openChatId, setOpenChatId] = useState(null);

  const messages = [
    {
      id: 1,
      name: 'CYNTHIA B. MCNUTT',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      message: 'Hello, I just want to talk ab...',
      timestamp: '2min ago',
      unread: true
    },
    {
      id: 2,
      name: 'KAREN BORDNER',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      message: 'What do you need for your...',
      timestamp: '.08:24',
      unread: false
    },
    {
      id: 3,
      name: 'ETHELENE 978',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      message: 'Let\'s change something int...',
      timestamp: '.09:46',
      unread: false
    },
    {
      id: 4,
      name: 'JOHN FITNESS',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      message: 'New workout routine uploaded!',
      timestamp: '1day ago',
      unread: false
    },
    {
      id: 5,
      name: 'EMMA TRAVEL',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      message: 'Which destination next?',
      timestamp: '2days ago',
      unread: false
    }
  ];

  const userCircles = [
    { id: 1, name: 'CYNTHIA B. MCNUTT', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'KAREN BORDNER', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: 3, name: 'ETHELENE 978', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { id: 4, name: 'JOHN FITNESS', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 5, name: 'EMMA TRAVEL', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' }
  ];

  // maintain a stateful copy of messages so we can reorder on active change
  const [messagesState, setMessages] = useState(messages);
  const [activeConversationIndex, setActiveConversationIndex] = useState(0);

  if (openChatId) {
    const user = messagesState.find(m => m.id === openChatId);
    return <ChatRoom chatId={openChatId} user={user} onBack={() => setOpenChatId(null)} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: isDarkMode ? '#1a1a1a' : 'linear-gradient(135deg, #FFF5F5 0%, #FFE5CC 100%)',
      paddingBottom: '80px',
      color: isDarkMode ? '#fff' : '#262626'
    }}>
      <style>{`
        @media (max-width: 768px) {
          main {
            max-width: 100% !important;
            padding: 12px !important;
          }
        }
        @media (max-width: 480px) {
          main {
            max-width: 100% !important;
            padding: 8px !important;
          }
        }
      `}</style>


      <main style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Friends / Avatar Carousel Section */}
        <div style={{
          marginBottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <style>{`
            @media (max-width: 768px) {
              .friends-text { font-size: 10px !important; }
              .friends-name { font-size: 14px !important; }
            }
            @media (max-width: 480px) {
              .friends-text { font-size: 10px !important; }
              .friends-name { font-size: 14px !important; }
            }
          `}</style>

          {/* AvatarCarousel - drives active conversation */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '18px', gap: '18px' }}>
            {userCircles.map((user, idx) => (
              <div key={user.id} style={{
                width: idx === activeConversationIndex ? 68 : 48,
                height: idx === activeConversationIndex ? 68 : 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB6A3 0%, #FF8787 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: idx === activeConversationIndex ? '0 2px 12px #FFB6A3' : 'none',
                border: idx === activeConversationIndex ? '3px solid #fff' : '2px solid #fff',
                position: 'relative',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
                onClick={() => {
                  setActiveConversationIndex(idx);
                  // Move this user's message to the top of the list
                  const clickedUser = messagesState.find(m => m.id === user.id);
                  if (clickedUser) {
                    const reordered = [clickedUser, ...messagesState.filter(m => m.id !== user.id)];
                    setMessages(reordered);
                  }
                }}
              >
                <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          {/* Friend Name Section (shows active conversation name) */}
          <div style={{
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            <div className="friends-text" style={{
              fontSize: '12px',
              color: isDarkMode ? '#888' : '#999',
              letterSpacing: '1px',
              fontWeight: '600',
              marginBottom: '6px'
            }}>
              CONVERSATIONS
            </div>
            <div className="friends-name" style={{
              fontSize: '18px',
              fontWeight: '700',
              color: isDarkMode ? '#fff' : '#262626'
            }}>
              {messagesState[0]?.name || ''}
            </div>
          </div>

          {/* Tab Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            width: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'inbox', label: 'Inbox 26' },
              { id: 'unread', label: 'Unread' },
              { id: 'requests', label: 'Requests' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '20px',
                  background: activeTab === tab.id
                    ? isDarkMode ? 'rgba(255, 135, 135, 0.3)' : 'rgba(255, 182, 163, 0.4)'
                    : isDarkMode ? 'rgba(255, 135, 135, 0.15)' : 'rgba(255, 182, 163, 0.25)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  color: isDarkMode ? '#fff' : '#262626',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: activeTab === tab.id ? `1px solid ${isDarkMode ? 'rgba(255, 135, 135, 0.5)' : 'rgba(255, 182, 163, 0.5)'}` : `1px solid ${isDarkMode ? 'rgba(255, 135, 135, 0.2)' : 'rgba(255, 182, 163, 0.2)'}`
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        <div style={{
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {messagesState.map(message => (
            <div
              key={message.id}
              onClick={() => setOpenChatId(message.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 135, 135, 0.1)' : 'rgba(255, 182, 163, 0.1)'}`,
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                borderRadius: '18px',
                background: isDarkMode ? '#2a2a2a' : '#fff8f4',
                boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(255,182,163,0.06)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? 'rgba(255, 135, 135, 0.15)' : 'rgba(255, 182, 163, 0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.background = isDarkMode ? '#2a2a2a' : '#fff8f4'}
            >
              {/* Left: Avatar */}
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB6A3 0%, #FF8787 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0,
                border: '2px solid rgba(255, 255, 255, 0.4)',
                position: 'relative'
              }}>
                <img src={message.avatar} alt={message.name} style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }} />
                {message.unread && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#FF6B6B',
                    border: '2px solid white'
                  }} />
                )}
              </div>

              {/* Middle: Message Content */}
              <div style={{
                flex: 1,
                minWidth: 0
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: isDarkMode ? '#fff' : '#262626',
                  marginBottom: '4px',
                  letterSpacing: '0.5px'
                }}>
                  {message.name}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#999',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {message.message}
                </div>
              </div>

              {/* Right: Timestamp + Notification Icon */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '8px',
                flexShrink: 0
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#999'
                }}>
                  {message.timestamp}
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#FFB6A3'
                }}>
                  🔔
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav activePage="notifications" onNavigate={() => {}} />
    </div>
  );
};

export default MessagesPage;
