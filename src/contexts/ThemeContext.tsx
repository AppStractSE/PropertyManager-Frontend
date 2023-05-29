import React from "react";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ThemeContext {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
}

const ThemeContext = createContext<ThemeContext>({
  isDarkTheme: false,
  toggleDarkTheme: () => console.warn("No theme provider"),
});

interface Props {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage<boolean>("darkMode", false);
  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]") as HTMLMetaElement;
    metaThemeColor.content = isDarkTheme ? "#111" : "#ffffff";
    if (isDarkTheme) {
      document.body.classList.add("dark");
      document.documentElement.style.setProperty("scrollbar-color", "#242424 #111");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.style.setProperty("scrollbar-color", "#e0e0e0 #f5f5f5");
    }
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
