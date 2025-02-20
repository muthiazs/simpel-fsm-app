-- DropForeignKey
ALTER TABLE "pemohon" DROP CONSTRAINT "pemohon_id_user_fkey";

-- AddForeignKey
ALTER TABLE "pemohon" ADD CONSTRAINT "pemohon_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
