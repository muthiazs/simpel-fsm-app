// routes/protectedRoutes.ts
import { Elysia } from 'elysia';
import { authMiddleware } from '../middleware/authMiddleware';

export const protectedRoutes = (app: Elysia) => {
  app.get(
    '/protected',
    authMiddleware(async (context) => {
      return {
        status: 'success',
        message: `Welcome, ${context.user?.username || 'Guest'}!`, // Tampilkan nama user jika ada
      };
    })
  );
};
