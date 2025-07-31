import { WordPressUser } from '@/lib/wordpress'

interface ApprovalStatus {
  user_id: number
  approval_status: string
  is_approved: boolean
  approval_required: boolean
}

declare module 'next-auth' {
  interface User {
    wpUserId?: number
    wpUser?: WordPressUser
    approvalStatus?: ApprovalStatus
  }

  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      wpUser?: WordPressUser
      wpUserId?: number
      approvalStatus?: ApprovalStatus
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    wpUser?: WordPressUser
    wpUserId?: number
    approvalStatus?: ApprovalStatus
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
