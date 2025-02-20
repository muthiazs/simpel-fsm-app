-- CreateEnum
CREATE TYPE "role" AS ENUM ('admin', 'pemohon');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pemohon" (
    "id_pemohon" SERIAL NOT NULL,
    "nipnim" TEXT,
    "id_user" INTEGER NOT NULL,
    "nama" TEXT,
    "nik" TEXT,
    "jabatan" TEXT,
    "pangkatgol" TEXT,
    "nopaspor" TEXT,
    "nohp" TEXT,
    "filektp" TEXT,
    "filekarpeg" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pemohon_pkey" PRIMARY KEY ("id_pemohon")
);

-- CreateTable
CREATE TABLE "permohonan" (
    "id_permohonan" SERIAL NOT NULL,
    "id_pemohon" INTEGER NOT NULL,
    "negaratujuan" TEXT NOT NULL,
    "instansitujuan" TEXT NOT NULL,
    "keperluan" TEXT NOT NULL,
    "tglmulai" TIMESTAMP(3) NOT NULL,
    "tglselesai" TIMESTAMP(3) NOT NULL,
    "biaya" TEXT NOT NULL,
    "rencana" TEXT NOT NULL,
    "undangan" TEXT NOT NULL,
    "agenda" TEXT NOT NULL,
    "tor" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permohonan_pkey" PRIMARY KEY ("id_permohonan")
);

-- CreateTable
CREATE TABLE "admin" (
    "nip" TEXT NOT NULL,
    "id_admin" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("nip")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pemohon_id_user_key" ON "pemohon"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_admin_key" ON "admin"("id_admin");

-- AddForeignKey
ALTER TABLE "pemohon" ADD CONSTRAINT "pemohon_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permohonan" ADD CONSTRAINT "permohonan_id_pemohon_fkey" FOREIGN KEY ("id_pemohon") REFERENCES "pemohon"("id_pemohon") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
