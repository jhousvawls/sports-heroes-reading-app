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

### Featured Athletes (6 total)
1. **Patrick Mahomes** (Football) - 3 questions
2. **Serena Williams** (Tennis) - 3 questions  
3. **LeBron James** (Basketball) - 3 questions
4. **Simone Biles** (Gymnastics) - 3 questions
5. **Lionel Messi** (Soccer) - 3 questions
6. **Muhammad Ali** (Boxing) - 3 questions

### Suggested Athletes (20 total - 5 per sport)

#### Soccer (5 athletes)
- Pelé, Cristiano Ronaldo, Mia Hamm, Diego Maradona, Ronaldinho

#### Basketball (5 athletes)  
- Michael Jordan, LeBron James, Kobe Bryant, Magic Johnson, Stephen Curry

#### Baseball (5 athletes)
- Babe Ruth, Jackie Robinson, Derek Jeter, Lou Gehrig, Hank Aaron

#### Football (5 athletes)
- Tom Brady, Joe Montana, Jerry Rice, Jim Brown, Peyton Manning

**Total: 26 athletes with inspiring stories and educational quizzes**

## Adding New Athletes

1. Edit `src/data/athletes.ts`
2. Add new athlete object with:
   - Unique ID
   - Name, sport, emoji
   - Age-appropriate story (3rd grade level)
   - 3+ comprehension questions with explanations

## Deployment to WP Engine

### Prerequisites

- WP Engine account with Node.js hosting enabled
- WordPress site (can be on same WP Engine account or separate)
- Git repository access
- Domain configured for your Node.js environment

### Build for Production

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Test the build locally (optional)
npm start
```

### Environment Variables for Production

Create these environment variables in your WP Engine User Portal:

```env
NODE_ENV=production
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.wpengine.com
WORDPRESS_USERNAME=your_wp_username
WORDPRESS_PASSWORD=your_wp_app_password
```

### WP Engine Node.js Deployment

#### Method 1: Git Deployment (Recommended)

1. **Connect Git Repository**:
   - Log into WP Engine User Portal
   - Navigate to your Node.js environment
   - Go to "Git Push" settings
   - Connect your GitHub repository

2. **Configure Build Settings**:
   ```bash
   # Build command
   npm run build
   
   # Start command  
   npm start
   
   # Node.js version
   18.x or 20.x (latest LTS)
   ```

3. **Deploy**:
   ```bash
   git push wpengine main
   ```

#### Method 2: Manual Upload

1. **Build Locally**:
   ```bash
   npm run build
   ```

2. **Upload Files**:
   - Compress your project folder
   - Upload via WP Engine User Portal
   - Extract in your Node.js environment root

### WordPress Plugin Setup

1. **Install Plugin on WordPress Site**:
   ```bash
   # If WordPress is on WP Engine
   # Upload via WordPress Admin or SFTP
   
   # Copy plugin file to:
   /wp-content/plugins/sports-heroes-progress.php
   ```

2. **Activate Plugin**:
   - WordPress Admin → Plugins
   - Find "Sports Heroes Progress Tracker"
   - Click "Activate"

3. **Create Application Password**:
   - Users → Your Profile
   - Application Passwords section
   - Add "Sports Heroes App"
   - Copy generated password

### Domain Configuration

1. **Primary Domain**:
   - Configure your custom domain in WP Engine
   - Update DNS records to point to WP Engine
   - Enable SSL certificate

2. **CORS Configuration** (if needed):
   ```javascript
   // next.config.ts
   const nextConfig = {
     async headers() {
       return [
         {
           source: '/api/:path*',
           headers: [
             { key: 'Access-Control-Allow-Origin', value: 'https://your-wordpress-site.com' },
             { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
             { key: 'Access-Control-Allow-Headers', value: 'Content-Type,Authorization' },
           ],
         },
       ];
     },
   };
   ```

### Performance Optimization for WP Engine

1. **CDN Configuration**:
   - Enable WP Engine's Global Edge Security
   - Configure static asset caching
   - Optimize image delivery

2. **Caching Headers**:
   ```javascript
   // next.config.ts
   const nextConfig = {
     async headers() {
       return [
         {
           source: '/_next/static/:path*',
           headers: [
             { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
           ],
         },
       ];
     },
   };
   ```

### Monitoring and Debugging

1. **Application Logs**:
   - Access via WP Engine User Portal
   - Monitor Node.js application logs
   - Check for API connection errors

2. **Health Checks**:
   ```bash
   # Test WordPress API connectivity
   curl -X GET "https://your-wordpress-site.com/wp-json/wp/v2/users/me" \
        -H "Authorization: Basic $(echo -n 'username:app_password' | base64)"
   ```

3. **Performance Monitoring**:
   - Use WP Engine's performance insights
   - Monitor response times and error rates
   - Set up uptime monitoring

### Deployment Checklist

- [ ] WordPress plugin installed and activated
- [ ] Application password created
- [ ] Environment variables configured
- [ ] Domain DNS configured
- [ ] SSL certificate enabled
- [ ] API connectivity tested
- [ ] User registration/login tested
- [ ] Story reading functionality verified
- [ ] Quiz completion and progress tracking working
- [ ] Performance optimizations applied
- [ ] Monitoring and alerts configured

### Troubleshooting

**Common Issues**:

1. **API Connection Errors**:
   - Verify WordPress URL and credentials
   - Check application password permissions
   - Ensure WordPress site is accessible

2. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

3. **Performance Issues**:
   - Enable caching headers
   - Optimize images and assets
   - Use WP Engine's CDN features

**Support Resources**:
- WP Engine Node.js documentation
- WP Engine support team
- WordPress REST API documentation

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
