'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GuestUser {
  id: string;
  name: string;
  email: string;
  isGuest: true;
}

interface GuestProgress {
  [athleteId: string]: {
    user_id: number;
    athlete_id: number;
    athlete_name: string;
    story_read: boolean;
    quiz_completed: boolean;
    quiz_score: number;
    total_questions: number;
    completion_date: string;
    time_spent_reading?: number;
  };
}

interface GuestModeContextType {
  isGuestMode: boolean;
  guestUser: GuestUser | null;
  guestProgress: GuestProgress;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
  saveGuestProgress: (athleteId: number, athleteName: string, progressData: Partial<GuestProgress[string]>) => void;
  getGuestAthleteProgress: (athleteId: number) => GuestProgress[string] | null;
}

const GuestModeContext = createContext<GuestModeContextType | undefined>(undefined);

const GUEST_USER: GuestUser = {
  id: 'guest-user',
  name: 'Guest User',
  email: 'guest@sportsheroes.local',
  isGuest: true
};

const GUEST_STORAGE_KEY = 'sports-heroes-guest-progress';

export function GuestModeProvider({ children }: { children: ReactNode }) {
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [guestProgress, setGuestProgress] = useState<GuestProgress>({});

  // Load guest progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem(GUEST_STORAGE_KEY);
      if (savedProgress) {
        try {
          setGuestProgress(JSON.parse(savedProgress));
        } catch (error) {
          console.error('Error loading guest progress:', error);
        }
      }
    }
  }, []);

  // Save guest progress to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(guestProgress).length > 0) {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guestProgress));
    }
  }, [guestProgress]);

  const enterGuestMode = () => {
    setIsGuestMode(true);
  };

  const exitGuestMode = () => {
    setIsGuestMode(false);
  };

  const saveGuestProgress = (athleteId: number, athleteName: string, progressData: Partial<GuestProgress[string]>) => {
    const athleteKey = athleteId.toString();
    const currentProgress = guestProgress[athleteKey] || {
      user_id: -1, // Use -1 as guest user ID (negative to distinguish from real WordPress user IDs)
      athlete_id: athleteId,
      athlete_name: athleteName,
      story_read: false,
      quiz_completed: false,
      quiz_score: 0,
      total_questions: 0,
      completion_date: new Date().toISOString(),
    };

    const updatedProgress = {
      ...currentProgress,
      ...progressData,
      completion_date: new Date().toISOString(),
    };

    setGuestProgress(prev => ({
      ...prev,
      [athleteKey]: updatedProgress
    }));
  };

  const getGuestAthleteProgress = (athleteId: number): GuestProgress[string] | null => {
    return guestProgress[athleteId.toString()] || null;
  };

  const value: GuestModeContextType = {
    isGuestMode,
    guestUser: isGuestMode ? GUEST_USER : null,
    guestProgress,
    enterGuestMode,
    exitGuestMode,
    saveGuestProgress,
    getGuestAthleteProgress,
  };

  return (
    <GuestModeContext.Provider value={value}>
      {children}
    </GuestModeContext.Provider>
  );
}

export function useGuestMode() {
  const context = useContext(GuestModeContext);
  if (context === undefined) {
    throw new Error('useGuestMode must be used within a GuestModeProvider');
  }
  return context;
}
