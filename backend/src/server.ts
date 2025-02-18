import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import authRouter from './routes/AuthRoutes';
import router from './routes';
import { getUsers } from './controllers/UserController';
import prisma from '../prisma/client';
import { authMiddleware } from './middleware/authMiddleware';


const app = new Elysia()
  .use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }));

// Route home
app.get('/', () => 'Hello Elysia!');

// Gunakan grup /api untuk semua routes
app.group('/api', (app) => {
  app.get('/protected', authMiddleware(async (context) => {
    return { message: 'You have access to this protected route!', user: context.user };
  }));
  app.use(router);    // user routes
  app.use(authRouter); // auth routes sekarang akan menjadi /api/auth/*
  return app;
});

app.listen(3001);

console.log(`🦊 Elysia is running at http://localhost:3001`);

async function testDBConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful!');
  } catch (error) {
    console.error(`Database connection failed: ${error}`);
  }
}

testDBConnection();