import React, { createContext, useState, useEffect } from 'react';

const ModeContext = createContext();

const ModeProvider = ({ children }) => {
    const [isDarkMode, setDarkMode] = useState(() => {
      const localMode = localStorage.getItem('darkMode');
      return localMode ? JSON.parse(localMode) : false;
    });

    useEffect(() => {
      localStorage.setItem('darkMode',JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    return (
      <ModeContext.Provider value={{ isDarkMode, setDarkMode }}>
        {children}
      </ModeContext.Provider>
    );
  };
  
  export { ModeContext, ModeProvider };