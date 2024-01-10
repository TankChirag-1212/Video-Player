import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    const savedTheme = localStorage.getItem('theme') || 'night';
    const [theme , setTheme] = useState(savedTheme)

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'day' ? 'night' : 'day'));
    }

    const setDefaultTheme = () => {
        setTheme('day')
    }
    return(
        <ThemeContext.Provider value={{ theme, toggleTheme, setDefaultTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}