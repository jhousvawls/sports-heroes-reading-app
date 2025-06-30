# Google Authentication Setup Guide

This guide will help you set up Google OAuth authentication for the Sports Heroes Reading App.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- Your Sports Heroes app running locally

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "Sports Heroes App")
5. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, make sure your new project is selected
2. Go to "APIs & Services" > "Library"
3. Search for "Google+ API"
4. Click on "Google+ API" and click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace account)
3. Click "Create"
4. Fill in the required information:
   - **App name**: Sports Heroes Reading App
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
5. Click "Save and Continue"
6. On the "Scopes" page, click "Save and Continue" (no additional scopes needed)
7. On the "Test users" page, you can add test users or skip for now
8. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application" as the application type
4. Enter a name (e.g., "Sports Heroes Web Client")
5. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
6. Click "Create"
7. Copy the **Client ID** and **Client Secret** - you'll need these for your environment variables

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following environment variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key_here

# WordPress Integration (existing)
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
WORDPRESS_USERNAME=your_wp_username
WORDPRESS_PASSWORD=your_wp_app_password
```

3. Replace the placeholder values:
   - `GOOGLE_CLIENT_ID`: The Client ID from Step 4
   - `GOOGLE_CLIENT_SECRET`: The Client Secret from Step 4
   - `NEXTAUTH_SECRET`: Generate a random string (you can use: `openssl rand -base64 32`)

## Step 6: Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and go to `http://localhost:3000`

3. You should see the Google Sign-In button

4. Click "Sign in with Google" and test the authentication flow

## Step 7: Production Deployment

When deploying to production:

1. Update your Google OAuth credentials to include your production domain
2. Update the `NEXTAUTH_URL` environment variable to your production URL
3. Make sure all environment variables are set in your production environment

## Troubleshooting

### Common Issues

**Error: "redirect_uri_mismatch"**
- Make sure the redirect URI in Google Console matches exactly: `http://localhost:3000/api/auth/callback/google`
- Check that there are no trailing slashes or extra characters

**Error: "invalid_client"**
- Verify your Client ID and Client Secret are correct
- Make sure there are no extra spaces in your environment variables

**Error: "access_blocked"**
- Your OAuth consent screen might need to be verified by Google
- For development, add your test email to the test users list

**WordPress Integration Issues**
- Make sure your WordPress site is accessible and the API credentials are correct
- Check that the WordPress REST API is enabled

### Environment Variables Checklist

Make sure all these environment variables are set:

- ✅ `GOOGLE_CLIENT_ID`
- ✅ `GOOGLE_CLIENT_SECRET`
- ✅ `NEXTAUTH_URL`
- ✅ `NEXTAUTH_SECRET`
- ✅ `NEXT_PUBLIC_WORDPRESS_URL`
- ✅ `WORDPRESS_USERNAME`
- ✅ `WORDPRESS_PASSWORD`

## Security Notes

- Never commit your `.env.local` file to version control
- Use strong, unique secrets for `NEXTAUTH_SECRET`
- Regularly rotate your Google OAuth credentials
- In production, use HTTPS for all URLs

## What Changed

The app now uses Google OAuth instead of username/password authentication:

1. **Removed**: Username/password login form, registration, password reset
2. **Added**: Google Sign-In button with OAuth flow
3. **Enhanced**: User data now comes from Google (name, email, profile picture)
4. **Maintained**: All existing progress tracking functionality works the same

Users will now sign in with their Google account, and their progress will be tracked using their Google email as the unique identifier.
