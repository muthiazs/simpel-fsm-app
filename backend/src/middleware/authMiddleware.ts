// authMiddleware.ts
import { verifyToken } from '../middleware/jwtUtils';
import type { Context } from 'elysia'; // Menggunakan import type


// Modifikasi tipe Context agar mendukung data user
interface AuthContext extends Context {
    user?: { id: number; email?: string }; // Pastikan ada ID user
  }
  
  export const authMiddleware = (handler: (context: AuthContext) => Promise<any>) => async (context: AuthContext) => {
    const authHeader = context.request.headers.get('authorization'); // Menggunakan get() untuk mengambil header
  
    if (!context.headers.authorization) {
      console.warn("❌ No Authorization header found.");
      return { success: false, message: "Unauthorized" };
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { success: false, message: 'Unauthorized' };
    }
  
    const token = authHeader.split(' ')[1];
    console.log("🔹 Extracted Token:", token);
    const userData = verifyToken(token);

    if (!userData) {
      return { success: false, message: 'Invalid token' };
    }
  
     // Sekarang TypeScript yakin bahwa userData memiliki 'id'
    context.user = {
        id: userData.id,
        email: userData.email,
    };
    console.log("🔐 User data:", userData);
  
    // Lanjutkan ke handler berikutnya
    return handler(context);
  };