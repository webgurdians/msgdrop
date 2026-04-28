import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import prisma from './prisma';

// Use environment variables for client IDs and Secrets.
// We provide dummy defaults so the server doesn't crash if the user hasn't provided them yet.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'dummy-google-client-id';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'dummy-google-client-secret';

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || 'dummy-facebook-app-id';
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || 'dummy-facebook-app-secret';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BACKEND_URL}/api/v1/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user based on Google profile
      const email = profile.emails?.[0].value;
      if (!email) {
        return done(new Error("No email found from Google profile"));
      }

      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        // Create user
        user = await prisma.user.create({
          data: {
            email,
            first_name: profile.name?.givenName || profile.displayName,
            last_name: profile.name?.familyName || '',
            password_hash: '', // OAuth users don't have a local password
          }
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `${BACKEND_URL}/api/v1/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'name']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0].value;
      if (!email) {
        return done(new Error("No email found from Facebook profile"));
      }

      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            first_name: profile.name?.givenName || profile.displayName,
            last_name: profile.name?.familyName || '',
            password_hash: '', 
          }
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// We are using JWTs, so we don't strictly need to serialize/deserialize for session storage,
// but passport requires these methods to be defined if sessions are used.
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
