# Sports Heroes Reading App - Complete Documentation

A Next.js reading comprehension app for kids featuring athlete biographies with integrated WordPress user tracking and progress monitoring.

## Table of Contents

- [Overview](#overview)
- [How the App Works - User Perspective](#how-the-app-works---user-perspective)
- [How the App Works - Technical Perspective](#how-the-app-works---technical-perspective)
- [Architecture Deep Dive](#architecture-deep-dive)
- [Content Library](#content-library)
- [Setup & Installation](#setup--installation)
- [Development](#development)
- [Deployment](#deployment)
- [Testing](#testing)
- [Performance & Optimization](#performance--optimization)

## Overview

The Sports Heroes Reading App is an educational platform designed to improve reading comprehension for elementary school students (3rd grade level) through engaging athlete biographies. The app combines storytelling, interactive quizzes, and progress tracking to create an immersive learning experience.

### Key Features

- 🏆 **User Authentication**: WordPress-integrated login/registration with Google OAuth
- 📚 **Interactive Stories**: 26 age-appropriate athlete biographies with rich content
- 🧠 **Comprehension Quizzes**: Multiple-choice questions with detailed explanations
- 📊 **Progress Tracking**: Comprehensive reading and quiz progress stored in WordPress
- 🔊 **Text-to-Speech**: Read-aloud functionality for accessibility
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🖨️ **Print/Export**: Story printing and PDF generation capabilities
- ⚡ **Performance**: Built with Next.js 15 and optimized for WP Engine hosting

### Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: WordPress REST API with custom plugin
- **Authentication**: NextAuth.js with Google OAuth
- **Icons**: FontAwesome and Lucide React
- **Testing**: Jest, React Testing Library, Cypress
- **Hosting**: Optimized for WP Engine headless Node.js environments

---

## How the App Works - User Perspective

### 1. Authentication & Onboarding

**User Journey:**
1. **Landing Page**: Users see the Sports Heroes branding and Google Sign-In option
2. **Google Authentication**: One-click sign-in with Google account
3. **Account Creation**: App automatically creates WordPress user profile
4. **Welcome Screen**: Users land on the athlete selection homepage

**User Experience Features:**
- Seamless Google OAuth integration
- No complex registration forms
- Automatic profile creation and management
- Persistent login sessions

### 2. Athlete Selection & Discovery

**Main Interface:**
- **Featured Athletes Grid**: 6 primary athletes with rich story content
- **Suggestion System**: 20 additional athletes across 4 sports categories
- **Progress Indicators**: Visual badges showing completion status
- **Sport Categories**: Soccer ⚽, Basketball 🏀, Baseball ⚾, Football 🏈

**Selection Process:**
1. Users browse athlete cards with photos, names, and sports
2. Progress indicators show story read/quiz completion status
3. Click on any athlete card to begin reading experience
4. "Suggest a Sports Hero" button opens modal with additional options

### 3. Reading Experience

**Story Interface:**
- **Clean Reading Layout**: Optimized typography for young readers
- **Audio Narration**: Text-to-speech with natural voice synthesis
- **Reading Timer**: Automatic tracking of time spent reading
- **Print Options**: Full story printing and print preview
- **Navigation**: Easy back-to-home and progress tracking

**Reading Features:**
- Stories written at 3rd grade reading level
- Inspiring content focusing on perseverance and character
- 500-800 word stories with clear paragraph structure
- Emoji-based athlete representations for visual appeal

### 4. Interactive Quiz System

**Quiz Experience:**
1. **Question Presentation**: One question at a time with progress indicator
2. **Multiple Choice**: 4 answer options per question
3. **Immediate Feedback**: Instant correct/incorrect indication
4. **Explanations**: Detailed explanations for every answer
5. **Scoring**: Real-time score tracking throughout quiz
6. **Completion**: Celebration screen with final score and achievements

**Quiz Mechanics:**
- 3 questions per featured athlete
- Questions test reading comprehension and key story details
- Explanations reinforce learning and provide additional context
- Perfect scores unlock "Story Completed" achievement
- Retry functionality encourages improvement

### 5. Progress Tracking & Achievements

**Progress Dashboard:**
- **Individual Athlete Progress**: Story read status, quiz scores, reading time
- **Overall Statistics**: Total stories read, average quiz scores
- **Achievement System**: Visual indicators for completed stories
- **Time Tracking**: Reading duration for each story

**Progress Features:**
- Persistent progress across devices and sessions
- Visual progress indicators (green = completed, orange = in progress)
- Detailed quiz score breakdowns (e.g., "3/3 correct")
- Reading time tracking in minutes
- Achievement badges for perfect quiz scores

---

## How the App Works - Technical Perspective

### 1. Frontend Architecture (Next.js 15)

**App Router Structure:**
```
src/app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main application component
├── globals.css        # Global styles and Tailwind
└── api/
    └── auth/
        └── [...nextauth]/ # NextAuth.js configuration
```

**Component Architecture:**
```
src/components/
├── AthleteCard.tsx           # Individual athlete display
├── QuizComponent.tsx         # Interactive quiz system
├── GoogleSignIn.tsx          # Authentication component
├── LoginForm.tsx             # Alternative login form
├── ProgressBadge.tsx         # Progress indicators
├── PrintPreview.tsx          # Print functionality
├── SuggestionModal.tsx       # Additional athletes modal
├── ErrorBoundary.tsx         # Error handling
└── SessionProvider.tsx       # Authentication context
```

**State Management:**
- **React Hooks**: useState, useEffect for local state
- **Custom Hooks**: useProgress for WordPress API integration
- **NextAuth Session**: Global authentication state
- **Local Storage**: Temporary data persistence

### 2. WordPress Backend Integration

**Custom WordPress Plugin** (`wordpress-plugin/sports-heroes-progress.php`):

**Custom Post Type**: `sports-progress`
```php
// Registers custom post type for progress tracking
register_post_type('sports-progress', [
    'public' => false,
    'show_ui' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'custom-fields']
]);
```

**REST API Endpoints:**
- `GET /wp-json/sports-heroes/v1/progress/{user_id}` - Retrieve user progress
- `POST /wp-json/sports-heroes/v1/progress` - Save new progress entry
- `PUT /wp-json/sports-heroes/v1/progress/{user_id}/{athlete_id}` - Update existing progress

**Progress Data Structure:**
```typescript
interface ProgressRecord {
  user_id: number;
  athlete_id: number;
  athlete_name: string;
  story_read: boolean;
  quiz_completed: boolean;
  quiz_score: number;
  total_questions: number;
  completion_date: string;
  time_spent_reading?: number;
}
```

### 3. Authentication System

**NextAuth.js Configuration:**
```typescript
// Google OAuth provider with WordPress user sync
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })
]

// Custom callbacks for WordPress integration
callbacks: {
  async signIn({ user, account, profile }) {
    // Create or retrieve WordPress user
    const wpUser = await wordpressAPI.getUserByEmail(user.email);
    if (!wpUser) {
      await wordpressAPI.createUserFromGoogle(userData);
    }
    return true;
  }
}
```

**WordPress User Management:**
```typescript
class WordPressAPI {
  async createUserFromGoogle(googleData: GoogleUserData): Promise<WordPressUser> {
    // Creates WordPress user with Google profile data
    // Stores Google ID and profile picture in user meta
    // Assigns subscriber role for app access
  }
  
  async getUserByEmail(email: string): Promise<WordPressUser | null> {
    // Retrieves existing WordPress user by email
    // Returns user data including WordPress ID for progress tracking
  }
}
```

### 4. Data Flow Architecture

**Reading Progress Flow:**
1. **Story Reading**: Timer starts when user enters story view
2. **Time Tracking**: JavaScript tracks reading duration
3. **Progress Save**: When user clicks "Take Quiz", story progress saved to WordPress
4. **API Call**: `useProgress` hook calls WordPress REST API
5. **Database Storage**: Progress stored as custom post with metadata

**Quiz Completion Flow:**
1. **Quiz Interaction**: User answers questions in QuizComponent
2. **Score Calculation**: Real-time scoring with immediate feedback
3. **Completion Trigger**: Final score calculated on quiz completion
4. **Progress Update**: Quiz results saved to WordPress via API
5. **UI Update**: Progress indicators updated across the app

**Data Persistence:**
```typescript
// useProgress hook manages all WordPress API interactions
const { saveStoryRead, saveQuizScore, getAthleteProgress } = useProgress(wpUserId);

// Story completion
await saveStoryRead(athleteId, athleteName, timeSpent);

// Quiz completion
await saveQuizScore(athleteId, athleteName, score, totalQuestions);
```

### 5. Content Management System

**Athlete Data Structure:**
```typescript
interface Athlete {
  id: number;
  name: string;
  sport: string;
  image: string;        // Emoji representation
  story: string;        // 3rd grade level biography
  questions: Question[]; // Comprehension quiz questions
}

interface Question {
  id: number;
  question: string;
  options: string[];    // 4 multiple choice options
  correct: string;      // Correct answer
  explanation: string;  // Educational explanation
}
```

**Content Categories:**
- **Featured Athletes** (IDs 1-6): Full stories with 3 questions each
- **Suggested Athletes** (IDs 101-120): Extended library across 4 sports
- **Sport Categories**: Soccer (5), Basketball (5), Baseball (5), Football (5)

### 6. Performance & Optimization

**Next.js Optimizations:**
- **App Router**: Latest Next.js routing for optimal performance
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Automatic image optimization and lazy loading
- **Bundle Splitting**: Automatic code splitting for faster loads

**WordPress API Optimization:**
- **Caching**: WordPress object caching for API responses
- **Pagination**: Efficient data retrieval for large datasets
- **Authentication**: Basic auth with application passwords

**Frontend Performance:**
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Debouncing**: API calls optimized to prevent excessive requests

---

## Architecture Deep Dive

### Component Interaction Flow

```
App (page.tsx)
├── SessionProvider (Authentication Context)
├── GoogleSignIn (if not authenticated)
└── Main App Views:
    ├── Home View
    │   ├── AthleteCard[] (Featured Athletes)
    │   └── SuggestionModal (Additional Athletes)
    ├── Story View
    │   ├── Story Content
    │   ├── Text-to-Speech Controls
    │   └── PrintPreview Modal
    ├── Quiz View
    │   └── QuizComponent (Interactive Questions)
    └── Progress View
        └── ProgressBadge[] (Achievement Tracking)
```

### Data Flow Diagram

```
User Action → React Component → Custom Hook → WordPress API → Database
     ↓              ↓              ↓              ↓            ↓
Story Read → page.tsx → useProgress → REST API → Custom Post
Quiz Complete → QuizComponent → saveQuizScore → sports-heroes/v1 → Meta Fields
Progress View → ProgressBadge → getAthleteProgress → WP Query → Display
```

### WordPress Plugin Architecture

**Plugin Structure:**
```php
class SportsHeroesProgress {
    public function __construct() {
        add_action('init', [$this, 'create_post_type']);
        add_action('rest_api_init', [$this, 'register_api_routes']);
        add_action('add_meta_boxes', [$this, 'add_meta_boxes']);
    }
    
    // Custom post type registration
    public function create_post_type() { /* ... */ }
    
    // REST API endpoint registration
    public function register_api_routes() { /* ... */ }
    
    // Admin interface for progress management
    public function add_meta_boxes() { /* ... */ }
}
```

**Database Schema:**
```sql
-- WordPress Posts Table (wp_posts)
ID, post_title, post_content, post_type='sports-progress'

-- WordPress Meta Table (wp_postmeta)
post_id, meta_key='user_id', meta_value='123'
post_id, meta_key='athlete_id', meta_value='1'
post_id, meta_key='story_read', meta_value='1'
post_id, meta_key='quiz_completed', meta_value='1'
post_id, meta_key='quiz_score', meta_value='3'
post_id, meta_key='total_questions', meta_value='3'
```

---

## Content Library

### Featured Athletes (6 Total)

| Athlete | Sport | Questions | Key Themes |
|---------|-------|-----------|------------|
| **Patrick Mahomes** | Football | 3 | Leadership, perseverance, community service |
| **Serena Williams** | Tennis | 3 | Determination, breaking barriers, motherhood |
| **LeBron James** | Basketball | 3 | Education, giving back, overcoming adversity |
| **Simone Biles** | Gymnastics | 3 | Mental health, courage, excellence |
| **Lionel Messi** | Soccer | 3 | Overcoming physical challenges, hard work |
| **Muhammad Ali** | Boxing | 3 | Standing up for beliefs, courage, conviction |

### Suggested Athletes (20 Total)

**Soccer (5 Athletes):**
- Pelé - Brazilian legend, joy in the game
- Cristiano Ronaldo - Work ethic and dedication
- Mia Hamm - Women's soccer pioneer
- Diego Maradona - Overcoming poverty
- Ronaldinho - Creativity and passion

**Basketball (5 Athletes):**
- Michael Jordan - Learning from failure
- LeBron James - Community leadership
- Kobe Bryant - Mamba mentality
- Magic Johnson - Teamwork and leadership
- Stephen Curry - Overcoming size limitations

**Baseball (5 Athletes):**
- Babe Ruth - Changing the game
- Jackie Robinson - Breaking barriers
- Derek Jeter - Leadership and clutch performance
- Lou Gehrig - Courage in adversity
- Hank Aaron - Perseverance through racism

**Football (5 Athletes):**
- Tom Brady - Overcoming low expectations
- Joe Montana - Staying calm under pressure
- Jerry Rice - Hard work and preparation
- Jim Brown - Athletic excellence and activism
- Peyton Manning - Intelligence and preparation

### Story Writing Guidelines

**Reading Level**: 3rd Grade (Flesch-Kincaid 3.0-4.0)
**Length**: 500-800 words per story
**Structure**: 6-8 paragraphs with clear topic sentences
**Themes**: Perseverance, character, overcoming challenges, giving back
**Language**: Simple sentences, age-appropriate vocabulary, inspiring tone

**Quiz Question Standards:**
- 3 questions per featured athlete
- Multiple choice with 4 options
- Focus on reading comprehension and key story details
- Educational explanations for all answers
- Mix of factual recall and inference questions

---

## Setup & Installation

### Prerequisites

- **Node.js**: Version 18.x or 20.x (LTS)
- **WordPress Site**: With admin access for plugin installation
- **Google OAuth**: Client ID and Secret for authentication
- **WP Engine Account**: (Optional) For production hosting

### Local Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/jhousvawls/sports-heroes-reading-app.git
   cd sports-heroes-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure environment variables:
   ```env
   # WordPress Configuration
   NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
   WORDPRESS_USERNAME=your_wp_username
   WORDPRESS_PASSWORD=your_wp_app_password
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **WordPress Plugin Installation**
   ```bash
   # Copy plugin to WordPress installation
   cp wordpress-plugin/sports-heroes-progress.php /path/to/wordpress/wp-content/plugins/
   ```
   
   Activate plugin in WordPress Admin:
   - Navigate to Plugins → Installed Plugins
   - Find "Sports Heroes Progress Tracker"
   - Click "Activate"

5. **WordPress Application Password**
   - Go to Users → Your Profile in WordPress Admin
   - Scroll to "Application Passwords" section
   - Create new password for "Sports Heroes App"
   - Use this password in WORDPRESS_PASSWORD environment variable

6. **Google OAuth Setup**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

7. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Visit [http://localhost:3000](http://localhost:3000)

### Verification Steps

1. **Authentication Test**: Sign in with Google account
2. **WordPress Connection**: Check that user is created in WordPress
3. **Story Reading**: Select athlete and read story
4. **Quiz Functionality**: Complete quiz and verify score saving
5. **Progress Tracking**: Check progress dashboard for saved data

---

## Development

### Project Structure

```
sports-heroes-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Main application component
│   │   ├── globals.css        # Global styles
│   │   └── api/auth/          # NextAuth configuration
│   ├── components/            # React components
│   │   ├── AthleteCard.tsx    # Athlete display cards
│   │   ├── QuizComponent.tsx  # Interactive quiz system
│   │   ├── GoogleSignIn.tsx   # Authentication component
│   │   ├── ProgressBadge.tsx  # Progress indicators
│   │   └── ...               # Additional components
│   ├── data/                  # Static data files
│   │   ├── athletes.ts        # Featured athlete data
│   │   └── suggestedAthletes.ts # Extended athlete library
│   ├── hooks/                 # Custom React hooks
│   │   └── useProgress.ts     # WordPress API integration
│   ├── lib/                   # Utility libraries
│   │   ├── wordpress.ts       # WordPress API client
│   │   └── fontawesome.ts     # Icon configuration
│   └── types/                 # TypeScript type definitions
├── wordpress-plugin/          # WordPress plugin
│   └── sports-heroes-progress.php
├── cypress/                   # E2E tests
├── public/                    # Static assets
└── docs/                      # Additional documentation
```

### Key Development Files

**Main Application** (`src/app/page.tsx`):
- Central component managing all app views
- Handles view state (home, story, quiz, progress)
- Manages athlete selection and navigation
- Integrates authentication and progress tracking

**WordPress API Client** (`src/lib/wordpress.ts`):
- Handles all WordPress REST API interactions
- User management and authentication
- Progress data persistence
- Error handling and retry logic

**Progress Hook** (`src/hooks/useProgress.ts`):
- Custom React hook for progress management
- Abstracts WordPress API complexity
- Provides clean interface for components
- Handles loading states and error management

**Quiz Component** (`src/components/QuizComponent.tsx`):
- Interactive quiz with immediate feedback
- Progress tracking and scoring
- Achievement system with celebrations
- Retry functionality and explanations

### Development Workflow

1. **Feature Development**
   ```bash
   # Create feature branch
   git checkout -b feature/new-feature
   
   # Make changes and test
   npm run dev
   npm test
   
   # Run E2E tests
   npm run test:e2e
   ```

2. **Code Quality**
   ```bash
   # Linting
   npm run lint
   
   # Type checking
   npx tsc --noEmit
   
   # Test coverage
   npm run test:coverage
   ```

3. **Performance Testing**
   ```bash
   # Bundle analysis
   npm run analyze
   
   # Build optimization
   npm run build
   npm start
   ```

### Adding New Athletes

1. **Update Data File** (`src/data/athletes.ts` or `src/data/suggestedAthletes.ts`):
   ```typescript
   {
     id: 7, // Next available ID
     name: "New Athlete",
     sport: "Sport Name",
     image: "🏆", // Relevant emoji
     story: `Age-appropriate biography...`,
     questions: [
       {
         id: 1,
         question: "Comprehension question?",
         options: ["Option A", "Option B", "Option C", "Option D"],
         correct: "Option A",
         explanation: "Educational explanation..."
       }
       // Add 2 more questions for featured athletes
     ]
   }
   ```

2. **Content Guidelines**:
   - **Reading Level**: 3rd grade (Flesch-Kincaid 3.0-4.0)
   - **Story Length**: 500-800 words
   - **Themes**: Perseverance, character, overcoming challenges
   - **Questions**: Focus on comprehension and key details

3. **Testing New Content**:
   ```bash
   # Test story display
   npm run dev
   
   # Test quiz functionality
   npm test QuizComponent.test.tsx
   
   # Verify progress tracking
   npm run test:e2e
   ```

---

## Deployment

### WP Engine Deployment

**Prerequisites:**
- WP Engine account with Node.js hosting enabled
- WordPress site (can be on same account or separate)
- Git repository access
- Domain configured for Node.js environment

**Environment Setup:**
1. **WP Engine User Portal Configuration**:
   ```env
   NODE_ENV=production
   NEXT_PUBLIC_WORDPRESS_URL=https://your-site.wpengine.com
   WORDPRESS_USERNAME=your_wp_username
   WORDPRESS_PASSWORD=your_wp_app_password
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=your_production_secret
   ```

2. **Git Deployment Setup**:
   ```bash
   # Connect repository in WP Engine portal
   # Configure build settings:
   # Build Command: npm run build
   # Start Command: npm start
   # Node Version: 18.x or 20.x
   ```

3. **Deploy Application**:
   ```bash
   git push wpengine main
   ```

**WordPress Plugin Deployment:**
1. **Upload Plugin**:
   - Via WordPress Admin: Plugins → Add New → Upload Plugin
   - Via SFTP: Copy to `/wp-content/plugins/`

2. **Activate Plugin**:
   - WordPress Admin → Plugins → Sports Heroes Progress Tracker → Activate

3. **Create Application Password**:
   - Users → Your Profile → Application Passwords
   - Add "Sports Heroes App" → Copy generated password

**Domain & SSL Configuration:**
1. **Custom Domain**: Configure in WP Engine portal
2. **DNS Records**: Point to WP Engine servers
3. **SSL Certificate**: Enable in WP Engine (automatic)

### Performance Optimization

**Next.js Configuration** (`next.config.ts`):
```typescript
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Cache headers
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

**WordPress Optimization:**
- **Object Caching**: Enable Redis/Memcached
- **CDN**: Use WP Engine's Global Edge Security
- **Database**: Optimize queries and indexes

**Monitoring & Alerts:**
- **Application Logs**: Monitor via WP Engine portal
- **Performance**: Use Lighthouse CI
- **Uptime**: Configure monitoring alerts
- **Error Tracking**: Implement error reporting

---

## Testing

### Testing Strategy

**Multi-Layer Testing Approach:**
- **Unit Tests**: Component logic and utilities (Jest + React Testing Library)
- **Integration Tests**: API interactions and data flow
- **End-to-End Tests**: Complete user workflows (Cypress)
- **Performance Tests**: Bundle size and load times (Lighthouse)

### Running Tests

```bash
# All tests
npm run test:all

# Unit tests only
npm test

# Unit tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# Watch mode for development
npm run test:watch
```

### Test Coverage

**Current Coverage Targets:**
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

**Key Test Files:**
- `src/__tests__/AthleteCard.test.tsx` - Component rendering and interactions
- `src/__tests__/QuizComponent.test.tsx` - Quiz logic and scoring
- `cypress/e2e/user-flow.cy.ts` - Complete user journeys

### Writing Tests

**Unit Test Example:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import QuizComponent from '@/components/QuizComponent';

describe('QuizComponent', () => {
  const mockQuestions = [/* test data */];
  const mockOnComplete = jest.fn();

  it('displays question and options correctly', () => {
    render(<QuizComponent questions={mockQuestions} onComplete={mockOnComplete} />);
    
    expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
    mockQuestions[0].options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('handles answer selection and submission', () => {
    render(<QuizComponent questions={mockQuestions} onComplete={mockOnComplete} />);
    
    fireEvent.click(screen.getByText('Correct Answer'));
    fireEvent.click(screen.getByText('Submit Answer'));
    
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });
});
```

**E2E Test Example:**
```typescript
describe('Complete User Flow', () => {
  it('should complete reading and quiz flow', () => {
    cy.visit('/');
    
    // Authentication
    cy.get('[data-testid="google-signin"]').click();
    
    // Select athlete
    cy.contains('Patrick Mahomes').click();
    
    // Read story
    cy.contains('Take the Quiz!').should('be.visible');
    cy.contains('Take the Quiz!').click();
    
    // Complete quiz
    cy.contains('Kansas City').click();
    cy.contains('Submit Answer').click();
    cy.contains('Next Question').click();
    
    // Verify completion
    cy.contains('Quiz Complete').should('be.visible');
  });
});
```

---

## Performance & Optimization

### Performance Metrics

**Target Metrics:**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.0s
- **Bundle Size**: < 2MB total

### Bundle Analysis

```bash
# Analyze bundle composition
npm run analyze

# Server-side bundle
npm run analyze:server

# Client-side bundle
npm run analyze:browser
```

### Optimization Strategies

**Code Splitting:**
- Automatic route-based splitting via Next.js
- Dynamic imports for large components
- Lazy loading for non-critical features

**Image Optimization:**
- Next.js automatic image optimization
- WebP/AVIF format conversion
- Responsive image sizing

**Caching Strategy:**
- Static assets: 1 year cache
- API responses: 5 minute cache
- WordPress data: Object caching

**Performance Monitoring:**
```bash
# Lighthouse audit
lighthouse http://localhost:3000 --output html

# Core Web Vitals
npm run build
npm start
# Monitor with browser dev tools
```

---

## API Reference

### WordPress REST API Endpoints

**Base URL**: `{WORDPRESS_URL}/wp-json/sports-heroes/v1/`

#### Get User Progress
```http
GET /progress/{user_id}
```

**Response:**
```json
[
  {
    "user_id": 123,
    "athlete_id": 1,
    "athlete_name": "Patrick Mahomes",
    "story_read": true,
    "quiz_completed": true,
    "quiz_score": 3,
    "total_questions": 3,
    "completion_date": "2024-01-15T10:30:00Z",
    "time_spent_reading": 180
  }
]
```

#### Save Progress
```http
POST /progress
Content-Type: application/json

{
  "user_id": 123,
  "athlete_id": 1,
  "athlete_name": "Patrick Mahomes",
  "story_read": true,
  "quiz_completed": false,
  "quiz_score": 0,
  "total_questions": 3,
  "completion_date": "2024-01-15T10:30:00Z",
  "time_spent_reading": 180
}
```

#### Update Progress
```http
PUT /progress/{user_id}/{athlete_id}
Content-Type: application/json

{
  "quiz_completed": true,
  "quiz_score": 3,
  "completion_date": "2024-01-15T10:35:00Z"
}
```

### Authentication API

**NextAuth.js Endpoints:**
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signin` - Initiate sign-in
- `POST /api/auth/signout` - Sign out user
- `GET /api/auth/callback/google` - Google OAuth callback

---

## Troubleshooting

### Common Issues

**Authentication Problems:**
```bash
# Check Google OAuth configuration
echo $GOOGLE_CLIENT_ID
echo $GOOGLE_CLIENT_SECRET

# Verify NextAuth URL
echo $NEXTAUTH_URL

# Test WordPress connection
curl -X GET "${WORDPRESS_URL}/wp-json/wp/v2/users/me" \
     -H "Authorization: Basic $(echo -n 'username:password' | base64)"
```

**WordPress API Issues:**
```bash
# Test plugin activation
curl -X GET "${WORDPRESS_URL}/wp-json/sports-heroes/v1/progress/1"

# Check application password
# WordPress Admin → Users → Profile → Application Passwords

# Verify plugin installation
# WordPress Admin → Plugins → Sports Heroes Progress Tracker
```

**Build/Deployment Issues:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check environment variables
npm run build
```

### Debug Mode

**Enable Debug Logging:**
```env
# .env.local
DEBUG=true
NODE_ENV=development
```

**WordPress Debug:**
```php
// wp-config.php
define('WP_DEBUG', true);
define('WP_
