// Import Elysia
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors'; // Import CORS
// Import routes
import Routes from './routes';


// Inisialisasi Elysia
const app = new Elysia()

// Gunakan CORS
app.use(cors()) // Gunakan CORS untuk mengizinkan akses dari frontend

// Route utama
app.get('/', () => 'Hello Elysia!');

// Tambahkan routes ke dalam `/api`
app.group('/api', (app) => app.use(Routes));

// Jalankan server di port 3001
app.listen(3001);

console.log(`🦊 Elysia is running at http://localhost:3001`);
