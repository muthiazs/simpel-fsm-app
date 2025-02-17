// src/routes/AuthRoutes.ts
import { Elysia } from 'elysia';
import { loginUser } from '../controllers/auth.controller';

const authRouter = new Elysia({ prefix: '/auth' });

authRouter.post('/login', async (req) => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    return { success: false, message: 'Email and password are required' };
  }

  return await loginUser(email, password);
});


export default authRouter;
