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
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '👍'}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
        <div className="text-xl text-gray-600 mb-6">
          You got <span className="font-bold text-green-600">{finalScore}</span> out of{' '}
          <span className="font-bold">{questions.length}</span> questions correct!
        </div>
        <div className="text-lg text-gray-500 mb-8">
          That's {percentage}%! {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
        </div>
        <button
          onClick={handleRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 text-lg flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-blue-600">
            Score: {score}/{questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
          
          if (!showExplanation) {
            buttonClass += selectedAnswer === option
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
          } else {
            if (option === question.correct) {
              buttonClass += "border-green-500 bg-green-50 text-green-700";
            } else if (option === selectedAnswer && option !== question.correct) {
              buttonClass += "border-red-500 bg-red-50 text-red-700";
            } else {
              buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
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
                <span className="text-lg">{option}</span>
                {showExplanation && option === question.correct && (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                )}
                {showExplanation && option === selectedAnswer && option !== question.correct && (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct!' : 'Not quite right'}
            </span>
          </div>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}

      <div className="flex justify-center">
        {!showExplanation ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 text-lg"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 text-lg flex items-center gap-2"
          >
            {currentQuestion + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
