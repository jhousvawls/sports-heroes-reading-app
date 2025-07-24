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
          
          // Store WordPress user data in the user object
          user.wpUserId = wpUser.id
          user.wpUser = wpUser
          
          return true
        } catch (error) {
          console.error('Error during sign in:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      // Persist WordPress user data in the token
      if (user?.wpUser) {
        token.wpUser = user.wpUser
        token.wpUserId = user.wpUserId
      }
      return token
    },
    async session({ session, token }) {
      // Send WordPress user data to the client
      if (token.wpUser) {
        session.user.wpUser = token.wpUser as WordPressUser
        session.user.wpUserId = token.wpUserId as number
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
