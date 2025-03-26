import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '../api/api';

interface SignUpVariables {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation<any, Error, SignUpVariables>({
    mutationFn: ({ username, email, password }) =>
      signUpUser(username, email, password),
    onSuccess: () => {
      // After successful signup, redirect to login or auto-login.
      navigate('/login');
    },
    onError: (error: Error) => {
      console.error('Sign up failed:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    mutation.mutate({ username, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-semibold">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 font-semibold"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            {mutation.status === 'pending' ? 'Signing up...' : 'Sign Up'}
          </button>
          {mutation.status === 'error' && (
            <p className="mt-4 text-red-500">
              Sign up failed. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
