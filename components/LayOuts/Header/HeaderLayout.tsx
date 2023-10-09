import React, { useState } from 'react';
import Navigation from './Navigation';

const HeaderLayout = ({ children }: any) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`header-layout ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Navigation />
      {children}
    </div>
  );
};

export default HeaderLayout;
