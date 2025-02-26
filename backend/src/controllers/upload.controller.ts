import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { Elysia } from 'elysia';
import ShortUniqueId from 'short-unique-id';
import { MinioClient } from "../server";


const isMetaDataImg = async (buffer: ArrayBuffer): Promise<boolean> => {
  const signatures = [
    "89504E47", // PNG
    "FFD8FF",   // JPG/JPEG
    "47494638", // GIF
  ];

  const uint8Array = new Uint8Array(buffer);
  const hexString = Array.from(uint8Array)
    .slice(0, 4)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  return signatures.some((sig) => hexString.startsWith(sig));
};


export const UploadController = {
  uploadFile: async ({ file }: { file: File }) => {
    try {
      const fileBuffer = await file.arrayBuffer(); // Convert file to buffer

      const { randomUUID } = new ShortUniqueId({ length: 20 });

      // Cek apakah file adalah gambar atau PDF
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";

      if (!isImage && !isPdf) {
        return {
          data: null,
          message: "Uploaded file must be an image (JPG, PNG) or a PDF",
        };
      }

      // Tentukan ekstensi file berdasarkan tipe
      const fileExtension = isPdf ? "pdf" : file.type.split("/")[1]; 
      const fileName = `${randomUUID()}.${fileExtension}`;

      // Metadata untuk penyimpanan di MinIO
      const metadata = {
        "Content-Type": file.type,
        "Content-Length": file.size.toString(),
      };

      await MinioClient.putObject(
        process.env.BUCKET_NAME!,
        fileName,
        Buffer.from(fileBuffer),
        file.size,
        metadata
      );

      return {
        data: `File uploaded successfully to ${process.env.BUCKET_NAME}/${fileName}`,
        message: "success",
      };
    } catch (error) {
      console.error(error);
      return {
        data: "There is something wrong",
        message: "failed",
      };
    }
  },
};

// Fungsi Upload ke MinIO dengan dukungan PDF dan Image
export async function uploadToMinio(file: File, bucketName: string): Promise<string> {
  const fileBuffer = await file.arrayBuffer();
  
  // Cek apakah file adalah gambar atau PDF
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";

  if (!isImage && !isPdf) {
    throw new Error("Uploaded file must be an image (JPG, PNG) or a PDF");
  }

  // Tentukan ekstensi file
  const fileExtension = isPdf ? "pdf" : file.type.split("/")[1];
  const fileName = `${Date.now()}-${file.name.split(".")[0]}.${fileExtension}`;

  await MinioClient.putObject(
    bucketName,
    fileName,
    Buffer.from(fileBuffer),
    file.size,
    { "Content-Type": file.type }
  );

  return `/${bucketName}/${fileName}`; // Path untuk referensi di database
}
