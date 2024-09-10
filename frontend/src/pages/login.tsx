import { useState } from 'react';
import { useRouter } from 'next/router';
import { instance } from "../lib/axios"
import { api } from '../common/api';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await instance().post(api.user.login, { username, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token); // Save JWT token to localStorage
      router.push('/dashboard'); // Redirect to dashboard on successful login
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">User</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
