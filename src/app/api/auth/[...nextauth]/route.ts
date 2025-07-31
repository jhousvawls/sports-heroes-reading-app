import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { wordpressAPI, WordPressUser } from '@/lib/wordpress'

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

const handler = NextAuth({
  debug: true, // Enable debug mode for better error logging
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        try {
          const googleProfile = profile as GoogleProfile
          
          // Check if user exists in WordPress
          let wpUser = await wordpressAPI.getUserByEmail(googleProfile.email)
          
          if (!wpUser) {
            // Create new WordPress user from Google profile
            wpUser = await wordpressAPI.createUserFromGoogle({
              email: googleProfile.email,
              name: googleProfile.name || '',
              googleId: googleProfile.sub || '',
              firstName: googleProfile.given_name || '',
              lastName: googleProfile.family_name || '',
              picture: googleProfile.picture || ''
            })
          }
          
          // Check user approval status
          const approvalStatus = await wordpressAPI.getUserApprovalStatus(wpUser.id)
          
          // Store WordPress user data and approval status in the user object
          user.wpUserId = wpUser.id
          user.wpUser = wpUser
          user.approvalStatus = approvalStatus
          
          // Always return true - we'll handle approval redirects in the main app
          return true
        } catch (error) {
          console.error('Error during sign in:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      // Persist WordPress user data and approval status in the token
      if (user?.wpUser) {
        token.wpUser = user.wpUser
        token.wpUserId = user.wpUserId
        token.approvalStatus = user.approvalStatus
      }
      return token
    },
    async session({ session, token }) {
      // Send WordPress user data and approval status to the client
      if (token.wpUser) {
        session.user.wpUser = token.wpUser as WordPressUser
        session.user.wpUserId = token.wpUserId as number
        session.user.approvalStatus = token.approvalStatus as {
          user_id: number;
          approval_status: string;
          is_approved: boolean;
          approval_required: boolean;
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/', // Redirect to home page for sign in
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }
