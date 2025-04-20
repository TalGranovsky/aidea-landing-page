import Link from 'next/link';

export const dynamic = 'force-static';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-purple-500 mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <Link 
          href="/" 
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
