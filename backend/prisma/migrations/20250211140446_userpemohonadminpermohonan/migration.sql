-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PEMOHON');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pemohon" (
    "id_pemohon" SERIAL NOT NULL,
    "nipnim" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "pangkatgol" TEXT NOT NULL,
    "NoPaspor" TEXT,
    "NoHP" TEXT NOT NULL,
    "fileKTP" TEXT NOT NULL,
    "fileKarpeg" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pemohon_pkey" PRIMARY KEY ("id_pemohon")
);

-- CreateTable
CREATE TABLE "Permohonan" (
    "id_permohonan" SERIAL NOT NULL,
    "id_pemohon" INTEGER NOT NULL,
    "negaratujuan" TEXT NOT NULL,
    "instansitujuan" TEXT NOT NULL,
    "keperluan" TEXT NOT NULL,
    "tglMulai" TIMESTAMP(3) NOT NULL,
    "tglSelesai" TIMESTAMP(3) NOT NULL,
    "biaya" TEXT NOT NULL,
    "rencana" TEXT NOT NULL,
    "undangan" TEXT NOT NULL,
    "agenda" TEXT NOT NULL,
    "tor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permohonan_pkey" PRIMARY KEY ("id_permohonan")
);

-- CreateTable
CREATE TABLE "Admin" (
    "nip" TEXT NOT NULL,
    "id_admin" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("nip")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pemohon_nipnim_key" ON "Pemohon"("nipnim");

-- CreateIndex
CREATE UNIQUE INDEX "Pemohon_id_user_key" ON "Pemohon"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_admin_key" ON "Admin"("id_admin");

-- AddForeignKey
ALTER TABLE "Pemohon" ADD CONSTRAINT "Pemohon_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permohonan" ADD CONSTRAINT "Permohonan_id_pemohon_fkey" FOREIGN KEY ("id_pemohon") REFERENCES "Pemohon"("id_pemohon") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
