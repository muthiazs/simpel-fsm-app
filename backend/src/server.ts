import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import authRouter from './routes/AuthRoutes';
import router from './routes';
import { getUsers } from './controllers/UserController';
import prisma from '../prisma/client';
import { authMiddleware } from './middleware/authMiddleware';
import { protectedRoutes } from './routes/protectedRoutes';
import pemohonRouter from './routes/pemohonRoutes';
import permohonanRouter from './routes/permohonanRouter';
// import { uploadRoutes } from './routes/uploadRoutes';
import { Client } from "minio";
import uploadRouter from './routes/uploadRoutes';
import fileRouter from './routes/fileRoutes'

export const MinioClient = new Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER || "minioadmin",
  secretKey: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
  region: "us-east-1",
});



async function checkBucket() {
  try {
    const bucketExists = await MinioClient.bucketExists("ktp-bucket");
    console.log("Bucket ktp-bucket ada:", bucketExists);
  } catch (error) {
    console.error("Error cek bucket:", error);
  }
}

checkBucket();

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
  app.use(pemohonRouter); // pemohon routes
  app.use(permohonanRouter)
  app.use(uploadRouter);
  app.use(fileRouter);
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