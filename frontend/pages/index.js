import Image from "next/image";
import Navbar from "../components/Navbar";


export default function Home() {

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 dark:from-gray-900 dark:to-black text-white flex flex-col">
			<Navbar />
			<div className="flex flex-col-reverse md:flex-row items-center justify-center flex-1 px-6 md:px-12">
				<div className="text-center md:text-left">
					{/* "Title" */}
					<h1 className="text-5xl md:text-6xl font-extrabold animate-fadeIn">
						Hi, I'm <span className="text-yellow-300 dark:text-yellow-400">David</span>
					</h1>
					{/* Subline Text */}
					<p className="mt-4 text-lg md:text-xl max-w-lg text-gray-200 dark:text-gray-400">
						A passionate <span className="font-semibold">Software Developer</span> from Bothell, WA
					</p>

					{/* In-Page Buttons to Projects and Contact pages*/}
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

				{/* Image of myself to the right */}
				<div className="w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
					<Image
						src="/me.jpg"
						alt="Image of Myself"
						width={320}
						height={320}
						className="rounded-lg shadow-lg border-4 border-white"
					/>
				</div>
			</div>
		</div>
	);
}
