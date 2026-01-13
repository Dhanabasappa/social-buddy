import  { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

const mockChats = {
  1: [
    { from: 'them', text: 'Hey! How are you?' },
    { from: 'me', text: 'I am good, how about you?' },
    { from: 'them', text: 'Doing great! Want to catch up later?' },
    { from: 'me', text: 'Sure, let me know when.' },
  ],
  2: [
    { from: 'them', text: 'Did you get the files?' },
    { from: 'me', text: 'Yes, received them. Thanks!' },
  ],
  3: [
    { from: 'them', text: 'Let’s change something in the design.' },
    { from: 'me', text: 'Send your ideas!' },
  ],
  4: [
    { from: 'them', text: 'New workout routine uploaded!' },
    { from: 'me', text: 'Awesome, I’ll check it out.' },
  ],
  5: [
    { from: 'them', text: 'Which destination next?' },
    { from: 'me', text: 'Somewhere warm!' },
  ],
};

export default function ChatRoom({ chatId, user, onBack }) {
  const { theme, isDarkMode } = useTheme();
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState(mockChats[chatId] || []);
  const messages = chatMessages;
  
  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setChatMessages([...messages, { from: 'me', text: input }]);
      setInput('');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend(e);
    }
  };
  
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', background: theme.cardBg, borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.25)', minHeight: 520, display: 'flex', flexDirection: 'column', height: '70vh', maxHeight: '80vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: 18, borderBottom: `1px solid ${theme.border}`, background: theme.cardBg, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 24, marginRight: 12, cursor: 'pointer', color: theme.text }}>←</button>
        <img src={user.avatar} alt={user.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', marginRight: 10 }} />
        <span style={{ fontWeight: 700, color: theme.text }}>{user.name}</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 18, background: isDarkMode ? '#3a3a3a' : '#f9f6f3' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start',
            marginBottom: 12
          }}>
            <div style={{
              background: msg.from === 'me' ? '#FFB6A3' : isDarkMode ? '#2a2a2a' : '#fff',
              color: msg.from === 'me' ? '#fff' : isDarkMode ? '#fff' : '#333',
              borderRadius: 16,
              padding: '8px 16px',
              maxWidth: '70%',
              boxShadow: '0 1px 4px #0001',
              fontSize: 15,
              border: isDarkMode && msg.from !== 'me' ? `1px solid ${theme.border}` : 'none'
            }}>{msg.text}</div>
          </div>
        ))}
      </div>
      <form style={{ display: 'flex', borderTop: `1px solid ${theme.border}`, background: theme.cardBg, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 14, gap: 10 }} onSubmit={handleSend}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message..." style={{ flex: 1, border: 'none', padding: 14, fontSize: 15, borderRadius: 0, outline: 'none', background: 'transparent', color: theme.text }} autoFocus />
        <button type="submit" style={{ background: '#FF8787', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 20px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  );
}
