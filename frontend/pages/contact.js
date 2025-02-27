import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h2 className="text-4xl font-bold text-blue-600">Contact Information:</h2>

        <h3 className="text-2xl text-black-400">Email:</h3>
        <h3 className="text-2xl text-black-400">Phone Number:</h3>
        <h3 className="text-2xl text-black-400">LinkedIn:</h3>
        <h3 className="text-2xl text-black-400">GitHub:</h3>
        
      </main>
    </div>
  );
}