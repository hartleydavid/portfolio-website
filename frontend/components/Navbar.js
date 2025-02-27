import { useRouter } from "next/router";
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
      </div>
    </nav>
  );
};

export default Navbar;