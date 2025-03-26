import prisma from '../../prisma/client';
import * as bcrypt from 'bcrypt';
import { createToken } from '../middleware/jwtUtils';
import type { Context } from 'elysia'; // Import Context dari Elysia
import { addToBlacklist } from '../middleware/jwtUtils';

export const loginUser = async (context: Context) => {
    try {
        const { email, password } = await context.request.json();
        console.log('Attempting login for email:', email);

        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                password: true, // Ambil password untuk dibandingkan
            },
        });

        // Jika user tidak ditemukan
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        // Bandingkan password yang diinput dengan password di database
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return { success: false, message: 'Invalid password' };
        }

        // Tentukan redirect URL berdasarkan role
        let redirectUrl = '/dashboard';
        if (user.role === 'admin') redirectUrl = '/admin/dashboard';
        if (user.role === 'pemohon') redirectUrl = '/pemohon/dashboard';

        // Buat JWT token setelah login berhasil
        const token = createToken({ id: user.id, email: user.email, role: user.role });

        // Hapus password dari data user yang dikembalikan
        const { password: _, ...userData } = user;

        return { success: true, user: userData, redirectUrl, token };
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Internal server error' };
    }
};

// Fungsi logout (client harus menghapus token di sisi mereka)
export const logoutUser = async (context: Context) => {
  try {
      const authHeader = context.request.headers.get('authorization');

      if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.split(' ')[1];

          // Tambahkan token ke blacklist
          await addToBlacklist(token);

          console.log("🔹 User logged out, token blacklisted:", token);
      }

      return { success: true, message: 'Logout successful' };
  } catch (error) {
      console.error('Error during logout:', error);
      return { success: false, message: 'Failed to logout' };
  }
};