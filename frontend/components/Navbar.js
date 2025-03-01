import { useRouter } from "next/router";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();

  // Define navigation links
  const navLinks = [
    { name: "Home", path: "/" },
	{ name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">David's Portfolio</h1>

        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path}>
				<span
				  //Set the current paths styling to be colored when we are on that page
                  className={`cursor-pointer px-3 py-2 rounded-md text-lg transition duration-300 
                  ${
                    router.pathname === link.path
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

        {/* Download Resume Button */}
        <a
          href="/Resume.pdf" 
          download="David_H_Resume.pdf"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          <ArrowDownTrayIcon className="w-5 h-5" /> 
          Download Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;