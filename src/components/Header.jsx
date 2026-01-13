import { useTheme } from '../context/ThemeContext.jsx';

const Header = () => {
  const { theme, isDarkMode } = useTheme();

  return (
    <header style={{
      width: '100%',
      background: isDarkMode ? '#1a1a1a' : 'linear-gradient(135deg, #FFF5F5 0%, #FFE5CC 100%)',
      borderBottom: 'none',
      padding: '18px 0 12px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: 48,
      boxSizing: 'border-box',
      marginBottom: 0
    }}>
      <span style={{ 
        fontWeight: 900, 
        fontSize: 28, 
        color: '#FF8787', 
        marginLeft: 24, 
        letterSpacing: 1 
      }}>
        Social Buddy
      </span>
    </header>
  );
};
export default Header;