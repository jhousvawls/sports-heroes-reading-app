# Sports Heroes Reading App

A Next.js reading comprehension app for kids featuring athlete biographies with integrated WordPress user tracking and progress monitoring.

## Features

- 🏆 **User Authentication**: WordPress-integrated login/registration system
- 📚 **Interactive Stories**: Age-appropriate athlete biographies (3rd grade level)
- 🧠 **Comprehension Quizzes**: Multiple-choice questions with explanations
- 📊 **Progress Tracking**: Detailed reading and quiz progress stored in WordPress
- 🔊 **Text-to-Speech**: Read-aloud functionality for accessibility
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Built with Next.js and optimized for WP Engine

## Technology Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: WordPress REST API, Custom Post Types
- **Icons**: Lucide React
- **Hosting**: Optimized for WP Engine headless Node.js environments

## Quick Start

### 1. WordPress Setup

1. Install the WordPress plugin:
   ```bash
   # Copy the plugin to your WordPress installation
   cp wordpress-plugin/sports-heroes-progress.php /path/to/wordpress/wp-content/plugins/
   ```

2. Activate the plugin in WordPress Admin:
   - Go to Plugins → Installed Plugins
   - Find "Sports Heroes Progress Tracker"
   - Click "Activate"

3. Create an Application Password for API access:
   - Go to Users → Your Profile
   - Scroll to "Application Passwords"
   - Create a new password for "Sports Heroes App"

### 2. Environment Configuration

1. Update `.env.local` with your WordPress details:
   ```env
   NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
   WORDPRESS_USERNAME=your_wp_username
   WORDPRESS_PASSWORD=your_wp_app_password
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## User Flow

1. **Registration/Login**: Users create accounts or sign in
2. **Athlete Selection**: Choose from available sports heroes
3. **Story Reading**: Read athlete biographies with optional audio narration
4. **Quiz Taking**: Answer comprehension questions with immediate feedback
5. **Progress Tracking**: View reading history and quiz scores

## WordPress Integration

### Custom Post Type: `sports-progress`

The app creates progress entries with these fields:
- `user_id`: WordPress user ID
- `athlete_id`: Athlete identifier
- `athlete_name`: Name of the athlete
- `story_read`: Boolean - whether story was read
- `quiz_completed`: Boolean - whether quiz was completed
- `quiz_score`: Number of correct answers
- `total_questions`: Total quiz questions
- `completion_date`: When activity was completed
- `time_spent_reading`: Reading time in seconds

### API Endpoints

- `GET /wp-json/sports-heroes/v1/progress/{user_id}` - Get user progress
- `POST /wp-json/sports-heroes/v1/progress` - Save new progress
- `PUT /wp-json/sports-heroes/v1/progress/{user_id}/{athlete_id}` - Update progress

## Current Athletes

1. **Patrick Mahomes** (Football) - 3 questions
2. **Serena Williams** (Tennis) - 3 questions  
3. **LeBron James** (Basketball) - 3 questions

## Adding New Athletes

1. Edit `src/data/athletes.ts`
2. Add new athlete object with:
   - Unique ID
   - Name, sport, emoji
   - Age-appropriate story (3rd grade level)
   - 3+ comprehension questions with explanations

## Deployment to WP Engine

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

```env
NODE_ENV=production
NEXT_PUBLIC_WORDPRESS_URL=https://your-production-site.com
WORDPRESS_USERNAME=your_production_username
WORDPRESS_PASSWORD=your_production_app_password
```

### WP Engine Deployment

1. Upload built files to your WP Engine Node.js environment
2. Configure environment variables in WP Engine dashboard
3. Ensure WordPress plugin is installed and activated
4. Test API connectivity

## Development

### Project Structure

```
sports-heroes-app/
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # React components
│   │   ├── AthleteCard.tsx
│   │   ├── QuizComponent.tsx
│   │   └── LoginForm.tsx
│   ├── data/               # Static data
│   │   └── athletes.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useProgress.ts
│   └── lib/                # Utilities
│       └── wordpress.ts
├── wordpress-plugin/       # WordPress plugin
└── public/                # Static assets
```

### Key Components

- **LoginForm**: User authentication interface
- **AthleteCard**: Displays athlete information and progress indicators
- **QuizComponent**: Interactive quiz with scoring and explanations
- **useProgress**: Hook for managing reading/quiz progress
- **wordpress.ts**: API integration layer

## Features for Parents/Teachers

### Progress Dashboard

- View all athletes and completion status
- See quiz scores and reading times
- Track learning progress over time

### WordPress Admin

- View all user progress in WordPress admin
- Export progress data
- Monitor app usage and engagement

## Future Enhancements

- [ ] Claude API integration for dynamic content generation
- [ ] Difficulty level adaptation
- [ ] More athlete stories
- [ ] Parent/teacher dashboard
- [ ] Reading streaks and achievements
- [ ] Audio story narration improvements
- [ ] Offline reading capability

## Support

For technical support or questions about setup, please refer to:
- WordPress plugin documentation
- WP Engine headless hosting guides
- Next.js deployment documentation

## License

This project is designed for educational use in the Sports Heroes Reading App.
