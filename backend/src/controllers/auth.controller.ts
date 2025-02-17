import prisma from '../../prisma/client';
import * as bcrypt from 'bcrypt';

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

    console.log('Password sebenernya:', user.password);
    console.log('Password yang diinput:', hashedPassword);

    // Setelah itu baru bisa menggunakan bcrypt.compare
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    // Tentukan redirect URL berdasarkan role
    let redirectUrl = '/dashboard'; // default redirect
    
    switch (user.role) {
      case 'ADMIN':
        redirectUrl = '/admin/dashboard';
        break;
      case 'PEMOHON':
        redirectUrl = '/pemohon/dashboard';
        break;
    }

    const { password: _, ...userData } = user;
    return { success: true, user: userData , redirectUrl };
    
  } catch (error) {
    console.error('Error during login:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return { success: false, message: 'Internal server error' };
  }
};