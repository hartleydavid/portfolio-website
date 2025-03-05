import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowDownTrayIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Navbar = () => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    //Link Paths in the Page
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Projects", path: "/projects" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="w-full bg-gray-900 text-white p-4 shadow-md fixed top-0 left-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/*Title*/}
                <h1 className="text-2xl font-bold">David's Portfolio</h1>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link href={link.path}>
                                {/* Have the current tab highlighted on the navbar*/}
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

                {/* Download Resume Button (Hidden on Small Screens, moved to dropdown menu) */}
                <a
                    href="/Resume.pdf"
                    download="David_H_Resume.pdf"
                    className="hidden md:flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    Download Resume
                </a>

                {/* Mobile Menu Button (Screen gets too small to fit all links)*/}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 p-4 space-y-4">
                    {navLinks.map((link) => (
                        <Link key={link.path} href={link.path}>
                            <span
                                onClick={() => setMenuOpen(false)} // Close menu on click
                                className={`block px-4 py-2 text-lg text-white rounded-md transition duration-300 
                ${router.pathname === link.path
                                        ? "bg-blue-600"
                                        : "hover:bg-gray-700"
                                    }`}
                            >
                                {link.name}
                            </span>
                        </Link>
                    ))}

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
