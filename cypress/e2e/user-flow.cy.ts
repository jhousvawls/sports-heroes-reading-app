describe('Sports Heroes App - User Flow', () => {
  beforeEach(() => {
    cy.loginAsTestUser()
  })

  it('should display the home page with featured athletes', () => {
    cy.visit('/')
    
    // Check main heading
    cy.contains('Choose Your Sports Hero').should('be.visible')
    cy.contains('Read amazing stories about your favorite athletes').should('be.visible')
    
    // Check featured athletes section
    cy.contains('Featured Sports Heroes').should('be.visible')
    
    // Verify some featured athletes are displayed
    cy.contains('Patrick Mahomes').should('be.visible')
    cy.contains('Serena Williams').should('be.visible')
    cy.contains('LeBron James').should('be.visible')
    
    // Check suggestion button
    cy.contains('Suggest a Sports Hero').should('be.visible')
  })

  it('should allow reading a story and taking a quiz', () => {
    cy.visit('/')
    
    // Select Patrick Mahomes
    cy.contains('Patrick Mahomes').parent().find('button').contains('Read Story').click()
    
    // Verify story page
    cy.contains('Patrick Mahomes').should('be.visible')
    cy.contains('Football Player').should('be.visible')
    cy.contains('Take the Quiz!').should('be.visible')
    
    // Check story content is present
    cy.get('.prose').should('contain.text', 'Patrick')
    
    // Take the quiz
    cy.contains('Take the Quiz!').click()
    
    // Verify quiz interface
    cy.contains('Question 1 of 3').should('be.visible')
    cy.contains('Patrick Mahomes Quiz').should('be.visible')
    
    // Answer first question (select any option)
    cy.get('button').contains('Kansas City').click()
    cy.contains('Submit Answer').click()
    
    // Wait for feedback
    cy.contains(/Correct!|Incorrect/).should('be.visible')
    
    // Continue with quiz if there are more questions
    cy.get('body').then(($body) => {
      if ($body.text().includes('Next Question')) {
        cy.contains('Next Question').click()
        
        // Answer second question
        cy.get('button').contains('quarterback').click()
        cy.contains('Submit Answer').click()
        cy.contains(/Correct!|Incorrect/).should('be.visible')
        
        if ($body.text().includes('Next Question')) {
          cy.contains('Next Question').click()
          
          // Answer third question
          cy.get('button').contains('Super Bowl').click()
          cy.contains('Submit Answer').click()
          cy.contains(/Correct!|Incorrect/).should('be.visible')
        }
      }
    })
  })

  it('should open and use the suggestion modal', () => {
    cy.visit('/')
    
    // Open suggestion modal
    cy.contains('Suggest a Sports Hero').click()
    
    // Verify modal is open
    cy.contains('What kind of sports hero would you like to learn about?').should('be.visible')
    
    // Check sport categories
    cy.contains('Soccer').should('be.visible')
    cy.contains('Basketball').should('be.visible')
    cy.contains('Baseball').should('be.visible')
    cy.contains('Football').should('be.visible')
    
    // Click on Soccer
    cy.contains('Soccer').click()
    
    // Verify soccer athletes are shown
    cy.contains('Pelé').should('be.visible')
    cy.contains('Cristiano Ronaldo').should('be.visible')
    cy.contains('Mia Hamm').should('be.visible')
    
    // Select Pelé
    cy.contains('Pelé').parent().find('button').contains('Click to Read Story').click()
    
    // Should navigate to Pelé's story
    cy.contains('Pelé').should('be.visible')
    cy.contains('Soccer Player').should('be.visible')
    cy.contains('Take the Quiz!').should('be.visible')
  })

  it('should show progress tracking', () => {
    cy.visit('/')
    
    // Navigate to progress page
    cy.contains('Progress').click()
    
    // Verify progress page
    cy.contains('Your Reading Progress').should('be.visible')
    
    // Check that athletes are listed with progress indicators
    cy.contains('Patrick Mahomes').should('be.visible')
    cy.contains('Story Not Read').should('be.visible')
    cy.contains('Quiz Not Taken').should('be.visible')
    
    // Go back to home
    cy.contains('Back to Athletes').click()
    cy.contains('Choose Your Sports Hero').should('be.visible')
  })

  it('should handle text-to-speech functionality', () => {
    cy.visit('/')
    
    // Select an athlete
    cy.contains('Patrick Mahomes').parent().find('button').contains('Read Story').click()
    
    // Check for read aloud button
    cy.contains('Read Aloud').should('be.visible')
    
    // Click read aloud (note: actual speech won't work in Cypress, but button should respond)
    cy.contains('Read Aloud').click()
    
    // Button should change to "Stop Reading"
    cy.contains('Stop Reading').should('be.visible')
    
    // Click stop
    cy.contains('Stop Reading').click()
    
    // Should return to "Read Aloud"
    cy.contains('Read Aloud').should('be.visible')
  })

  it('should handle print functionality', () => {
    cy.visit('/')
    
    // Select an athlete
    cy.contains('Patrick Mahomes').parent().find('button').contains('Read Story').click()
    
    // Check for print buttons
    cy.contains('Print').should('be.visible')
    cy.contains('Print Preview').should('be.visible')
    
    // Click print preview
    cy.contains('Print Preview').click()
    
    // Print preview modal should open
    cy.get('[role="dialog"]').should('be.visible')
    cy.contains('Print Preview').should('be.visible')
    
    // Close print preview
    cy.get('[role="dialog"]').find('button').first().click()
  })

  it('should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x')
    cy.visit('/')
    
    // Check that content is still accessible on mobile
    cy.contains('Choose Your Sports Hero').should('be.visible')
    cy.contains('Patrick Mahomes').should('be.visible')
    
    // Navigation should be mobile-friendly
    cy.get('[title="Progress"]').should('be.visible')
    cy.get('[title="Logout"]').should('be.visible')
  })
})
