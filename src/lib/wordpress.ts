// WordPress API integration for user progress tracking

export interface WordPressUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  google_id?: string;
  picture?: string;
}

export interface GoogleUserData {
  email: string;
  name: string;
  googleId: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface ProgressRecord {
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

class WordPressAPI {
  private baseUrl: string;
  private username: string;
  private password: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
    this.username = process.env.WORDPRESS_USERNAME || '';
    this.password = process.env.WORDPRESS_PASSWORD || '';
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}/index.php?rest_route=/wp/v2/${endpoint}`;
    const auth = btoa(`${this.username}:${this.password}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Create or get user
  async createUser(userData: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Promise<WordPressUser> {
    try {
      const user = await this.makeRequest('users', {
        method: 'POST',
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          first_name: userData.first_name,
          last_name: userData.last_name,
          roles: ['subscriber']
        }),
      });
      return user;
    } catch (error) {
      // If user already exists, try to get them
      const users = await this.makeRequest(`users?search=${userData.username}`);
      if (users.length > 0) {
        return users[0];
      }
      throw error;
    }
  }

  // Get user by username
  async getUser(username: string): Promise<WordPressUser | null> {
    try {
      // First try to get all users and find by slug/username
      const users = await this.makeRequest('users');
      const user = users.find((u: { slug: string; name: string; id: number; email?: string; first_name?: string; last_name?: string }) => u.slug === username || u.name === username);
      
      if (user) {
        return {
          id: user.id,
          username: user.slug,
          email: user.email || '',
          first_name: user.first_name || '',
          last_name: user.last_name || ''
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Get user by email
  async getUserByEmail(email: string): Promise<WordPressUser | null> {
    try {
      const users = await this.makeRequest('users');
      const user = users.find((u: { email: string; id: number; slug: string; first_name?: string; last_name?: string; meta?: Record<string, unknown> }) => u.email === email);
      
      if (user) {
        return {
          id: user.id,
          username: user.slug,
          email: user.email,
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          google_id: user.meta?.google_id || '',
          picture: user.meta?.picture || ''
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  }

  // Create user from Google profile
  async createUserFromGoogle(googleData: GoogleUserData): Promise<WordPressUser> {
    try {
      // Generate username from email (before @ symbol)
      const username = googleData.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      
      const user = await this.makeRequest('users', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          email: googleData.email,
          password: this.generateTempPassword(), // Generate a random password
          first_name: googleData.firstName,
          last_name: googleData.lastName,
          roles: ['subscriber'],
          meta: {
            google_id: googleData.googleId,
            picture: googleData.picture
          }
        }),
      });

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        google_id: googleData.googleId,
        picture: googleData.picture
      };
    } catch (error) {
      console.error('Error creating user from Google:', error);
      throw error;
    }
  }

  // Save progress using custom post type
  async saveProgress(progressData: ProgressRecord): Promise<void> {
    try {
      await this.makeRequest('sports-progress', {
        method: 'POST',
        body: JSON.stringify({
          title: `${progressData.athlete_name} - User ${progressData.user_id}`,
          content: JSON.stringify(progressData),
          status: 'publish',
          meta: {
            user_id: progressData.user_id,
            athlete_id: progressData.athlete_id,
            athlete_name: progressData.athlete_name,
            story_read: progressData.story_read,
            quiz_completed: progressData.quiz_completed,
            quiz_score: progressData.quiz_score,
            total_questions: progressData.total_questions,
            completion_date: progressData.completion_date,
            time_spent_reading: progressData.time_spent_reading || 0
          }
        }),
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  }

  // Get user progress
  async getUserProgress(userId: number): Promise<ProgressRecord[]> {
    try {
      const posts = await this.makeRequest(`sports-progress?meta_key=user_id&meta_value=${userId}`);
      return posts.map((post: Record<string, unknown>) => JSON.parse((post.content as { rendered: string }).rendered));
    } catch (error) {
      console.error('Error fetching progress:', error);
      return [];
    }
  }

  // Get specific athlete progress for user
  async getAthleteProgress(userId: number, athleteId: number): Promise<ProgressRecord | null> {
    try {
      const posts = await this.makeRequest(`sports-progress?meta_key=user_id&meta_value=${userId}`);
      const athletePost = posts.find((post: Record<string, unknown>) => {
        const content = JSON.parse((post.content as { rendered: string }).rendered);
        return content.athlete_id === athleteId;
      });
      
      return athletePost ? JSON.parse((athletePost.content as { rendered: string }).rendered) : null;
    } catch (error) {
      console.error('Error fetching athlete progress:', error);
      return null;
    }
  }

  // Update existing progress
  async updateProgress(userId: number, athleteId: number, updates: Partial<ProgressRecord>): Promise<void> {
    try {
      const posts = await this.makeRequest(`sports-progress?meta_key=user_id&meta_value=${userId}`);
      const athletePost = posts.find((post: Record<string, unknown>) => {
        const content = JSON.parse((post.content as { rendered: string }).rendered);
        return content.athlete_id === athleteId;
      });

      if (athletePost) {
        const currentProgress = JSON.parse((athletePost.content as { rendered: string }).rendered);
        const updatedProgress = { ...currentProgress, ...updates };

        await this.makeRequest(`sports-progress/${athletePost.id}`, {
          method: 'POST',
          body: JSON.stringify({
            content: JSON.stringify(updatedProgress),
            meta: {
              user_id: updatedProgress.user_id,
              athlete_id: updatedProgress.athlete_id,
              athlete_name: updatedProgress.athlete_name,
              story_read: updatedProgress.story_read,
              quiz_completed: updatedProgress.quiz_completed,
              quiz_score: updatedProgress.quiz_score,
              total_questions: updatedProgress.total_questions,
              completion_date: updatedProgress.completion_date,
              time_spent_reading: updatedProgress.time_spent_reading || 0
            }
          }),
        });
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }

  // Reset user password
  async resetPassword(usernameOrEmail: string): Promise<{ success: boolean; message: string }> {
    try {
      // First, find the user by username or email
      const users = await this.makeRequest('users');
      const user = users.find((u: { slug: string; name: string; email: string }) => 
        u.slug === usernameOrEmail || 
        u.name === usernameOrEmail || 
        u.email === usernameOrEmail
      );

      if (!user) {
        return {
          success: false,
          message: 'User not found. Please check your username or email.'
        };
      }

      // Generate a temporary password
      const tempPassword = this.generateTempPassword();

      // Update the user's password
      await this.makeRequest(`users/${user.id}`, {
        method: 'POST',
        body: JSON.stringify({
          password: tempPassword
        }),
      });

      // In a real implementation, you would send an email here
      // For now, we'll return the temporary password
      return {
        success: true,
        message: `Password reset successful! Your temporary password is: ${tempPassword}\n\nPlease log in with this temporary password and change it immediately.`
      };

    } catch (error) {
      console.error('Error resetting password:', error);
      return {
        success: false,
        message: 'Password reset failed. Please try again or contact support.'
      };
    }
  }

  // Generate a temporary password
  private generateTempPassword(): string {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  // Update user password (for when user wants to change from temporary password)
  async updateUserPassword(userId: number, newPassword: string): Promise<boolean> {
    try {
      await this.makeRequest(`users/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
          password: newPassword
        }),
      });
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  }

  // Get user approval status
  async getUserApprovalStatus(userId: number): Promise<{
    user_id: number;
    approval_status: string;
    is_approved: boolean;
    approval_required: boolean;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/sports-heroes/v1/user-status/${userId}`);
      
      if (!response.ok) {
        // If the approval system isn't installed, assume no approval required
        return {
          user_id: userId,
          approval_status: 'approved',
          is_approved: true,
          approval_required: false
        };
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error checking user approval status:', error);
      // Default to approved if we can't check (approval system not installed)
      return {
        user_id: userId,
        approval_status: 'approved',
        is_approved: true,
        approval_required: false
      };
    }
  }
}

export const wordpressAPI = new WordPressAPI();
