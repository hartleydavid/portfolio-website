import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/Navbar"; // Ensure this is the correct path

export default function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 dark:from-gray-900 dark:to-black text-white flex flex-col pt-16">
            {/* Navbar */}
            <Navbar />

            {/* Contact Section */}
            <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-6">
                <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
                    {/* Title */}
                    <h1 className="text-5xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-10">
                        Contact Me
                    </h1>
                    <p className="text-gray-600 dark:text-gray-200 text-center mb-8">
                        Feel free to reach out via email or connect with me on LinkedIn.
                    </p>

                    {/* Contact Links */}
                    <div className="flex flex-col space-y-4">
                        {/* Email Link*/}
                        <a
                            href="mailto:david.hartley31@gmail.com"
                            className="flex items-center justify-center gap-3 px-4 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                        >
                            <FaEnvelope className="w-5 h-5" /> david.hartley31@gmail.com
                        </a>

                        {/* LinkedIn Link*/}
                        <a
                            href="https://www.linkedin.com/in/david-hartley31/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                        >
                            <FaLinkedin className="w-5 h-5" /> LinkedIn
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}
