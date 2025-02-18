// authMiddleware.ts
import { verifyToken } from '../middleware/jwtUtils';
import type { Context } from 'elysia'; // Menggunakan import type


// Modifikasi tipe Context agar mendukung data user
interface AuthContext extends Context {
    user?: any; // Menambahkan user sebagai properti opsional
  }
  
  export const authMiddleware = (handler: (context: AuthContext) => Promise<any>) => async (context: AuthContext) => {
    const authHeader = context.request.headers.get('authorization'); // Menggunakan get() untuk mengambil header
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { success: false, message: 'Unauthorized' };
    }
  
    const token = authHeader.split(' ')[1];
    const userData = verifyToken(token);
  
    if (!userData) {
      return { success: false, message: 'Invalid token' };
    }
  
    // Menyimpan data user di context agar bisa diakses handler
    context.user = userData;
  
    // Lanjutkan ke handler berikutnya
    return handler(context);
  };