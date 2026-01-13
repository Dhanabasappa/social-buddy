import { useTheme } from '../context/ThemeContext.jsx';
const StoryCircle = ({ avatar, username, hasStory, isYou, onClick }) => {
  const { theme } = useTheme();

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '80px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: isYou ? theme.secondary : hasStory ? theme.gradient : theme.border,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        position: 'relative',
        border: '3px solid white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: hasStory ? '3px' : '0'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {avatar}
        </div>

        {isYou && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: theme.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white',
            cursor: 'pointer'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        )}
      </div>

      <span style={{
        fontSize: '12px',
        marginTop: '8px',
        maxWidth: '80px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: theme.text
      }}>
        {username}
      </span>
    </div>
  );
};
export default StoryCircle;
