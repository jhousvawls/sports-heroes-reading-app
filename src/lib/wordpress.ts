// WordPress API integration for user progress tracking

export interface WordPressUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
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
    const url = `${this.baseUrl}/wp-json/wp/v2/${endpoint}`;
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
      const users = await this.makeRequest(`users?search=${username}`);
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
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
      return posts.map((post: any) => JSON.parse(post.content.rendered));
    } catch (error) {
      console.error('Error fetching progress:', error);
      return [];
    }
  }

  // Get specific athlete progress for user
  async getAthleteProgress(userId: number, athleteId: number): Promise<ProgressRecord | null> {
    try {
      const posts = await this.makeRequest(`sports-progress?meta_key=user_id&meta_value=${userId}`);
      const athletePost = posts.find((post: any) => {
        const content = JSON.parse(post.content.rendered);
        return content.athlete_id === athleteId;
      });
      
      return athletePost ? JSON.parse(athletePost.content.rendered) : null;
    } catch (error) {
      console.error('Error fetching athlete progress:', error);
      return null;
    }
  }

  // Update existing progress
  async updateProgress(userId: number, athleteId: number, updates: Partial<ProgressRecord>): Promise<void> {
    try {
      const posts = await this.makeRequest(`sports-progress?meta_key=user_id&meta_value=${userId}`);
      const athletePost = posts.find((post: any) => {
        const content = JSON.parse(post.content.rendered);
        return content.athlete_id === athleteId;
      });

      if (athletePost) {
        const currentProgress = JSON.parse(athletePost.content.rendered);
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
}

export const wordpressAPI = new WordPressAPI();
