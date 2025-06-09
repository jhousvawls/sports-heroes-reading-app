'use client';

import { useState } from 'react';
import { Question } from '@/data/athletes';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizComponentProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onRestart: () => void;
}

export default function QuizComponent({ questions, onComplete, onRestart }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      onComplete(score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0));
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
    onRestart();
  };

  if (isComplete) {
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    return (
      <div className="bg-dark-card rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center">
        <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">
          {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '👍'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Quiz Complete!</h2>
        <div className="text-lg sm:text-xl text-secondary mb-4 sm:mb-6">
          You got <span className="font-bold text-green-400">{finalScore}</span> out of{' '}
          <span className="font-bold text-white">{questions.length}</span> questions correct!
        </div>
        <div className="text-base sm:text-lg text-secondary mb-6 sm:mb-8">
          That&apos;s {percentage}%! {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
        </div>
        <button
          onClick={handleRestart}
          className="bg-tennessee-orange hover:bg-tennessee-orange-dark text-white font-bold py-3 px-6 sm:px-8 rounded-full transition-colors duration-200 text-base sm:text-lg flex items-center gap-2 mx-auto w-full sm:w-auto justify-center"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          Try Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="bg-dark-card rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-semibold text-secondary">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-tennessee-orange">
            Score: {score}/{questions.length}
          </span>
        </div>
        <div className="w-full bg-smokey-gray rounded-full h-2">
          <div
            className="bg-tennessee-orange h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 leading-tight">{question.question}</h3>

      <div className="space-y-3 mb-4 sm:mb-6">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200 ";
          
          if (!showExplanation) {
            buttonClass += selectedAnswer === option
              ? "border-tennessee-orange bg-smokey-gray text-tennessee-orange"
              : "border-dark hover:border-tennessee-orange hover:bg-smokey-gray text-white";
          } else {
            if (option === question.correct) {
              buttonClass += "border-green-500 bg-green-900 text-green-400";
            } else if (option === selectedAnswer && option !== question.correct) {
              buttonClass += "border-red-500 bg-red-900 text-red-400";
            } else {
              buttonClass += "border-dark bg-smokey-gray text-secondary";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={buttonClass}
              disabled={showExplanation}
            >
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg pr-2">{option}</span>
                {showExplanation && option === question.correct && (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                )}
                {showExplanation && option === selectedAnswer && option !== question.correct && (
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 ${isCorrect ? 'bg-green-900 border border-green-500' : 'bg-red-900 border border-red-500'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
            )}
            <span className={`font-semibold text-sm sm:text-base ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct!' : 'Not quite right'}
            </span>
          </div>
          <p className="text-sm sm:text-base text-white leading-relaxed">{question.explanation}</p>
        </div>
      )}

      <div className="flex justify-center">
        {!showExplanation ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            className="bg-tennessee-orange hover:bg-tennessee-orange-dark disabled:bg-smokey-gray disabled:cursor-not-allowed text-white font-bold py-3 px-6 sm:px-8 rounded-full transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full transition-colors duration-200 text-base sm:text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            {currentQuestion + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
