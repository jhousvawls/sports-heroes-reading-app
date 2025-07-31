'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { LogOut, User, UserCheck } from 'lucide-react';
import { useGuestMode } from '@/contexts/GuestModeContext';

export default function GoogleSignIn() {
  const { data: session, status } = useSession();
  const { isGuestMode, guestUser, enterGuestMode, exitGuestMode } = useGuestMode();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      if (isGuestMode) {
        exitGuestMode();
      } else {
        await signOut({ callbackUrl: '/' });
      }
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestMode = () => {
    enterGuestMode();
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <div className="w-8 h-8 border-4 border-tennessee-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-secondary mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is signed in or in guest mode, show user info and sign out option
  if (session?.user || isGuestMode) {
    const currentUser = session?.user || guestUser;
    const isGuest = isGuestMode && !session?.user;
    
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-smokey-gray rounded-lg">
          {isGuest ? (
            <UserCheck className="w-4 h-4 text-green-400" />
          ) : (
            <User className="w-4 h-4 text-secondary" />
          )}
          <span className="text-sm font-medium text-white">
            {isGuest ? 'Guest User' : (currentUser?.name || currentUser?.email)}
          </span>
          {isGuest && (
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
              Guest
            </span>
          )}
        </div>
        
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-900 disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">{isGuest ? 'Exit Guest' : 'Sign Out'}</span>
        </button>
      </div>
    );
  }

  // Sign in form
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-dark-card rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🏆</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Sports Heroes Reading App
          </h1>
          <p className="text-sm sm:text-base text-secondary">
            Sign in with your Google account to get started
          </p>
        </div>

        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        <div className="mt-4 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-card text-secondary">or</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleGuestMode}
          disabled={isLoading}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg"
        >
          <UserCheck className="w-5 h-5" />
          Try as Guest
        </button>

        <div className="mt-6 text-center">
          <p className="text-xs text-secondary">
            Guest mode saves progress locally. Sign in with Google for cloud sync.
          </p>
          <p className="text-xs text-secondary mt-2">
            By using this app, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
