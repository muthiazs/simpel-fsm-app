import { Elysia } from "elysia";
import { Client } from "minio";
import MinioClient from "../lib/MinioClient";

const urlRouter = new Elysia();

urlRouter.get("/minio/presigned-url", async ({ query }) => {
    const { bucket, filename } = query;
    if (!bucket || !filename) {
      return { success: false, message: "Bucket dan filename diperlukan" };
    }
  
    const decodedFilename = decodeURIComponent(filename);
    console.log("🔍 Request presigned URL:", { bucket, decodedFilename });
  
    try {
      const url = await MinioClient.presignedGetObject(bucket, decodedFilename, 60 * 10); // 10 menit
      console.log("✅ Presigned URL berhasil dibuat:", url);
      return { success: true, url };
    } catch (error) {
      console.error("❌ Gagal membuat presigned URL", error);
      return { success: false, message: "Gagal membuat presigned URL", error };
    }
  });
  
  

export default urlRouter;
