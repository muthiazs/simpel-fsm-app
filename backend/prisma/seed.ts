// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   // Seeder untuk User dengan role ADMIN
//   const adminUser = await prisma.user.upsert({
//     where: { email: 'adminfsm@gmail.com' },
//     update: {},
//     create: {
//       username: 'adminfsm',
//       email: 'adminfsm@gmail.com',
//       password: 'password123',
//       role: 'admin', // Role sesuai dengan enum huruf kecil
//     },
//   });

//   // Seeder untuk Admin terkait User dengan role ADMIN
//   await prisma.admin.upsert({
//     where: { id_admin: adminUser.id },
//     update: {},
//     create: {
//       nip: '1234567890',
//       id_admin: adminUser.id,
//     },
//   });

//   // Seeder untuk User dengan role PEMOHON (Mahasiswa)
//   const pemohonMahasiswaUser = await prisma.user.upsert({
//     where: { email: 'muthiazs@gmail.com' },
//     update: {},
//     create: {
//       username: 'Muthia Zhafira Sahnah',
//       email: 'muthiazs@gmail.com',
//       password: 'password123',
//       role: 'pemohon',
//     },
//   });

//   // Seeder untuk Pemohon terkait User Mahasiswa
//   await prisma.pemohon.upsert({
//     where: { id_user: pemohonMahasiswaUser.id },
//     update: {},
//     create: {
//       id_user: pemohonMahasiswaUser.id,
//       nipnim: '2025001',
//       nama: 'Muthia',
//       nik: '-',
//       jabatan: 'Mahasiswa',
//       pangkatgol: '-',
//       nopaspor: '-', // Sesuaikan nama properti dengan model di Prisma
//       nohp: '-',
//       filektp: '-',
//       filekarpeg: '-',
//     },
//   });

//   // Seeder untuk User dengan role PEMOHON (Dosen)
//   const pemohonDosenUser = await prisma.user.upsert({
//     where: { email: 'erma@gmail.com' },
//     update: {},
//     create: {
//       username: 'erma',
//       email: 'erma@gmail.com',
//       password: 'password123',
//       role: 'pemohon',
//     },
//   });

//   // Seeder untuk Pemohon terkait User Dosen
//   await prisma.pemohon.upsert({
//     where: { id_user: pemohonDosenUser.id },
//     update: {},
//     create: {
//       id_user: pemohonDosenUser.id,
//       nipnim: '2025002',
//       nama: 'Erma',
//       nik: '-',
//       jabatan: 'Dosen',
//       pangkatgol: '-',
//       nopaspor: null,
//       nohp: '-',
//       filektp: '-',
//       filekarpeg: '-',
//     },
//   });

//   console.log('Data seeding completed!');
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch((error) => {
//     console.error('Error seeding data:', error);
//     prisma.$disconnect();
//     process.exit(1);
//   });



import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Pastikan user pemohon sudah ada sebelum menambahkan permohonan
  const pemohonMahasiswa = await prisma.pemohon.findUnique({
    where: { id_user: 2 },
  });

  const pemohonDosen = await prisma.pemohon.findUnique({
    where: { id_user: 3 },
  });

  if (!pemohonMahasiswa || !pemohonDosen) {
    throw new Error('Pemohon belum tersedia, pastikan sudah melakukan seeding user dan pemohon!');
  }

  // Seeder Permohonan untuk Mahasiswa
  await prisma.permohonan.create({
    data: {
      id_pemohon: pemohonMahasiswa.id_pemohon,
      negaratujuan: 'Jepang',
      instansitujuan: 'Tokyo University',
      keperluan: 'Konferensi AI',
      tglmulai: new Date('2025-05-10'),
      tglselesai: new Date('2025-05-15'),
      biaya: '5000 USD',
      rencana: 'Mengikuti konferensi AI di Tokyo',
      undangan: 'https://example.com/undangan',
      agenda: 'https://example.com/agenda',
      tor: 'https://example.com/tor',
    },
  });

  // Seeder Permohonan untuk Dosen
  await prisma.permohonan.create({
    data: {
      id_pemohon: pemohonDosen.id_pemohon,
      negaratujuan: 'Jerman',
      instansitujuan: 'Humboldt University',
      keperluan: 'Penelitian AI',
      tglmulai: new Date('2025-07-01'),
      tglselesai: new Date('2025-07-30'),
      biaya: '7000 EUR',
      rencana: 'Kolaborasi riset dengan tim AI',
      undangan: 'https://example.com/undangan',
      agenda: 'https://example.com/agenda',
      tor: 'https://example.com/tor',
    },
  });

  console.log('Seeder permohonan selesai!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error('Error saat seeding permohonan:', error);
    prisma.$disconnect();
    process.exit(1);
  });
