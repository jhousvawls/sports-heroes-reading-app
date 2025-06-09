'use client';

import { useState } from 'react';
import { User, Lock, UserPlus, LogIn, KeyRound } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string) => Promise<boolean>;
  onRegister: (userData: RegisterData) => Promise<boolean>;
  onPasswordReset: (usernameOrEmail: string) => Promise<{ success: boolean; message: string }>;
}

interface RegisterData {
  username: string;
  password: string;
}

export default function LoginForm({ onLogin, onRegister, onPasswordReset }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    username: '',
    password: ''
  });

  // Password reset form state
  const [resetData, setResetData] = useState({
    usernameOrEmail: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await onLogin(loginData.username);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const success = await onRegister(registerData);
      if (!success) {
        setError('Registration failed. Username or email may already exist.');
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const result = await onPasswordReset(resetData.usernameOrEmail);
      if (result.success) {
        setSuccessMessage(result.message);
        setResetData({ usernameOrEmail: '' });
      } else {
        setError(result.message);
      }
    } catch {
      setError('Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-dark-card rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🏆</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Sports Heroes Reading App
          </h1>
          <p className="text-sm sm:text-base text-secondary">
            {isPasswordReset ? 'Reset your password' : isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-500 text-red-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-900 border border-green-500 text-green-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base whitespace-pre-line">
            {successMessage}
          </div>
        )}

        {isPasswordReset ? (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Username or Email
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                <input
                  type="text"
                  value={resetData.usernameOrEmail}
                  onChange={(e) => setResetData({ usernameOrEmail: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-dark bg-smokey-gray text-white rounded-lg focus:ring-2 focus:ring-tennessee-orange focus:border-transparent placeholder-secondary"
                  placeholder="Enter your username or email"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-tennessee-orange hover:bg-tennessee-orange-dark disabled:bg-smokey-gray text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <KeyRound className="w-5 h-5" />
                  Reset Password
                </>
              )}
            </button>
          </form>
        ) : isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-dark bg-smokey-gray text-white rounded-lg focus:ring-2 focus:ring-tennessee-orange focus:border-transparent placeholder-secondary"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-dark bg-smokey-gray text-white rounded-lg focus:ring-2 focus:ring-tennessee-orange focus:border-transparent placeholder-secondary"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-tennessee-orange hover:bg-tennessee-orange-dark disabled:bg-smokey-gray text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                <input
                  type="text"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-dark bg-smokey-gray text-white rounded-lg focus:ring-2 focus:ring-tennessee-orange focus:border-transparent placeholder-secondary"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-dark bg-smokey-gray text-white rounded-lg focus:ring-2 focus:ring-tennessee-orange focus:border-transparent placeholder-secondary"
                  placeholder="Create a password (min 6 characters)"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-tennessee-orange hover:bg-tennessee-orange-dark disabled:bg-smokey-gray text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 text-center space-y-2">
          {isPasswordReset ? (
            <button
              onClick={() => {
                setIsPasswordReset(false);
                setIsLogin(true);
                setError('');
                setSuccessMessage('');
              }}
              className="text-tennessee-orange hover:text-white font-medium"
            >
              Back to Sign In
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccessMessage('');
                }}
                className="text-tennessee-orange hover:text-white font-medium block w-full"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
              
              {isLogin && (
                <button
                  onClick={() => {
                    setIsPasswordReset(true);
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="text-secondary hover:text-tennessee-orange font-medium text-sm"
                >
                  Forgot your password?
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
