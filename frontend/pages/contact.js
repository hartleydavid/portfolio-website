import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h2>Contact Information</h2>
        <h2 className="text-4xl font-bold text-blue-600">Find me...</h2>
      </main>
    </div>
  );
}