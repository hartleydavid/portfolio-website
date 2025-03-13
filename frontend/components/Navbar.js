import { useState } from "react";
import { useRouter } from "next/router";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useDarkMode } from "../pages/_app";


const Navbar = () => {
    //Const varuables for dark mode toggle, router for connection, and mobile menue
    const { darkMode, toggleDarkMode } = useDarkMode();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    //Set of nav links where the key (name) is the name of page and value (path) is the path to that page 
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Projects", path: "/projects" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="w-full bg-gray-900 dark:bg-gray-800 text-white p-4 shadow-md fixed top-0 left-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Title */}
                <h1 className="text-2xl font-bold">David&apos;s Portfolio</h1>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link href={link.path}>
                                {/* Set the page that we are currently on as "selected" on the navbar */}
                                <span
                                    className={`cursor-pointer px-4 py-2 rounded-md text-lg transition duration-300 
                    ${router.pathname === link.path
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-300 hover:text-white hover:bg-gray-700"
                                        }`}
                                >
                                    {link.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="ml-4 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-300"
                >
                    {/* If we are in dark mode have the moon, otherwise have sun*/}
                    {darkMode ? (
                        <MoonIcon className="w-6 h-6 text-gray-300" />
                    ) : (
                        <SunIcon className="w-6 h-6 text-yellow-400" />
                    )}
                </button>

                {/* Download Resume Button (Hidden on Small Screens) */}
                <a
                    href="/Resume.pdf"
                    download="David_H_Resume.pdf"
                    className="hidden md:flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    Download Resume
                </a>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 dark:bg-gray-800 p-4 space-y-4">
                    {navLinks.map((link) => (
                        <Link key={link.path} href={link.path}>
                            <span
                                onClick={() => setMenuOpen(false)} // Close menu on click
                                className={`block px-4 py-2 text-lg text-white rounded-md transition duration-300 
                  ${router.pathname === link.path ? "bg-blue-600" : "hover:bg-gray-700"}`}
                            >
                                {link.name}
                            </span>
                        </Link>
                    ))}

                    {/* Dark Mode Toggle for Mobile */}
                    <button
                        onClick={toggleDarkMode}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 dark:dark:bg-gray-700 dark:hover:bg-gray-300 rounded-lg"
                    >
                        {/* If we are in dark mode, have the moon icon and text. Otherwise have sun and light */}
                        {darkMode ? (
                            <>
                            <MoonIcon className="w-5 h-5 text-gray-300" />
                            <span className="text-white">Dark Mode</span>
                        </>
                        ) : (
                            
                            <>
                            <SunIcon className="w-5 h-5 text-yellow-400" />
                            <span className="text-white dark:text-black">Light Mode</span>
                        </>
                        )}
                    </button>

                    {/* Download Resume Button for Mobile */}
                    <a
                        href="/Resume.pdf"
                        download="David_H_Resume.pdf"
                        className="block text-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                    >
                        <ArrowDownTrayIcon className="w-5 h-5 inline-block mr-2" />
                        Download Resume
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
