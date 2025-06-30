'use client';

import { Athlete } from '@/data/athletes';
import { SuggestedAthlete } from '@/data/suggestedAthletes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faTrophy, faHeart } from '@fortawesome/free-solid-svg-icons';
import ProgressBadge from './ProgressBadge';
import { ProgressRecord } from '@/lib/wordpress';

type AthleteType = Athlete | SuggestedAthlete;

interface AthleteCardProps {
  athlete: AthleteType;
  onSelect: (athlete: AthleteType) => void;
  progress?: ProgressRecord | null;
}

export default function AthleteCard({ athlete, onSelect, progress }: AthleteCardProps) {
  const getProgressStatus = () => {
    if (!progress) return 'not-started';
    if (progress.quiz_completed && progress.quiz_score === progress.total_questions) {
      return 'completed';
    }
    if (progress.story_read) {
      return 'in-progress';
    }
    return 'not-started';
  };

  const status = getProgressStatus();
  
  // Determine card styling based on progress
  const getCardStyling = () => {
    switch (status) {
      case 'completed':
        return 'border-green-500/50 bg-gradient-to-br from-dark-card to-green-900/20';
      case 'in-progress':
        return 'border-yellow-500/50 bg-gradient-to-br from-dark-card to-yellow-900/20';
      default:
        return 'border-dark hover:border-tennessee-orange';
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'completed':
        return 'Story Completed!';
      case 'in-progress':
        return 'Continue Story';
      default:
        return 'Read Story';
    }
  };

  return (
    <div 
      className={`relative bg-dark-card rounded-xl shadow-lg p-4 sm:p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl border-2 ${getCardStyling()}`}
      onClick={() => onSelect(athlete)}
    >
      {/* Progress Badge */}
      <div className="absolute top-3 right-3 z-10">
        <ProgressBadge progress={progress} size="sm" />
      </div>

      <div className="text-center">
        <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{athlete.image}</div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{athlete.name}</h3>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <FontAwesomeIcon icon={faTrophy} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          <span className="text-base sm:text-lg font-semibold text-secondary">{athlete.sport}</span>
        </div>
        
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-secondary mb-4">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faBookOpen} className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Story</span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faHeart} className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{athlete.questions.length} Questions</span>
          </div>
        </div>

        {/* Progress Summary */}
        {progress && (
          <div className="mb-4">
            <ProgressBadge progress={progress} showLabel={true} size="sm" />
          </div>
        )}
        
        <button className={`font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto ${
          status === 'completed' 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-tennessee-orange hover:bg-tennessee-orange-dark text-white'
        }`}>
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
