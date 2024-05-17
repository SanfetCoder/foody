
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Foody</h1>
      <div className="flex space-x-4">
        <Link className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md" href="/sign-in">
            Sign In
        </Link>
        <Link className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md" href="/sign-up">
            Sign Up
        </Link>
      </div>
    </div>
  );
};

export default HomePage;