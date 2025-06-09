import { render, screen, fireEvent } from '@testing-library/react'
import AthleteCard from '@/components/AthleteCard'
import { athletes } from '@/data/athletes'

describe('AthleteCard', () => {
  const mockOnSelect = jest.fn()
  const testAthlete = athletes[0] // Patrick Mahomes

  beforeEach(() => {
    mockOnSelect.mockClear()
  })

  it('renders athlete information correctly', () => {
    render(<AthleteCard athlete={testAthlete} onSelect={mockOnSelect} />)
    
    expect(screen.getByText(testAthlete.name)).toBeInTheDocument()
    expect(screen.getByText(testAthlete.sport)).toBeInTheDocument()
    expect(screen.getByText('Story')).toBeInTheDocument()
    expect(screen.getByText(`${testAthlete.questions.length} Questions`)).toBeInTheDocument()
  })

  it('displays the athlete emoji', () => {
    render(<AthleteCard athlete={testAthlete} onSelect={mockOnSelect} />)
    
    expect(screen.getByText(testAthlete.image)).toBeInTheDocument()
  })

  it('calls onSelect when Read Story button is clicked', () => {
    render(<AthleteCard athlete={testAthlete} onSelect={mockOnSelect} />)
    
    const readStoryButton = screen.getByText('Read Story')
    fireEvent.click(readStoryButton)
    
    expect(mockOnSelect).toHaveBeenCalledWith(testAthlete)
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  it('has proper accessibility attributes', () => {
    render(<AthleteCard athlete={testAthlete} onSelect={mockOnSelect} />)
    
    const readStoryButton = screen.getByRole('button', { name: 'Read Story' })
    expect(readStoryButton).toBeInTheDocument()
    expect(readStoryButton).toBeEnabled()
  })

  it('renders with proper CSS classes for styling', () => {
    const { container } = render(<AthleteCard athlete={testAthlete} onSelect={mockOnSelect} />)
    
    // Check that the card has proper styling classes
    const cardElement = container.firstChild
    expect(cardElement).toHaveClass('bg-dark-card')
  })

  it('displays story and questions count correctly', () => {
    render(<AthleteCard athlete={testAthlete} onSelect={mockOnSelect} />)
    
    // Check that story indicator is present
    expect(screen.getByText('Story')).toBeInTheDocument()
    
    // Check that questions count is correct
    expect(screen.getByText('3 Questions')).toBeInTheDocument()
  })
})
