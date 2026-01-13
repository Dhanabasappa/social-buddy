import { useTheme } from '../context/ThemeContext.jsx';

import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const { theme, isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: '/home', icon: 'home', label: 'Home' },
    { id: '/reels', icon: 'search', label: 'Reels' },
    { id: '/create', icon: 'plus', label: 'Create' },
    { id: '/notifications', icon: 'bell', label: 'Messages' },
    { id: '/profile', icon: 'profile', label: 'Profile' }
  ];

  const renderIcon = (iconName, isActive) => {
    const color = isActive ? theme.primary : theme.textSecondary;
    const strokeWidth = isActive ? '2.5' : '2';

    switch (iconName) {
      case 'home':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill={isActive ? color : 'none'} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'search':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        );
      case 'plus':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill={isActive ? color : 'none'} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        );
      case 'bell':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        );
      case 'profile':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: isDarkMode 
        ? 'rgba(42, 42, 42, 0.8)' 
        : 'rgba(255, 182, 163, 0.25)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderTop: isDarkMode 
        ? '1px solid rgba(255, 135, 135, 0.2)' 
        : '1px solid rgba(255, 182, 163, 0.3)',
      padding: '12px 0 12px 0',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 100,
      boxShadow: isDarkMode 
        ? '0 -2px 10px rgba(0, 0, 0, 0.3)' 
        : '0 -2px 10px rgba(255, 182, 163, 0.1)'
    }}>
      <style>{`
        @media (max-width: 480px) {
          nav {
            padding: 8px 0 8px 0 !important;
          }
          nav svg {
            width: 24px !important;
            height: 24px !important;
          }
        }
      `}</style>
      {navItems.map((item) => {
        const isActive = location.pathname === item.id;
        return (
          <div
            key={item.id}
            onClick={() => navigate(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px 16px',
              transition: 'transform 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {renderIcon(item.icon, isActive)}
            {isActive && (
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: theme.primary,
                marginTop: '4px'
              }} />
            )}
          </div>
        );
      })}
    </nav>
  );
};
export default BottomNav;