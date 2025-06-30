import { WordPressUser } from '@/lib/wordpress'

declare module 'next-auth' {
  interface User {
    wpUserId?: number
    wpUser?: WordPressUser
  }

  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      wpUser?: WordPressUser
      wpUserId?: number
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    wpUser?: WordPressUser
    wpUserId?: number
  }
}

// Extend the Profile interface to include Google-specific fields
declare module 'next-auth/providers/google' {
  interface GoogleProfile {
    sub: string
    name: string
    given_name: string
    family_name: string
    picture: string
    email: string
    email_verified: boolean
    locale: string
  }
}
