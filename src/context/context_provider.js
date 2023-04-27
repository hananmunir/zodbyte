import React, { useContext, createContext, useState, useMemo } from 'react';
import LANGUAGE from '../Data/languages';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [lang, setLang] = useState('en');
    const handleLang = () => {
        if (lang === "en") {
            return LANGUAGE[0];
        } else if (lang === "et") {
            return LANGUAGE[1];
        }
    };
    const language = useMemo(() => handleLang(), [lang]);
    
    return (
        <StateContext.Provider value={{ language, setLang }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext); 