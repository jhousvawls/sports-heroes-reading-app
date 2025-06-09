/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to login as test user
Cypress.Commands.add('loginAsTestUser', () => {
  cy.visit('/')
  
  // Check if already logged in
  cy.get('body').then(($body) => {
    if ($body.text().includes('Test User')) {
      // Already logged in
      return
    }
    
    // Need to login - app should auto-create test user
    cy.contains('Sports Heroes Reading App').should('be.visible')
  })
})

// Custom command to select an athlete and read story
Cypress.Commands.add('selectAthleteAndReadStory', (athleteName: string) => {
  cy.contains(athleteName).should('be.visible')
  cy.contains(athleteName).parent().find('button').contains('Read Story').click()
  cy.url().should('include', '/story')
})

// Custom command to take a quiz
Cypress.Commands.add('takeQuiz', (answers: string[]) => {
  cy.contains('Take the Quiz!').click()
  
  answers.forEach((answer, index) => {
    // Select the answer
    cy.contains(answer).click()
    
    // Submit the answer
    cy.contains('Submit Answer').click()
    
    // Wait for feedback
    cy.contains(/Correct!|Incorrect/).should('be.visible')
    
    // If not the last question, click next
    if (index < answers.length - 1) {
      cy.contains('Next Question').click()
    }
  })
})

// Declare the custom commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      loginAsTestUser(): Chainable<void>
      selectAthleteAndReadStory(athleteName: string): Chainable<void>
      takeQuiz(answers: string[]): Chainable<void>
    }
  }
}

export {}
