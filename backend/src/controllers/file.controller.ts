import { Client } from "minio";

export const MinioClient = new Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER || "minioadmin",
  secretKey: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
});

// Fungsi untuk mendapatkan signed URL
export const getFileUrl = async (bucket: string, filePath: string): Promise<string> => {
  try {
    const url = await MinioClient.presignedGetObject(bucket, filePath, 3600); // Berlaku 1 jam
    return url;
  } catch (err) {
    console.error("Gagal mendapatkan signed URL:", err);
    throw new Error("Gagal mendapatkan signed URL");
  }
};
