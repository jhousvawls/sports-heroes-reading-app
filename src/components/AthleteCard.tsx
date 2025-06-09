import { Athlete } from '@/data/athletes';
import { SuggestedAthlete } from '@/data/suggestedAthletes';
import { BookOpen, Trophy, Heart } from 'lucide-react';

type AthleteType = Athlete | SuggestedAthlete;

interface AthleteCardProps {
  athlete: AthleteType;
  onSelect: (athlete: AthleteType) => void;
}

export default function AthleteCard({ athlete, onSelect }: AthleteCardProps) {
  return (
    <div 
      className="bg-dark-card rounded-xl shadow-lg p-4 sm:p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl border-2 border-dark hover:border-tennessee-orange"
      onClick={() => onSelect(athlete)}
    >
      <div className="text-center">
        <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{athlete.image}</div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{athlete.name}</h3>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          <span className="text-base sm:text-lg font-semibold text-secondary">{athlete.sport}</span>
        </div>
        
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-secondary mb-4">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Story</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{athlete.questions.length} Questions</span>
          </div>
        </div>
        
        <button className="bg-tennessee-orange hover:bg-tennessee-orange-dark text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto">
          Read Story
        </button>
      </div>
    </div>
  );
}
