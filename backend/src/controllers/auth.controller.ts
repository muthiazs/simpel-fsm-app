import prisma from '../../prisma/client';
import * as bcrypt from 'bcrypt';
import { createToken } from '../middleware/jwtUtils';
import type { Context } from 'elysia'; // or the appropriate library providing Context

export const loginUser = async (email: string, password: string) => {
  try {
    console.log('Attempting login for email:', email);
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,       
        password: true,
      },
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }


    // Hash password yang ada di database terlebih dahulu
    const hashedPassword = await bcrypt.hash(user.password, 10);
    // Update password di database dengan version yang sudah di-hash
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });

    // console.log('Password sebenernya:', user.password);
    // console.log('Password yang diinput:', hashedPassword);

    // Setelah itu baru bisa menggunakan bcrypt.compare
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

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

    // Membuat JWT token setelah login berhasil
    const token = createToken(user);
    
    // Menampilkan token dan data user di console
    // console.log('Login successful for email:', email);
    // console.log('Generated JWT Token:', token);
    console.log('User Data:', {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    const { password: _, ...userData } = user;
    return { success: true, user: userData , redirectUrl , token}
    
  } catch (error) {
    console.error('Error during login:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
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
