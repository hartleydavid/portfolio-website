import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
      <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-10">
			  About Me
			</h1>
      </main>
    </div>
  );
}