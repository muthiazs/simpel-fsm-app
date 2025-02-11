import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  await prisma.user.createMany({
    data: [
      {
        username: 'adminfsm',
        email: 'adminfsm@example.com',
        password: 'password',
        role: 'ADMIN',
      },
      {
        username: 'pemohon1dosen',
        email: 'dosen@example.com',
        password: 'password', // Ganti dengan password yang di-hash di aplikasi
        role: 'PEMOHON', // Enum Role
      },
      {
        username: 'pemohon1mahasiswa',
        email: 'mahasiswa@example.com',
        password: 'password', // Ganti dengan password yang di-hash di aplikasi
        role: 'PEMOHON', // Enum Role
      },
    ],
  });

  console.log('✅ Seeder user berhasil dijalankan!');
}


