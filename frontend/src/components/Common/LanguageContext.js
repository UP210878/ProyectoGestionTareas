import React, { createContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(() => {
      const localLang = localStorage.getItem('currentLang');
      return localLang ? localLang : 'en';
    });

    useEffect(() => {
      localStorage.setItem('currentLang',currentLanguage);
    }, [currentLanguage]);

    return (
      <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
  };
  
  export { LanguageContext, LanguageProvider };