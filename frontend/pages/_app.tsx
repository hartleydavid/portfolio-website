import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect, createContext, useContext } from "react";

// Create Dark Mode Context
const DarkModeContext = createContext({ darkMode: false, toggleDarkMode: () => {} });

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for dark mode preference
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Component {...pageProps} />
    </DarkModeContext.Provider>
  );
}
