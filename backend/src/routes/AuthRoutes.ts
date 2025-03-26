import { Elysia } from 'elysia';
import { loginUser, logoutUser } from '../controllers/auth.controller';

export const authRouter = new Elysia({ prefix: '/auth' });

authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);

export default authRouter;
