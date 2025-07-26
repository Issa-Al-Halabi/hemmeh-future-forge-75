import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  fontClass: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction and lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    // Initialize language from localStorage or default to Arabic
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['ar', 'en'].includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      setLanguage('ar');
    }
  }, []);

  const isRTL = language === 'ar';
  const fontClass = language === 'ar' ? 'font-arabic' : 'font-english';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, fontClass }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};