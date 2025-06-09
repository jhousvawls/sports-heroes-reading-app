'use client';

import { useState, useEffect } from 'react';
import { wordpressAPI, ProgressRecord } from '@/lib/wordpress';

export function useProgress(userId: number | null) {
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadProgress();
    }
  }, [userId]);

  const loadProgress = async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      const userProgress = await wordpressAPI.getUserProgress(userId);
      setProgress(userProgress);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveStoryRead = async (athleteId: number, athleteName: string, timeSpent?: number) => {
    if (!userId) return;

    try {
      const existingProgress = await wordpressAPI.getAthleteProgress(userId, athleteId);
      
      if (existingProgress) {
        await wordpressAPI.updateProgress(userId, athleteId, {
          story_read: true,
          time_spent_reading: timeSpent,
          completion_date: new Date().toISOString()
        });
      } else {
        await wordpressAPI.saveProgress({
          user_id: userId,
          athlete_id: athleteId,
          athlete_name: athleteName,
          story_read: true,
          quiz_completed: false,
          quiz_score: 0,
          total_questions: 0,
          completion_date: new Date().toISOString(),
          time_spent_reading: timeSpent
        });
      }
      
      await loadProgress();
    } catch (error) {
      console.error('Error saving story progress:', error);
    }
  };

  const saveQuizScore = async (athleteId: number, athleteName: string, score: number, totalQuestions: number) => {
    if (!userId) return;

    try {
      const existingProgress = await wordpressAPI.getAthleteProgress(userId, athleteId);
      
      if (existingProgress) {
        await wordpressAPI.updateProgress(userId, athleteId, {
          quiz_completed: true,
          quiz_score: score,
          total_questions: totalQuestions,
          completion_date: new Date().toISOString()
        });
      } else {
        await wordpressAPI.saveProgress({
          user_id: userId,
          athlete_id: athleteId,
          athlete_name: athleteName,
          story_read: false,
          quiz_completed: true,
          quiz_score: score,
          total_questions: totalQuestions,
          completion_date: new Date().toISOString()
        });
      }
      
      await loadProgress();
    } catch (error) {
      console.error('Error saving quiz score:', error);
    }
  };

  const getAthleteProgress = (athleteId: number): ProgressRecord | null => {
    return progress.find(p => p.athlete_id === athleteId) || null;
  };

  return {
    progress,
    isLoading,
    saveStoryRead,
    saveQuizScore,
    getAthleteProgress,
    refreshProgress: loadProgress
  };
}
