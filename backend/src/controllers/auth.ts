import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwt123';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(validatedData.password, salt);

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        phone: validatedData.phone,
        password_hash,
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: (error as any).errors });
      return;
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(validatedData.password, user.password_hash);

    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        success: true,
        data: {
          access_token: token,
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
          },
        },
      });
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: (error as any).errors });
      return;
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const oauthCallback = (req: Request, res: Response): void => {
  if (!req.user) {
    res.redirect('http://localhost:5173/?error=OAuthFailed');
    return;
  }

  const user = req.user as any;
  const payload = {
    user: {
      id: user.id,
      email: user.email,
    },
  };

  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
    if (err) {
      res.redirect('http://localhost:5173/?error=TokenGenerationFailed');
      return;
    }
    
    // Redirect to frontend with token and email as query parameters.
    // The frontend should catch these and save them to localStorage.
    res.redirect(`http://localhost:5173/dashboard?token=${token}&email=${encodeURIComponent(user.email)}`);
  });
};
