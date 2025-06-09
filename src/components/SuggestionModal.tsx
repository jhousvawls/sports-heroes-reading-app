'use client';

import { useState } from 'react';
import { suggestedAthletes, sportCategories, SuggestedAthlete } from '@/data/suggestedAthletes';
import { X, Search, Sparkles } from 'lucide-react';

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAthlete: (athlete: SuggestedAthlete) => void;
}

export default function SuggestionModal({ isOpen, onClose, onSelectAthlete }: SuggestionModalProps) {
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  if (!isOpen) return null;

  const filteredAthletes = suggestedAthletes.filter(athlete => {
    const matchesSport = !selectedSport || athlete.sport === selectedSport;
    const matchesSearch = !searchQuery || 
      athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.sport.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const handleAthleteSelect = (athlete: SuggestedAthlete) => {
    onSelectAthlete(athlete);
    onClose();
  };

  const handleSurpriseMe = () => {
    const randomAthlete = suggestedAthletes[Math.floor(Math.random() * suggestedAthletes.length)];
    handleAthleteSelect(randomAthlete);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-dark">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🌟</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Suggest a Sports Hero</h2>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-white p-2 rounded-lg hover:bg-smokey-gray transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {!showSuggestions ? (
            /* Initial Options */
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-secondary mb-6">
                  What kind of sports hero would you like to learn about?
                </p>
              </div>

              {/* Sport Categories */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Choose a Sport:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {sportCategories.map((sport) => (
                    <button
                      key={sport.name}
                      onClick={() => {
                        setSelectedSport(sport.name);
                        setShowSuggestions(true);
                      }}
                      className="bg-smokey-gray hover:bg-tennessee-orange border-2 border-dark hover:border-tennessee-orange text-white p-4 rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <div className="text-3xl mb-2">{sport.emoji}</div>
                      <div className="font-semibold">{sport.name}</div>
                      <div className="text-xs text-secondary mt-1">
                        {sport.athletes.length} heroes
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Option */}
              <div className="border-t border-dark pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Or search for a specific athlete:</h3>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Type an athlete's name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-smokey-gray border border-dark rounded-lg text-white placeholder-secondary focus:outline-none focus:border-tennessee-orange"
                    />
                  </div>
                  <button
                    onClick={() => setShowSuggestions(true)}
                    className="bg-tennessee-orange hover:bg-tennessee-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Surprise Me Button */}
              <div className="text-center border-t border-dark pt-6">
                <button
                  onClick={handleSurpriseMe}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors duration-200 flex items-center gap-3 mx-auto"
                >
                  <Sparkles className="w-6 h-6" />
                  Surprise Me!
                </button>
                <p className="text-sm text-secondary mt-2">
                  Let us pick an amazing athlete for you to discover!
                </p>
              </div>
            </div>
          ) : (
            /* Suggestions List */
            <div className="space-y-6">
              {/* Back and Filter Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setShowSuggestions(false);
                    setSelectedSport('');
                    setSearchQuery('');
                  }}
                  className="text-tennessee-orange hover:text-white font-semibold flex items-center gap-2"
                >
                  ← Back to options
                </button>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSport('')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      !selectedSport 
                        ? 'bg-tennessee-orange text-white' 
                        : 'bg-smokey-gray text-secondary hover:text-white'
                    }`}
                  >
                    All Sports
                  </button>
                  {sportCategories.map((sport) => (
                    <button
                      key={sport.name}
                      onClick={() => setSelectedSport(sport.name)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedSport === sport.name 
                          ? 'bg-tennessee-orange text-white' 
                          : 'bg-smokey-gray text-secondary hover:text-white'
                      }`}
                    >
                      {sport.emoji} {sport.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Athletes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAthletes.map((athlete) => (
                  <div
                    key={athlete.id}
                    className="bg-smokey-gray rounded-xl p-4 border-2 border-dark hover:border-tennessee-orange transition-all duration-200 cursor-pointer transform hover:scale-105"
                    onClick={() => handleAthleteSelect(athlete)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl flex-shrink-0">{athlete.image}</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{athlete.name}</h3>
                        <div className="text-sm text-tennessee-orange font-semibold mb-2">
                          {athlete.sport}
                        </div>
                        <p className="text-sm text-secondary leading-relaxed">
                          {athlete.description}
                        </p>
                        <div className="mt-3">
                          <span className="inline-block bg-tennessee-orange text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Click to Read Story
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAthletes.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-lg text-secondary">
                    No athletes found matching your search.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSport('');
                    }}
                    className="mt-4 text-tennessee-orange hover:text-white font-semibold"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
