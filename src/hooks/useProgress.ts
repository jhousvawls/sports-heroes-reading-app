'use client';

import { useState, useEffect, useCallback } from 'react';
import { wordpressAPI, ProgressRecord } from '@/lib/wordpress';
import { useToast } from '@/contexts/ToastContext';

export function useProgress(userId: number | null) {
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { showSuccess, showError, showWarning } = useToast();

  const loadProgress = useCallback(async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      const userProgress = await wordpressAPI.getUserProgress(userId);
      setProgress(userProgress);
    } catch (error) {
      console.error('Error loading progress:', error);
      showWarning('Unable to load your progress. You can still continue reading!');
    } finally {
      setIsLoading(false);
    }
  }, [userId, showWarning]);

  useEffect(() => {
    if (userId) {
      loadProgress();
    }
  }, [userId, loadProgress]);

  const saveStoryRead = async (athleteId: number, athleteName: string, timeSpent?: number) => {
    if (!userId) return;

    try {
      setIsSaving(true);
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
      showSuccess('Story progress saved!');
    } catch (error) {
      console.error('Error saving story progress:', error);
      showError('Unable to save your progress right now. Don\'t worry, you can continue reading!');
    } finally {
      setIsSaving(false);
    }
  };

  const saveQuizScore = async (athleteId: number, athleteName: string, score: number, totalQuestions: number) => {
    if (!userId) return;

    try {
      setIsSaving(true);
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
      
      // Celebratory message for kids
      if (score === totalQuestions) {
        showSuccess(`🎉 Perfect score! You got all ${score} questions right!`);
      } else {
        showSuccess(`Great job! You scored ${score} out of ${totalQuestions}!`);
      }
    } catch (error) {
      console.error('Error saving quiz score:', error);
      showError('Unable to save your quiz score right now. Great job anyway!');
    } finally {
      setIsSaving(false);
    }
  };

  const getAthleteProgress = (athleteId: number): ProgressRecord | null => {
    return progress.find(p => p.athlete_id === athleteId) || null;
  };

  return {
    progress,
    isLoading,
    isSaving,
    saveStoryRead,
    saveQuizScore,
    getAthleteProgress,
    refreshProgress: loadProgress
  };
}
