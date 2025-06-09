import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import QuizComponent from '@/components/QuizComponent'
import { athletes } from '@/data/athletes'

describe('QuizComponent', () => {
  const mockOnComplete = jest.fn()
  const mockOnRestart = jest.fn()
  const testQuestions = athletes[0].questions // Patrick Mahomes questions

  beforeEach(() => {
    mockOnComplete.mockClear()
    mockOnRestart.mockClear()
  })

  it('renders the first question correctly', () => {
    render(
      <QuizComponent
        questions={testQuestions}
        onComplete={mockOnComplete}
        onRestart={mockOnRestart}
      />
    )

    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument()
    expect(screen.getByText(testQuestions[0].question)).toBeInTheDocument()
    
    // Check that all options are rendered
    testQuestions[0].options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })

  it('shows progress bar correctly', () => {
    render(
      <QuizComponent
        questions={testQuestions}
        onComplete={mockOnComplete}
        onRestart={mockOnRestart}
      />
    )

    expect(screen.getByText('Score: 0/3')).toBeInTheDocument()
  })

  it('allows selecting an answer', () => {
    render(
      <QuizComponent
        questions={testQuestions}
        onComplete={mockOnComplete}
        onRestart={mockOnRestart}
      />
    )

    const firstOption = screen.getByText(testQuestions[0].options[0])
    fireEvent.click(firstOption)

    // The option should be selected (highlighted)
    expect(firstOption.closest('button')).toHaveClass('border-tennessee-orange')
  })

  it('shows submit button when answer is selected', () => {
    render(
      <QuizComponent
        questions={testQuestions}
        onComplete={mockOnComplete}
        onRestart={mockOnRestart}
      />
    )

    // Initially no submit button
    expect(screen.queryByText('Submit Answer')).not.toBeInTheDocument()

    // Select an answer
    const firstOption = screen.getByText(testQuestions[0].options[0])
    fireEvent.click(firstOption)

    // Submit button should appear
    expect(screen.getByText('Submit Answer')).toBeInTheDocument()
  })

  it('shows correct answer feedback after submission', async () => {
    render(
      <QuizComponent
        questions={testQuestions}
        onComplete={mockOnComplete}
        onRestart={mockOnRestart}
      />
    )

    // Select the correct answer
    const correctAnswer = screen.getByText(testQuestions[0].correct)
    fireEvent.click(correctAnswer)

    // Submit the answer
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)

    // Should show correct feedback
    await waitFor(() => {
      expect(screen.getByText('Correct!')).toBeInTheDocument()
      expect(screen.getByText(testQuestions[0].explanation)).toBeInTheDocument()
    })
  })

  it('shows incorrect answer feedback after wrong submission', async () => {
    render(
      <QuizComponent
        questions={testQuestions}
        onComplete={mockOnComplete}
        onRestart={mockOnRestart}
      />
    )

    // Find an incorrect answer (not the correct one)
    const incorrectAnswer = testQuestions[0].options.find(
      option => option !== testQuestions[0].correct
    )
    
    if (incorrectAnswer) {
      const incorrectOption = screen.getByText(incorrectAnswer)
      fireEvent.click(incorrectOption)

      // Submit the answer
      const submitButton = screen.getByText('Submit Answer')
      fireEvent.click(submitButton)

      // Should show incorrect feedback
      await waitFor(() => {
        expect(screen.getByText('Incorrect')).toBeInTheDocument()
        expect(screen.getByText(testQuestions[0].explanation)).toBeInTheDocument()
      })
    }
  })

  it('progresses to next question after answering', async () => {
    render(
      <QuizComponent
        questions={testQuestions}
        onComplete={mockOnComplete}
        onRestart={mockOnRestart}
      />
    )

    // Answer first question
    const firstAnswer = screen.getByText(testQuestions[0].correct)
    fireEvent.click(firstAnswer)
    
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)

    // Wait for feedback and then next question
    await waitFor(() => {
      expect(screen.getByText('Next Question')).toBeInTheDocument()
    })

    // Click next question
    const nextButton = screen.getByText('Next Question')
    fireEvent.click(nextButton)

    // Should show question 2
    await waitFor(() => {
      expect(screen.getByText('Question 2 of 3')).toBeInTheDocument()
      expect(screen.getByText(testQuestions[1].question)).toBeInTheDocument()
    })
  })

  it('calls onComplete when quiz is finished', async () => {
    render(
      <QuizComponent
        questions={testQuestions}
        onComplete={mockOnComplete}
        onRestart={mockOnRestart}
      />
    )

    // Answer all questions
    for (let i = 0; i < testQuestions.length; i++) {
      const correctAnswer = screen.getByText(testQuestions[i].correct)
      fireEvent.click(correctAnswer)
      
      const submitButton = screen.getByText('Submit Answer')
      fireEvent.click(submitButton)

      if (i < testQuestions.length - 1) {
        // Not the last question, click next
        await waitFor(() => {
          const nextButton = screen.getByText('Next Question')
          fireEvent.click(nextButton)
        })
      }
    }

    // Should call onComplete with the score
    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledWith(3) // All correct
    })
  })

  it('updates score correctly', async () => {
    render(
      <QuizComponent
        questions={testQuestions}
        onComplete={mockOnComplete}
        onRestart={mockOnRestart}
      />
    )

    // Answer first question correctly
    const correctAnswer = screen.getByText(testQuestions[0].correct)
    fireEvent.click(correctAnswer)
    
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)

    // Score should update
    await waitFor(() => {
      expect(screen.getByText('Score: 1/3')).toBeInTheDocument()
    })
  })
})
