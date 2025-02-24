import { Elysia } from 'elysia';
import { getUsers , createUser , getUserById, updateUser ,  deleteUser} from '../controllers/UserController';
import { cors } from '@elysiajs/cors';
import prisma from '../../prisma/client';
import { authMiddleware } from '../middleware/authMiddleware';

// Menggunakan Elysia router dengan prefix '/users'
const router = new Elysia({ prefix: '/users' });

// Route untuk mendapatkan data pengguna berdasarkan token JWT yang dikirim di header Authorization
router.get('/', authMiddleware(async (context) => {
  const user = context.user; // Mendapatkan data user dari context (hasil verifikasi token)
  
  // Ambil data pengguna berdasarkan id yang sudah terverifikasi
  const userData = await prisma.user.findUnique({
    where: { id: user?.id    },// ID user yang sudah terverifikasi       },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
    },
  });

  if (!userData) {
    return { success: false, message: 'User not found' };
  }

  return { success: true, user: userData }; // Kembalikan data user
}));

router.get('/:id', async (req) => {
  console.log(`Fetching user with ID: ${req.params.id}`);
  const id = req.params.id;
  return await getUserById(id);
});


  //route get all USERS
  router.get('/all',async () => await getUsers());
  //route create user
  router.post('/', async (req) => {
    try {
      // Ambil data dari body
      const { username, email, password } = req.body as { username: string, email: string, password: string };

      // Log data yang diterima
      console.log("Request received with data:", { username, email, password });

      // Pastikan semua field ada
      if (!username || !email || !password) {
        return { success: false, message: "All fields are required" };
      }

       // Log bahwa data sudah lengkap sebelum membuat user
      console.log("All fields are present. Creating user...");

      // Buat user
      return await createUser({ username, email, password });
    } catch (error) {
      console.error(`Error handling POST request: ${error}`);
      return { success: false, message: "Internal server error" };
    }
  });
  //route update user
  router.patch('/:id', async (req) => {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body as { username?: string, email?: string, password?: string };

      // Log data yang diterima
      console.log(`Request received to update user with ID: ${id}`, { username, email, password });

      // Pastikan setidaknya ada satu field yang diupdate
      if (!username && !email && !password) {
        return { success: false, message: "At least one field is required to update" };
      }

      // Log bahwa data sudah lengkap sebelum mengupdate user
      console.log("Fields are present. Updating user...");

      // Update user
      return await updateUser(id, { username, email, password });
    } catch (error) {
      console.error(`Error handling PATCH request: ${error}`);
      return { success: false, message: "Internal server error" };
    }
  });
  //route update user
  router.delete('/:id', async (req) => {
    try {
      const { id } = req.params;
      // Log data yang diterima
      console.log(`Request received to delete user with ID: ${id}`);
      return await deleteUser(id);
    } catch (error) {
      console.error(`Error handling DELETE request: ${error}`);
      return { success: false, message: "Internal server error" };
    }
  });

 
export default router;