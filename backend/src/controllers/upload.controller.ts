import prisma from "../../prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

interface UploadBody {
    file: { filename: string };
    type: "filektp" | "filekarpeg";
}

interface UploadContext {
    body: UploadBody;
    user?: { id: number };
}

const UPLOAD_DIR = "uploads"; // Direktori penyimpanan file

// Fungsi untuk menyimpan file ke server dan mengembalikan pathnya
const saveFile = async (file: { filename: string }, folder: string) => {
    const filePath = `/${UPLOAD_DIR}/${folder}/${file.filename}`;
    return filePath;
};

// Fungsi upload file KTP
export const uploadKTP = async (context: UploadContext) => {
    return uploadFile(context, "filektp");
};

// Fungsi upload file Karpeg
export const uploadKarpeg = async (context: UploadContext) => {
    return uploadFile(context, "filekarpeg");
};

// Fungsi utama upload file
export const uploadFile = async (context: UploadContext, type: "filektp" | "filekarpeg") => {
    try {
        const { body, user } = context;

        if (!user?.id) {
            return { success: false, message: "Unauthorized" };
        }

        if (!body?.file || !body?.file.filename) {
            return { success: false, message: "No file uploaded" };
        }

        const folder = type === "filektp" ? "ktp" : "karpeg";
        const filePath = await saveFile(body.file, folder);

        // Update database dengan path file
        await prisma.pemohon.update({
            where: { id_user: user.id },
            data: type === "filektp" ? { filektp: filePath } : { filekarpeg: filePath },
        });

        return { success: true, message: `${type} uploaded successfully`, path: filePath };
    } catch (error) {
        console.error("Upload Error:", error);
        return { success: false, message: "Internal Server Error" };
    }
};
