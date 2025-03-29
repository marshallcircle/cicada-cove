import { useState } from 'react';
import { signIn, signUp } from '@/lib/supabase';

type AuthMode = 'signin' | 'signup';

interface AuthFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  redirectTo?: string;
}

export default function AuthForm({ onSuccess, onError, redirectTo }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'signin') {
        const { data, error } = await signIn(email, password);
        
        if (error) throw error;
        
        setMessage('Successfully signed in!');
        if (onSuccess) onSuccess();
      } else {
        const { data, error } = await signUp(email, password);
        
        if (error) throw error;
        
        setMessage('Check your email for the confirmation link.');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setMessage(error.message || 'An error occurred during authentication.');
      if (onError) onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {mode === 'signin' ? 'Sign In' : 'Create Account'}
      </h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${message.includes('error') || message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cicada-red"
            placeholder="your@email.com"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cicada-red"
            placeholder="••••••••"
            minLength={6}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cicada-black text-cicada-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-cicada-red disabled:opacity-50"
        >
          {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <button
          onClick={toggleMode}
          className="text-sm text-cicada-red hover:underline focus:outline-none"
        >
          {mode === 'signin' 
            ? "Don't have an account? Sign up" 
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}