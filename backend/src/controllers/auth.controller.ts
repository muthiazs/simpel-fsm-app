import prisma from '../../prisma/client';
import * as bcrypt from 'bcrypt';

export const loginUser = async (email: string, password: string) => {
  try {
    console.log('Attempting login for email:', email);
    const user = await prisma.user.findUnique({
      where: { email },
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

    // Setelah itu baru bisa menggunakan bcrypt.compare
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      return { success: false, message: 'Invalid password' };
    }

    const { password: _, ...userData } = user;
    return { success: true, user: userData };
    
  } catch (error) {
    console.error('Error during login:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return { success: false, message: 'Internal server error' };
  }
};