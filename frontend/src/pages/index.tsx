import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  // Check if the user is logged in (i.e., if a JWT token is stored)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If the token exists, redirect to the dashboard
      router.push('/dashboard');
    }
  }, [router]);

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Task Manager</h1>
      <div className="flex space-x-4">
        <button
          onClick={handleLoginRedirect}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
        <button
          onClick={handleRegisterRedirect}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
