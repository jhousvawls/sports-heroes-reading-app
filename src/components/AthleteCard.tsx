import { Athlete } from '@/data/athletes';
import { BookOpen, Trophy, Heart } from 'lucide-react';

interface AthleteCardProps {
  athlete: Athlete;
  onSelect: (athlete: Athlete) => void;
}

export default function AthleteCard({ athlete, onSelect }: AthleteCardProps) {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-blue-300"
      onClick={() => onSelect(athlete)}
    >
      <div className="text-center">
        <div className="text-6xl mb-4">{athlete.image}</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{athlete.name}</h3>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-lg font-semibold text-gray-600">{athlete.sport}</span>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>Story</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{athlete.questions.length} Questions</span>
          </div>
        </div>
        
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 text-lg">
          Read Story
        </button>
      </div>
    </div>
  );
}
