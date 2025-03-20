import prisma from '../../prisma/client';
import * as bcrypt from 'bcrypt';
import { createToken } from '../middleware/jwtUtils';
import type { Context } from 'elysia'; // or the appropriate library providing Context

export const loginUser = async (email: string, password: string) => {
  try {
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

    console.log('Input password:', password); // Harus plaintext
    console.log('Hashed password in DB:', user.password); // Harus hash
    console.log('Password comparison result:', isValidPassword); // Harus true atau false

    // Jika password tidak valid
    if (!isValidPassword) {
      return { success: false, message: 'Invalid password' };
    }

    // Tentukan redirect URL berdasarkan role
    let redirectUrl = '/dashboard'; // default redirect

    switch (user.role) {
      case 'admin':
        redirectUrl = '/admin/dashboard';
        break;
      case 'pemohon':
        redirectUrl = '/pemohon/dashboard';
        break;
    }

    // Buat JWT token setelah login berhasil
    const token = createToken(user);

    // Hapus password dari data user yang dikembalikan
    const { password: _, ...userData } = user;

    // Kembalikan response sukses
    return { success: true, user: userData, redirectUrl, token };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'Internal server error' };
  }
};
// Fungsi logout dengan penghapusan token menggunakan cookie
export const logout = async (context: Context) => {
  try {
   
    console.log('User successfully logged out');

    return {
      status: 'success',
      message: 'Logout successful',
    };
  } catch (error) {
    console.error('Error during logout:', error);
    return {
      status: 'error',
      message: 'Failed to logout',
    };
  }
};
