import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
      <h2 className="text-4xl font-bold text-blue-500">Hi, I'm David</h2>
      <h3 className="text-3xl  text-black">Software Developer from Bothell, WA</h3>
      </main>
    </div>
  );
}