import React, { useState } from 'react';
import { Icons } from './icons';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<'google' | 'passkey' | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate API call and check mock credentials
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        onLoginSuccess();
      } else {
        setError('Invalid email or password.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: 'google' | 'passkey') => {
    setIsSocialLoading(provider);
    setError(null);
    // Simulate social login flow
    setTimeout(() => {
        onLoginSuccess();
        setIsSocialLoading(null);
    }, 1500);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 rounded-lg border border-gray-700/50 shadow-xl animate-fade-in-up">
        <div className="text-center">
          <Icons.logo className="mx-auto h-12 w-12 text-blue-400" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-100">
            Focus Flow
          </h1>
          <p className="mt-2 text-sm text-gray-400">Sign in to continue</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="password"
            />
          </div>
          
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading || !!isSocialLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gray-800/50 px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading || !!isSocialLoading}
            className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-900 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icons.google className="h-5 w-5 mr-3" />
            {isSocialLoading === 'google' ? 'Redirecting...' : 'Sign in with Google'}
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('passkey')}
            disabled={isLoading || !!isSocialLoading}
            className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-900 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icons.passkey className="h-5 w-5 mr-3" />
            {isSocialLoading === 'passkey' ? 'Authenticating...' : 'Sign in with Passkey'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
