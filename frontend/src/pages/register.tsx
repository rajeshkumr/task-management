import { useState } from 'react';
import { useRouter } from 'next/router';
import axios, { instance } from "../lib/axios";
import { api } from '../common/api';

interface FieldError {
  errors: Array<unknown>
}

const Register = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await instance().post(api.user.register, { username, password });
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof axios.AxiosError) {
        console.error("Axios error", err);
        typeof JSON.parse(err.request.response).message === "object" ? setError(JSON.parse(err.request.response).message.map((field: FieldError) => field.errors.join("/n")).join("/n")): setError(JSON.parse(err.request.response).message);
      }
      else if (err instanceof Error) {
        console.error("Registration failed", err);
        setError(err.message);
      } 
      else {
        console.error("An unknown error occurred", err);
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Register</h1>
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-96">
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
