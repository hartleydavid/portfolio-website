import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">My Portfolio</h1>
      <div>
        <Link href="/">Home</Link>
        <Link href="/projects" className="ml-4">Projects</Link>
      </div>
    </nav>
  );
}