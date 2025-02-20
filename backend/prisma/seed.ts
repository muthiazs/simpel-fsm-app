import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seeder untuk User dengan role ADMIN
  const adminUser = await prisma.user.upsert({
    where: { email: 'adminfsm@gmail.com' },
    update: {},
    create: {
      username: 'adminfsm',
      email: 'adminfsm@gmail.com',
      password: 'password123',
      role: 'admin', // Role sesuai dengan enum huruf kecil
    },
  });

  // Seeder untuk Admin terkait User dengan role ADMIN
  await prisma.admin.upsert({
    where: { id_admin: adminUser.id },
    update: {},
    create: {
      nip: '1234567890',
      id_admin: adminUser.id,
    },
  });

  // Seeder untuk User dengan role PEMOHON (Mahasiswa)
  const pemohonMahasiswaUser = await prisma.user.upsert({
    where: { email: 'muthiazs@gmail.com' },
    update: {},
    create: {
      username: 'Muthia Zhafira Sahnah',
      email: 'muthiazs@gmail.com',
      password: 'password123',
      role: 'pemohon',
    },
  });

  // Seeder untuk Pemohon terkait User Mahasiswa
  await prisma.pemohon.upsert({
    where: { id_user: pemohonMahasiswaUser.id },
    update: {},
    create: {
      id_user: pemohonMahasiswaUser.id,
      nipnim: '2025001',
      nama: 'Muthia',
      nik: '-',
      jabatan: 'Mahasiswa',
      pangkatgol: '-',
      nopaspor: '-', // Sesuaikan nama properti dengan model di Prisma
      nohp: '-',
      filektp: '-',
      filekarpeg: '-',
    },
  });

  // Seeder untuk User dengan role PEMOHON (Dosen)
  const pemohonDosenUser = await prisma.user.upsert({
    where: { email: 'erma@gmail.com' },
    update: {},
    create: {
      username: 'erma',
      email: 'erma@gmail.com',
      password: 'password123',
      role: 'pemohon',
    },
  });

  // Seeder untuk Pemohon terkait User Dosen
  await prisma.pemohon.upsert({
    where: { id_user: pemohonDosenUser.id },
    update: {},
    create: {
      id_user: pemohonDosenUser.id,
      nipnim: '2025002',
      nama: 'Erma',
      nik: '-',
      jabatan: 'Dosen',
      pangkatgol: '-',
      nopaspor: null,
      nohp: '-',
      filektp: '-',
      filekarpeg: '-',
    },
  });

  console.log('Data seeding completed!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error('Error seeding data:', error);
    prisma.$disconnect();
    process.exit(1);
  });
