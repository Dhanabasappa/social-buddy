import { createContext, useContext, useState } from 'react';
// Define themes
const themes = {
  lovagram: {
    name: 'Lovagram Coral',
    primary: '#FF6B6B',
    secondary: '#FFE5E5',
    accent: '#FF8787',
    gradient: 'linear-gradient(135deg, #FFB6A3 0%, #FF8787 100%)',
    background: '#FFF5F5',
    cardBg: '#FFFFFF',
    text: '#262626',
    textSecondary: '#666666',
    border: 'rgba(0,0,0,0.05)'
  },
  instagram: {
    name: 'Instagram Purple',
    primary: '#E1306C',
    secondary: '#F3E5F5',
    accent: '#C13584',
    gradient: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%)',
    background: '#FAFAFA',
    cardBg: '#FFFFFF',
    text: '#262626',
    textSecondary: '#666666',
    border: 'rgba(0,0,0,0.05)'
  },
  twitter: {
    name: 'Twitter Blue',
    primary: '#1DA1F2',
    secondary: '#E8F5FE',
    accent: '#1A8CD8',
    gradient: 'linear-gradient(135deg, #1DA1F2 0%, #0D8BD9 100%)',
    background: '#F7F9FA',
    cardBg: '#FFFFFF',
    text: '#262626',
    textSecondary: '#666666', 
    border: 'rgba(0,0,0,0.05)'
  },
  mint : {
      name : "Fresh Mint",
      primary : "#00D9A3",
      secondary : "#E0FFF7",
      accent : "#00B88D",
      gradient : "linear-gradient(135deg, #FFBEC4 49%, #FFC4C4)",
      background : "#F9FCFC",
      cardBg : "#FFFFFF",
      text : "#2A2A2A",
      textSecondary : "#999999",
      border : "rgba(255,255,255)"
   }
};

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
 export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('lovagram');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = themes[currentTheme];

  const toggleTheme = (mode) => {
    if (mode === 'light') {
      setIsDarkMode(false);
      setCurrentTheme('lovagram');
    } else if (mode === 'dark') {
      setIsDarkMode(true);
      setCurrentTheme('instagram');
    }
  };

  // Apply theme-specific background based on isDarkMode
  const finalTheme = {
    ...theme,
    background: isDarkMode ? '#1a1a1a' : theme.background,
    text: isDarkMode ? '#ffffff' : theme.text,
    textSecondary: isDarkMode ? '#b0b0b0' : theme.textSecondary,
    cardBg: isDarkMode ? '#2a2a2a' : theme.cardBg,
    border: isDarkMode ? 'rgba(255,255,255,0.1)' : theme.border
  };

  return (
    <ThemeContext.Provider value={{ theme: finalTheme, currentTheme, setCurrentTheme, themes, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};


