import React, { createContext, useState } from 'react';

const ModeContext = createContext();

const ModeProvider = ({ children }) => {
    const [isDarkMode, setDarkMode] = useState(false);

    return (
      <ModeContext.Provider value={{ isDarkMode, setDarkMode }}>
        {children}
      </ModeContext.Provider>
    );
  };
  
  export { ModeContext, ModeProvider };