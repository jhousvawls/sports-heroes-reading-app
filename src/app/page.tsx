'use client';

import { useState, useEffect } from 'react';
import { athletes, Athlete } from '@/data/athletes';
import AthleteCard from '@/components/AthleteCard';
import QuizComponent from '@/components/QuizComponent';
import LoginForm from '@/components/LoginForm';
import { useProgress } from '@/hooks/useProgress';
import { wordpressAPI, WordPressUser } from '@/lib/wordpress';
import { ArrowLeft, Volume2, VolumeX, Home as HomeIcon, LogOut, User, Trophy, Clock } from 'lucide-react';

type ViewState = 'home' | 'story' | 'quiz' | 'progress';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [user, setUser] = useState<WordPressUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storyStartTime, setStoryStartTime] = useState<number | null>(null);

  const { 
    progress, 
    saveStoryRead, 
    saveQuizScore, 
    getAthleteProgress 
  } = useProgress(user?.id || null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('sportsHeroesUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const userData = await wordpressAPI.getUser(username);
      if (userData) {
        setUser(userData);
        localStorage.setItem('sportsHeroesUser', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleRegister = async (userData: RegisterData): Promise<boolean> => {
    try {
      const newUser = await wordpressAPI.createUser({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
      });

      setUser(newUser);
      localStorage.setItem('sportsHeroesUser', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sportsHeroesUser');
    setCurrentView('home');
    setSelectedAthlete(null);
    setIsReading(false);
  };

  const handleAthleteSelect = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setCurrentView('story');
    setStoryStartTime(Date.now());
  };

  const handleStartQuiz = async () => {
    if (selectedAthlete && user && storyStartTime) {
      const timeSpent = Math.round((Date.now() - storyStartTime) / 1000);
      await saveStoryRead(selectedAthlete.id, selectedAthlete.name, timeSpent);
    }
    setCurrentView('quiz');
  };

  const handleQuizComplete = async (score: number) => {
    if (selectedAthlete && user) {
      await saveQuizScore(selectedAthlete.id, selectedAthlete.name, score, selectedAthlete.questions.length);
      console.log(`Quiz completed with score: ${score}/${selectedAthlete.questions.length}`);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedAthlete(null);
    setIsReading(false);
    setStoryStartTime(null);
  };

  const handleBackToStory = () => {
    setCurrentView('story');
  };

  const toggleReading = () => {
    if (!selectedAthlete) return;
    
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(selectedAthlete.story);
      utterance.rate = 0.8;
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!user) {
    return <LoginForm onLogin={handleLogin} onRegister={handleRegister} />;
  }

  // Main navigation header
  const renderHeader = () => (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl">🏆</div>
            <h1 className="text-xl font-bold text-gray-800">Sports Heroes</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('progress')}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100"
            >
              <Trophy className="w-4 h-4" />
              Progress
            </button>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {user.first_name} {user.last_name}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Progress view
  if (currentView === 'progress') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {renderHeader()}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Athletes
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Reading Progress</h2>
              
              <div className="grid gap-6">
                {athletes.map((athlete) => {
                  const athleteProgress = getAthleteProgress(athlete.id);
                  return (
                    <div key={athlete.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{athlete.image}</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{athlete.name}</h3>
                          <p className="text-gray-600">{athlete.sport}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${athleteProgress?.story_read ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm text-gray-600">
                            Story {athleteProgress?.story_read ? 'Read' : 'Not Read'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${athleteProgress?.quiz_completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm text-gray-600">
                            Quiz {athleteProgress?.quiz_completed ? `${athleteProgress.quiz_score}/${athleteProgress.total_questions}` : 'Not Taken'}
                          </span>
                        </div>
                        
                        {athleteProgress?.time_spent_reading && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {Math.round(athleteProgress.time_spent_reading / 60)} min read
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Home view
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {renderHeader()}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your Sports Hero
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Read amazing stories about your favorite athletes and test your understanding with fun quizzes!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {athletes.map((athlete) => {
              const athleteProgress = getAthleteProgress(athlete.id);
              return (
                <div key={athlete.id} className="relative">
                  <AthleteCard
                    athlete={athlete}
                    onSelect={handleAthleteSelect}
                  />
                  {athleteProgress && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      {athleteProgress.story_read && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">📖</span>
                        </div>
                      )}
                      {athleteProgress.quiz_completed && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Story view
  if (currentView === 'story' && selectedAthlete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {renderHeader()}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Athletes
              </button>
              
              <button
                onClick={toggleReading}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
                  isReading 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isReading ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                {isReading ? 'Stop Reading' : 'Read Aloud'}
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">{selectedAthlete.image}</div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{selectedAthlete.name}</h1>
                <p className="text-xl text-gray-600">{selectedAthlete.sport} Player</p>
              </div>

              <div className="prose prose-lg max-w-none">
                {selectedAthlete.story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleStartQuiz}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-colors duration-200 shadow-lg"
              >
                Take the Quiz! 🧠
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz view
  if (currentView === 'quiz' && selectedAthlete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {renderHeader()}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleBackToStory}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Story
              </button>
              
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold"
              >
                <HomeIcon className="w-5 h-5" />
                Home
              </button>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedAthlete.name} Quiz
              </h1>
              <p className="text-gray-600">
                Test your understanding of the story you just read!
              </p>
            </div>

            <QuizComponent
              questions={selectedAthlete.questions}
              onComplete={handleQuizComplete}
              onRestart={() => setCurrentView('quiz')}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
