import express from 'express';
import { register, login, oauthCallback } from '../controllers/auth';

import passport from 'passport';

import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwt123';

router.post('/register', register);
router.post('/login', login);

// For demonstration purposes, we mock the OAuth flow to bypass Google/Meta API keys
// and log the user directly into the demo account (admin@msgdrop.com).
const mockOAuthHandler = (req: any, res: any) => {
  const payload = {
    user: {
      id: "mock-admin-id",
      email: "admin@msgdrop.com",
    },
  };
  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err: any, token: string | undefined) => {
    if (err || !token) {
      console.error("JWT Error:", err);
      return res.redirect(`http://localhost:5173/login?error=OAuthMockFailed`);
    }
    res.redirect(`http://localhost:5173/dashboard?token=${token}&email=admin@msgdrop.com`);
  });
};

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login?error=OAuthFailed', session: false }),
  oauthCallback
);

// Facebook OAuth (Mocked for now)
router.get('/facebook', mockOAuthHandler);
router.get('/facebook/callback', mockOAuthHandler);

export default router;
