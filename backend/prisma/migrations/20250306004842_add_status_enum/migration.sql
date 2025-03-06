/*
  Warnings:

  - The `status` column on the `permohonan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PermohonanStatus" AS ENUM ('belumdisetujui', 'disetujui', 'ditolak', 'dalamproses');

-- AlterTable
ALTER TABLE "permohonan" DROP COLUMN "status",
ADD COLUMN     "status" "PermohonanStatus" NOT NULL DEFAULT 'belumdisetujui';
