import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect, createContext, useContext } from "react";

// Create Dark Mode Context
const DarkModeContext = createContext({ darkMode: false, toggleDarkMode: () => { } });

//Custom hook that will allow any components to access dark mode in the site
export function useDarkMode() {
	return useContext(DarkModeContext);
}

//App component for the page
export default function App({ Component, pageProps }: AppProps) {
	//Dark mode variable
	const [darkMode, setDarkMode] = useState(false);

	//Fetch local storage's value for theme (dark/light mode preference)
	useEffect(() => {
		// Check localStorage for dark mode preference and set it
		const storedTheme = localStorage.getItem("theme");
		//Find system preference
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		
		//If the stored theme is dark or there is no stored theme and system says dark theme
		if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
			//Set to dark mode
			setDarkMode(true);
			document.documentElement.classList.add("dark");
		} else {
			//Set to light mode (remove dark mode tags)
			setDarkMode(false);
			document.documentElement.classList.remove("dark");
		}
	}, []);

	//Toggle dark mode function
	const toggleDarkMode = () => {
		//Setter for dark mode
		setDarkMode((prevMode) => {
			//The new mode is the opposite of the old mode
			const newMode = !prevMode;
			//If the new mode is dark mode (true)
			if (newMode) {
				//Update the page to reflect dark mode
				document.documentElement.classList.add("dark");
				localStorage.setItem("theme", "dark");
			} else {
				//Otherwise update page to reflect light mode
				document.documentElement.classList.remove("dark");
				localStorage.setItem("theme", "light");
			}
			//Return the new mode
			return newMode;
		});
	};

	//Provide the dark mode context to the app so all pages can toggle dark mode
	return (
		<DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
			<Component {...pageProps} />
		</DarkModeContext.Provider>
	);
}
