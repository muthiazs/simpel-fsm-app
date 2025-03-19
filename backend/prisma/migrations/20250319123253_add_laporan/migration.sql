-- AlterEnum
ALTER TYPE "PermohonanStatus" ADD VALUE 'lengkap';

-- AlterTable
ALTER TABLE "permohonan" ADD COLUMN     "laporan" TEXT;
