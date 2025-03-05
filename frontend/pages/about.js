import Navbar from "../components/Navbar";

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 text-white flex flex-col pt-16">

            <Navbar />
            <div className="min-h-screen bg-gray-100 py-10 px-6">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">About Me</h1>

                    {/* Profile Picture */}
                    <div className="flex justify-center">
                        <img
                            src="/about.jpg"
                            className="w-64 h-90 rounded-lg mx-auto shadow-xl object-cover"
                            alt="David"
                        />
                    </div>

                    {/* Introduction */}
                    <p className="text-gray-700 text-lg text-center">
                        Hi! I'm David, a passionate software developer with a background in Computing/Software Development and Management.
                        I love building web applications that solve real-world problems.
                    </p>

                    {/* Education Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Education</h2>
                        <p className="text-gray-600">
                            🎓 Information Technology: Computing and Software Development - Lake Washington, Institute of Technology, 2024
                        </p>
                    </div>

                    {/* Work Experience Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Work Experience</h2>
                        <p className="text-gray-600">
                            💻 <strong>Freelance Software Development Projects </strong> – Crafted high-performance web applications tailored to my clients' needs. The main project completed
                            is the tournament bracket application. Client was estatic from the results improved the effeciency of the tournament from their previous method when hosting.
                        </p>
                        <br />
                        <p className="text-gray-600">
                            🛠️ <strong> The Home Depot </strong>– Proven leader in store operations, driving sales and reinforcing company core values daily. As a key team leader,
                            I mentor colleagues, optimize workflows, and create an engaging customer experience that aligns with business objectives.
                            I take initiative in fostering a collaborative work environment and ensuring that our team delivers top-tier service,
                            ultimately enhancing shareholder value.
                        </p>
                        <br />
                        <p className="text-gray-600">
                            🍕 <strong> Uncle Peteza's Pizzeria </strong> - Manager dedicated to team development, customer satisfaction, and operational excellence.
                            Inspired, celebrated, and mentored employees to foster a positive and high-performing work environment.
                            Enhanced the restaurant's value by actively listening to customer feedback and implementing improvements, ensuring an exceptional dining experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
