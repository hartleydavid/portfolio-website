import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center flex-1 px-6 md:px-12">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold animate-fadeIn">
            Hi, I'm <span className="text-yellow-300">David</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-lg">
            A passionate <span className="font-semibold">Software Developer</span> from Bothell, WA
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <a
              href="/projects"
              className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-500 transition-all"
            >
              View My Work
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border border-white font-bold rounded-lg hover:bg-white hover:text-blue-700 transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src="/me.jpg" // Replace with your actual image path
            alt="Your Name"
            width={300}
            height={300}
            className="rounded-full shadow-lg border-4 border-white"
          />
        </div>
      </div>
    </div>
  );
}
