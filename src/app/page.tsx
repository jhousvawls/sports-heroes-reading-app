'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { athletes, Athlete } from '@/data/athletes';
import { suggestedAthletes, SuggestedAthlete } from '@/data/suggestedAthletes';
import AthleteCard from '@/components/AthleteCard';
import QuizComponent from '@/components/QuizComponent';
import GoogleSignIn from '@/components/GoogleSignIn';
import PrintPreview from '@/components/PrintPreview';
import SuggestionModal from '@/components/SuggestionModal';
import { useProgress } from '@/hooks/useProgress';
import { useGuestMode } from '@/contexts/GuestModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faVolumeUp, 
  faVolumeMute, 
  faHome, 
  faUser, 
  faTrophy, 
  faClock, 
  faPrint, 
  faFileText, 
  faPlus, 
  faStar 
} from '@fortawesome/free-solid-svg-icons';

type ViewState = 'home' | 'story' | 'quiz' | 'progress';
type AthleteType = Athlete | SuggestedAthlete;

export default function Home() {
  const { data: session, status } = useSession();
  const { isGuestMode, guestUser, saveGuestProgress, getGuestAthleteProgress } = useGuestMode();
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteType | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [storyStartTime, setStoryStartTime] = useState<number | null>(null);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  // Get WordPress user ID from session or use guest mode
  const wpUserId = session?.user?.wpUserId || null;
  const isAuthenticated = session?.user || isGuestMode;

  const { 
    saveStoryRead, 
    saveQuizScore, 
    getAthleteProgress 
  } = useProgress(wpUserId);

  // Show loading screen while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <div className="w-8 h-8 border-4 border-tennessee-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Show Google Sign-In if not authenticated and not in guest mode
  if (!isAuthenticated) {
    return <GoogleSignIn />;
  }

  // Check user approval status if approval system is enabled (only for regular users, not guests)
  if (session?.user?.approvalStatus?.approval_required && !session.user.approvalStatus?.is_approved) {
    if (session.user.approvalStatus.approval_status === 'pending') {
      // User is pending approval
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Account Pending Approval
              </h1>
            </div>
            <div className="text-gray-600 space-y-4 mb-6">
              <p>
                Thank you for signing up for the Sports Heroes Reading App!
              </p>
              <p>
                Your account is currently pending approval from an administrator. 
                You'll receive an email notification once your account has been approved.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Check Status Again
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Signed in as: <strong>{session.user.email}</strong>
              </p>
            </div>
          </div>
        </div>
      );
    } else if (session.user.approvalStatus.approval_status === 'denied') {
      // User was denied access
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Access Denied
              </h1>
            </div>
            <div className="text-gray-600 space-y-4 mb-6">
              <p>
                We're sorry, but your access to the Sports Heroes Reading App has been denied.
              </p>
              <p>
                If you believe this is an error, please contact our support team for assistance.
              </p>
            </div>
            <div className="space-y-3">
              <a
                href="mailto:support@sportsheroes.com?subject=Access Denied - Account Review Request"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                Contact Support
              </a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Account: <strong>{session.user.email}</strong>
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  const handleAthleteSelect = (athlete: AthleteType) => {
    setSelectedAthlete(athlete);
    setCurrentView('story');
    setStoryStartTime(Date.now());
  };

  const handleSuggestedAthleteSelect = (athlete: SuggestedAthlete) => {
    setSelectedAthlete(athlete);
    setCurrentView('story');
    setStoryStartTime(Date.now());
  };

  const handleStartQuiz = async () => {
    if (selectedAthlete && storyStartTime) {
      const timeSpent = Math.round((Date.now() - storyStartTime) / 1000);
      
      if (isGuestMode) {
        // Save to guest mode localStorage
        saveGuestProgress(selectedAthlete.id, selectedAthlete.name, {
          story_read: true,
          time_spent_reading: timeSpent
        });
      } else if (wpUserId) {
        // Save to WordPress
        await saveStoryRead(selectedAthlete.id, selectedAthlete.name, timeSpent);
      }
    }
    setCurrentView('quiz');
  };

  const handleQuizComplete = async (score: number) => {
    if (selectedAthlete) {
      if (isGuestMode) {
        // Save to guest mode localStorage
        saveGuestProgress(selectedAthlete.id, selectedAthlete.name, {
          quiz_completed: true,
          quiz_score: score,
          total_questions: selectedAthlete.questions.length
        });
      } else if (wpUserId) {
        // Save to WordPress
        await saveQuizScore(selectedAthlete.id, selectedAthlete.name, score, selectedAthlete.questions.length);
      }
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

  const handlePrint = () => {
    window.print();
  };

  const handlePrintPreview = () => {
    setShowPrintPreview(true);
  };

  // Main navigation header
  const renderHeader = () => (
    <div className="bg-dark-card shadow-sm border-b border-dark">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-xl sm:text-2xl">🏆</div>
            <h1 className="text-lg sm:text-xl font-bold text-white">Sports Heroes</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setCurrentView('progress')}
              className="flex items-center gap-2 px-3 py-2 text-secondary hover:text-tennessee-orange rounded-lg hover:bg-smokey-gray"
            >
              <FontAwesomeIcon icon={faTrophy} className="w-4 h-4" />
              Progress
            </button>
            
            <GoogleSignIn />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCurrentView('progress')}
              className="flex items-center justify-center w-10 h-10 text-secondary hover:text-tennessee-orange rounded-lg hover:bg-smokey-gray"
              title="Progress"
            >
              <FontAwesomeIcon icon={faTrophy} className="w-5 h-5" />
            </button>
            
            <GoogleSignIn />
          </div>
        </div>
        
        {/* Mobile User Info */}
        <div className="md:hidden mt-2 pt-2 border-t border-dark">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
            <span>
              {isGuestMode 
                ? 'Guest User' 
                : (session?.user?.name || session?.user?.email || 'User')
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Progress view
  if (currentView === 'progress') {
    return (
      <div className="min-h-screen bg-background">
        {renderHeader()}
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-tennessee-orange hover:text-white font-semibold"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Athletes</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>

            <div className="bg-dark-card rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Your Reading Progress</h2>
              
              <div className="grid gap-4 sm:gap-6">
                {[...athletes, ...suggestedAthletes].map((athlete) => {
                  // Get progress from either WordPress or guest mode
                  const athleteProgress = isGuestMode 
                    ? getGuestAthleteProgress(athlete.id)
                    : getAthleteProgress(athlete.id);
                  const isSuggested = athlete.id > 100; // Suggested athletes have IDs > 100
                  return (
                    <div key={athlete.id} className="border border-dark rounded-lg p-4 sm:p-6 bg-smokey-gray">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="text-3xl sm:text-4xl">{athlete.image}</div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg sm:text-xl font-bold text-white truncate">{athlete.name}</h3>
                            {isSuggested && (
                              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold flex-shrink-0">
                                <FontAwesomeIcon icon={faStar} className="w-3 h-3 inline mr-1" />
                                Suggested
                              </span>
                            )}
                          </div>
                          <p className="text-sm sm:text-base text-secondary">{athlete.sport}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${athleteProgress?.story_read ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                          <span className="text-sm text-secondary">
                            Story {athleteProgress?.story_read ? 'Read' : 'Not Read'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${athleteProgress?.quiz_completed ? 'bg-tennessee-orange' : 'bg-gray-500'}`}></div>
                          <span className="text-sm text-secondary">
                            Quiz {athleteProgress?.quiz_completed ? `${athleteProgress.quiz_score}/${athleteProgress.total_questions}` : 'Not Taken'}
                          </span>
                        </div>
                        
                        {athleteProgress?.time_spent_reading && (
                          <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
                            <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-secondary flex-shrink-0" />
                            <span className="text-sm text-secondary">
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

        {/* Suggestion Modal */}
        <SuggestionModal
          isOpen={showSuggestionModal}
          onClose={() => setShowSuggestionModal(false)}
          onSelectAthlete={handleSuggestedAthleteSelect}
        />
      </div>
    );
  }

  // Home view
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-background">
        {renderHeader()}
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Choose Your Sports Hero
            </h2>
            <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto px-2">
              Read amazing stories about your favorite athletes and test your understanding with fun quizzes!
            </p>
          </div>

          <div className="space-y-8">
            {/* Main Athletes */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                Featured Sports Heroes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
                {athletes.map((athlete) => {
                  // Get progress from either WordPress or guest mode
                  const athleteProgress = isGuestMode 
                    ? getGuestAthleteProgress(athlete.id)
                    : getAthleteProgress(athlete.id);
                  return (
                    <AthleteCard
                      key={athlete.id}
                      athlete={athlete}
                      onSelect={handleAthleteSelect}
                      progress={athleteProgress}
                    />
                  );
                })}
              </div>
            </div>

            {/* Suggestion Button */}
            <div className="text-center">
              <div className="bg-dark-card rounded-xl p-6 sm:p-8 max-w-2xl mx-auto">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Want to Learn About More Athletes?
                </h3>
                <p className="text-secondary mb-6">
                  Discover amazing stories from soccer, basketball, baseball, and football heroes!
                </p>
                <button
                  onClick={() => setShowSuggestionModal(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-lg sm:text-xl transition-colors duration-200 shadow-lg flex items-center gap-3 mx-auto"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-5 h-5 sm:w-6 sm:h-6" />
                  Suggest a Sports Hero
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion Modal */}
        <SuggestionModal
          isOpen={showSuggestionModal}
          onClose={() => setShowSuggestionModal(false)}
          onSelectAthlete={handleSuggestedAthleteSelect}
        />
      </div>
    );
  }

  // Story view
  if (currentView === 'story' && selectedAthlete) {
    return (
      <div className="min-h-screen bg-background">
        {renderHeader()}
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-4 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  onClick={handleBackToHome}
                  className="flex items-center gap-2 text-tennessee-orange hover:text-white font-semibold"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
                  <span className="hidden sm:inline">Back to Athletes</span>
                  <span className="sm:hidden">Back</span>
                </button>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={toggleReading}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                      isReading 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    <FontAwesomeIcon icon={isReading ? faVolumeMute : faVolumeUp} className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{isReading ? 'Stop Reading' : 'Read Aloud'}</span>
                    <span className="sm:hidden">{isReading ? 'Stop' : 'Listen'}</span>
                  </button>
                  
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors text-sm sm:text-base"
                  >
                    <FontAwesomeIcon icon={faPrint} className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Print</span>
                  </button>
                  
                  <button
                    onClick={handlePrintPreview}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-colors text-sm sm:text-base"
                  >
                    <FontAwesomeIcon icon={faFileText} className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Print Preview</span>
                    <span className="sm:hidden">Preview</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-dark-card rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
              {/* Print Header - Hidden on screen, visible when printing */}
              <div className="print-only print-story-header">
                <div className="print-story-title">{selectedAthlete.name}</div>
                <div className="print-story-subtitle">{selectedAthlete.sport} Player</div>
              </div>

              <div className="text-center mb-6 sm:mb-8 screen-only">
                <div className="text-6xl sm:text-7xl lg:text-8xl mb-3 sm:mb-4 print-athlete-image">{selectedAthlete.image}</div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{selectedAthlete.name}</h1>
                <p className="text-lg sm:text-xl text-secondary">{selectedAthlete.sport} Player</p>
              </div>

              {/* Print-only athlete image */}
              <div className="print-only print-athlete-image">{selectedAthlete.image}</div>

              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none print-story-content">
                {selectedAthlete.story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-white leading-relaxed mb-4 text-base sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleStartQuiz}
                className="bg-tennessee-orange hover:bg-tennessee-orange-dark text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-lg sm:text-xl transition-colors duration-200 shadow-lg w-full sm:w-auto"
              >
                Take the Quiz! 🧠
              </button>
            </div>
          </div>
        </div>
        
        {/* Print Preview Modal */}
        {showPrintPreview && selectedAthlete && (
          <PrintPreview
            athlete={selectedAthlete}
            onClose={() => setShowPrintPreview(false)}
          />
        )}

        {/* Suggestion Modal */}
        <SuggestionModal
          isOpen={showSuggestionModal}
          onClose={() => setShowSuggestionModal(false)}
          onSelectAthlete={handleSuggestedAthleteSelect}
        />
      </div>
    );
  }

  // Quiz view
  if (currentView === 'quiz' && selectedAthlete) {
    return (
      <div className="min-h-screen bg-background">
        {renderHeader()}
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <button
                onClick={handleBackToStory}
                className="flex items-center gap-2 text-tennessee-orange hover:text-white font-semibold"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Story</span>
                <span className="sm:hidden">Back</span>
              </button>
              
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-secondary hover:text-white font-semibold"
              >
                <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
                <span className="sm:hidden">Home</span>
              </button>
            </div>

            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {selectedAthlete.name} Quiz
              </h1>
              <p className="text-sm sm:text-base text-secondary">
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

        {/* Suggestion Modal */}
        <SuggestionModal
          isOpen={showSuggestionModal}
          onClose={() => setShowSuggestionModal(false)}
          onSelectAthlete={handleSuggestedAthleteSelect}
        />
      </div>
    );
  }

  return null;
}
