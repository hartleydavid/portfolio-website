import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
      <h2 className="text-4xl font-bold text-blue-600">Hi,</h2>
      <h2 className="text-4xl font-bold text-blue-600">I'm David</h2>
      <h2 className="text-4xl font-bold text-blue-600">Software Developer</h2>
      </main>
    </div>
  );
}