# Testing Guide

Comprehensive testing documentation for the Sports Heroes Reading App.

## Overview

The Sports Heroes Reading App uses a multi-layered testing approach to ensure reliability, performance, and user experience quality:

- **Unit Tests** (Jest + React Testing Library)
- **End-to-End Tests** (Cypress)
- **Performance Testing** (Lighthouse + Bundle Analysis)
- **Accessibility Testing** (Built into E2E tests)

## Quick Start

```bash
# Run all tests
npm run test:all

# Run unit tests only
npm test

# Run E2E tests only
npm run test:e2e

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Unit Testing with Jest

### Setup

Unit tests are configured with Jest and React Testing Library. The setup includes:

- **Jest Configuration**: `jest.config.js`
- **Setup File**: `jest.setup.js` with mocks and utilities
- **Test Location**: `src/__tests__/`

### Running Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode (recommended for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test AthleteCard.test.tsx

# Run tests matching a pattern
npm test -- --testNamePattern="renders correctly"
```

### Writing Unit Tests

#### Example: Component Test

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import AthleteCard from '@/components/AthleteCard'
import { athletes } from '@/data/athletes'

describe('AthleteCard', () => {
  const mockOnSelect = jest.fn()
  const testAthlete = athletes[0]

  beforeEach(() => {
    mockOnSelect.mockClear()
  })

  it('renders athlete information correctly', () => {
    render(<AthleteCard athlete={testAthlete} onSelect={mockOnSelect} />)
    
    expect(screen.getByText(testAthlete.name)).toBeInTheDocument()
    expect(screen.getByText(testAthlete.sport)).toBeInTheDocument()
  })

  it('calls onSelect when clicked', () => {
    render(<AthleteCard athlete={testAthlete} onSelect={mockOnSelect} />)
    
    fireEvent.click(screen.getByText('Read Story'))
    
    expect(mockOnSelect).toHaveBeenCalledWith(testAthlete)
  })
})
```

#### Available Mocks

The test setup includes mocks for:

- **Next.js Router**: `useRouter`, `useSearchParams`, `usePathname`
- **localStorage**: `getItem`, `setItem`, `removeItem`, `clear`
- **speechSynthesis**: Text-to-speech functionality
- **window.print**: Print functionality
- **fetch**: API calls

### Coverage Requirements

- **Minimum Coverage**: 70% for all categories
- **Target Coverage**: 80%+ for new code
- **Coverage Reports**: Generated in `coverage/` directory

```bash
# View coverage report
npm run test:coverage
open coverage/lcov-report/index.html
```

## End-to-End Testing with Cypress

### Setup

E2E tests use Cypress with custom commands and comprehensive user flow testing.

- **Configuration**: `cypress.config.ts`
- **Tests Location**: `cypress/e2e/`
- **Support Files**: `cypress/support/`

### Running E2E Tests

```bash
# Run E2E tests headlessly
npm run test:e2e

# Open Cypress interactive mode
npm run cypress:open

# Run specific test file
npx cypress run --spec "cypress/e2e/user-flow.cy.ts"
```

### E2E Test Coverage

Current E2E tests cover:

#### Core User Flows
- ✅ Home page display and navigation
- ✅ Athlete selection and story reading
- ✅ Quiz taking with all question types
- ✅ Progress tracking and visualization
- ✅ Suggestion modal functionality

#### Features Testing
- ✅ Text-to-speech functionality
- ✅ Print and print preview
- ✅ Offline detection and handling
- ✅ Mobile responsiveness
- ✅ Error boundary functionality

#### Accessibility Testing
- ✅ Keyboard navigation
- ✅ Screen reader compatibility
- ✅ ARIA labels and roles
- ✅ Color contrast compliance

### Custom Cypress Commands

```typescript
// Login as test user
cy.loginAsTestUser()

// Select athlete and read story
cy.selectAthleteAndReadStory('Patrick Mahomes')

// Take quiz with specific answers
cy.takeQuiz(['Kansas City', 'quarterback', 'Super Bowl'])
```

### Writing E2E Tests

```typescript
describe('User Flow', () => {
  beforeEach(() => {
    cy.loginAsTestUser()
  })

  it('should complete full reading flow', () => {
    cy.visit('/')
    
    // Select athlete
    cy.contains('Patrick Mahomes').click()
    
    // Read story
    cy.contains('Take the Quiz!').should('be.visible')
    
    // Take quiz
    cy.contains('Take the Quiz!').click()
    cy.contains('Kansas City').click()
    cy.contains('Submit Answer').click()
    
    // Verify completion
    cy.contains('Quiz Complete').should('be.visible')
  })
})
```

## Performance Testing

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Analyze server bundle
npm run analyze:server

# Analyze browser bundle
npm run analyze:browser
```

### Performance Metrics

Monitor these key metrics:

- **Bundle Size**: Target <2MB total
- **First Contentful Paint**: Target <1.5s
- **Largest Contentful Paint**: Target <2.5s
- **Cumulative Layout Shift**: Target <0.1

### Lighthouse Testing

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run Lighthouse audit
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# Run performance audit only
lighthouse http://localhost:3000 --only-categories=performance
```

## Testing Best Practices

### Unit Testing

1. **Test Behavior, Not Implementation**
   ```typescript
   // Good: Test what the user sees
   expect(screen.getByText('Patrick Mahomes')).toBeInTheDocument()
   
   // Avoid: Testing implementation details
   expect(component.state.athleteName).toBe('Patrick Mahomes')
   ```

2. **Use Descriptive Test Names**
   ```typescript
   // Good
   it('displays error message when API call fails')
   
   // Avoid
   it('handles error')
   ```

3. **Arrange, Act, Assert Pattern**
   ```typescript
   it('updates score when correct answer is selected', () => {
     // Arrange
     const mockOnComplete = jest.fn()
     render(<QuizComponent questions={questions} onComplete={mockOnComplete} />)
     
     // Act
     fireEvent.click(screen.getByText('Correct Answer'))
     fireEvent.click(screen.getByText('Submit'))
     
     // Assert
     expect(screen.getByText('Score: 1/3')).toBeInTheDocument()
   })
   ```

### E2E Testing

1. **Test Critical User Paths**
   - Registration and login
   - Story reading completion
   - Quiz taking and scoring
   - Progress tracking

2. **Use Data Attributes for Stability**
   ```typescript
   // Good: Stable selector
   cy.get('[data-testid="athlete-card"]')
   
   // Avoid: Fragile selector
   cy.get('.bg-dark-card.rounded-xl')
   ```

3. **Clean Up Between Tests**
   ```typescript
   beforeEach(() => {
     cy.clearLocalStorage()
     cy.clearCookies()
   })
   ```

### Performance Testing

1. **Regular Performance Audits**
   - Run Lighthouse tests on every major change
   - Monitor bundle size growth
   - Test on slow networks (3G simulation)

2. **Performance Budgets**
   - JavaScript bundle: <500KB gzipped
   - CSS bundle: <100KB gzipped
   - Images: WebP/AVIF formats only

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm test -- --coverage --watchAll=false
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test -- --watchAll=false --passWithNoTests",
      "pre-push": "npm run test:all"
    }
  }
}
```

## Debugging Tests

### Unit Test Debugging

```bash
# Debug specific test
npm test -- --testNamePattern="specific test" --verbose

# Run tests with Node debugger
node --inspect-brk node_modules/.bin/jest --runInBand

# Use VS Code debugger
# Add breakpoint and run "Debug Jest Tests" configuration
```

### E2E Test Debugging

```bash
# Run Cypress in headed mode
npx cypress run --headed

# Open Cypress with browser dev tools
npx cypress open

# Record video of test runs
npx cypress run --record --key=your-key
```

### Common Issues

#### Unit Tests

1. **Mock Issues**
   ```typescript
   // Clear mocks between tests
   beforeEach(() => {
     jest.clearAllMocks()
   })
   ```

2. **Async Testing**
   ```typescript
   // Wait for async operations
   await waitFor(() => {
     expect(screen.getByText('Loaded')).toBeInTheDocument()
   })
   ```

#### E2E Tests

1. **Timing Issues**
   ```typescript
   // Wait for elements
   cy.contains('Loading...').should('not.exist')
   cy.contains('Content').should('be.visible')
   ```

2. **Network Issues**
   ```typescript
   // Stub network requests
   cy.intercept('GET', '/api/athletes', { fixture: 'athletes.json' })
   ```

## Test Data Management

### Fixtures

Store test data in `cypress/fixtures/`:

```json
// cypress/fixtures/athletes.json
{
  "athletes": [
    {
      "id": "test-athlete",
      "name": "Test Athlete",
      "sport": "Test Sport",
      "story": "Test story content...",
      "questions": [...]
    }
  ]
}
```

### Test Database

For integration tests, consider:

- **Test WordPress instance** with known data
- **Database seeding** scripts
- **Cleanup procedures** between test runs

## Accessibility Testing

### Automated Testing

```typescript
// Install axe-core
npm install --save-dev @axe-core/playwright

// Add to E2E tests
cy.injectAxe()
cy.checkA11y()
```

### Manual Testing

1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Ensure focus indicators are visible
   - Test escape key functionality

2. **Screen Reader Testing**
   - Test with NVDA (Windows) or VoiceOver (Mac)
   - Verify ARIA labels and descriptions
   - Check heading structure

3. **Color Contrast**
   - Use browser dev tools
   - Test with color blindness simulators
   - Ensure 4.5:1 contrast ratio minimum

## Reporting and Metrics

### Coverage Reports

- **HTML Report**: `coverage/lcov-report/index.html`
- **JSON Report**: `coverage/coverage-final.json`
- **LCOV Report**: `coverage/lcov.info`

### E2E Reports

- **Cypress Dashboard**: Online test results
- **Mochawesome Reports**: HTML test reports
- **Video Recordings**: Test execution videos

### Performance Reports

- **Lighthouse Reports**: Performance, accessibility, SEO
- **Bundle Analyzer**: JavaScript bundle composition
- **Core Web Vitals**: Real user metrics

---

For questions about testing or to report testing issues, please refer to the main project documentation or contact the development team.
