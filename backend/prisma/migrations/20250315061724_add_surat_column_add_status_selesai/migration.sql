-- AlterEnum
ALTER TYPE "PermohonanStatus" ADD VALUE 'selesai';

-- AlterTable
ALTER TABLE "permohonan" ADD COLUMN     "surat" TEXT;
