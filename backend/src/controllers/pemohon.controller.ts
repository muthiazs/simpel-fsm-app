import prisma from '../../prisma/client';
import { MinioClient } from '../server';
import { UploadController , uploadToMinio } from './upload.controller';
/**
 * Get all pemohon
 */
export async function getPemohon() {
    try {
        const pemohon = await prisma.pemohon.findMany({ 
            orderBy: { createdat: 'desc' },
            select: {
                id_pemohon: true,
                nipnim: true,
                nama: true,
                nik: true,
                jabatan: true,
                pangkatgol: true,
                nopaspor: true,
                nohp: true,
                filektp: true,
                filekarpeg: true,
                prodi: true, // Include prodi in the selection
                createdat: true,
                updatedat: true,
            }
        });

        return {
            success: true,
            message: "List Data Pemohon!",
            data: pemohon,
        };
    } catch (error) {
        console.error(`Error getting pemohon: ${error}`);
        return { success: false, message: "Error fetching pemohon" };
    }
}

/**
 * Get pemohon by id
 */
export async function getPemohonById(id_user: string) {
    try {
        // Convert id to number and validate
        const pemohonId = parseInt(id_user);
        console.log(`ID received in getPemohonById: ${id_user}`);
        if (isNaN(pemohonId)) {
            return {
                success: false,
                message: "Invalid pemohon ID format",
                data: null,
            };
        }

        // Get pemohon by id
        const pemohon = await prisma.pemohon.findUnique({
            where: { id_user: pemohonId },
            select: {
                id_pemohon: true,
                nipnim: true,
                nama: true,
                nik: true,
                jabatan: true,
                pangkatgol: true,
                nopaspor: true,
                nohp: true,
                filektp: true,
                filekarpeg: true,
                prodi: true, // Include prodi in the selection
                createdat: true,
                updatedat: true,
            }
        });

        // If pemohon not found
        if (!pemohon) {
            return {
                success: false,
                message: "Pemohon not found!",
                data: null,
            };
        }

        // Return response json
        return {
            success: true,
            message: `Pemohon details for ID: ${id_user}`,
            data: pemohon,
        };
    } catch (e: unknown) {
        console.error(`Error finding pemohon: ${e}`);
        return { success: false, message: "Error fetching pemohon" };
    }
}

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


  
/**
 * Updating a pemohon with file upload handling
 */
export async function updatePemohon(id_user: string, options: { 
    nipnim?: string; 
    nama?: string; 
    nik?: string; 
    jabatan?: string; 
    pangkatgol?: string; 
    nopaspor?: string; 
    nohp?: string; 
    filektp?: File; 
    filekarpeg?: File; 
    prodi?: string 
}) {
    try {
        // Convert id to number and validate
        const pemohonId = Number(id_user);
        if (isNaN(pemohonId)) {
            return {
                success: false,
                message: "Invalid pemohon ID format",
                data: null,
            };
        }

        const existingPemohon = await prisma.pemohon.findUnique({
            where: { id_user: pemohonId },
        });
        
        if (!existingPemohon) {
            return {
                success: false,
                message: "Pemohon tidak ditemukan",
            };
        }

        const updateData: any = {
            ...(options.nipnim ? { nipnim: options.nipnim } : {}),
            ...(options.nama ? { nama: options.nama } : {}),
            ...(options.nik ? { nik: options.nik } : {}),
            ...(options.jabatan ? { jabatan: options.jabatan } : {}),
            ...(options.pangkatgol ? { pangkatgol: options.pangkatgol } : {}),
            ...(options.nopaspor ? { nopaspor: options.nopaspor } : {}),
            ...(options.nohp ? { nohp: options.nohp } : {}),
            ...(options.prodi ? { prodi: options.prodi } : {}),
            updatedat: new Date(),
        };

        // Fungsi untuk mengecek apakah file adalah PDF berdasarkan signature
        async function isPdfFile(buffer: ArrayBuffer): Promise<boolean> {
            const uint8Array = new Uint8Array(buffer);
            // PDF memiliki signature "%PDF-" di awal file
            return uint8Array[0] === 0x25 && uint8Array[1] === 0x50 && uint8Array[2] === 0x44 && uint8Array[3] === 0x46;
        }

        // Upload files to MinIO if they exist
        if (options.filektp) {
            // Validate file is a PDF
            const ktpBuffer = await options.filektp.arrayBuffer();
            if (!(await isPdfFile(ktpBuffer))) {
                return {
                    success: false,
                    message: "KTP file is not a valid PDF",
                };
            }
            
            const ktpPath = await uploadToMinio(options.filektp, "ktp-bucket");
            updateData.filektp = ktpPath;
        }

        if (options.filekarpeg) {
            // Validate file is a PDF
            const karpegBuffer = await options.filekarpeg.arrayBuffer();
            if (!(await isPdfFile(karpegBuffer))) {
                return {
                    success: false,
                    message: "Karpeg file is not a valid PDF",
                };
            }
            
            const karpegPath = await uploadToMinio(options.filekarpeg, "karpeg-bucket");
            updateData.filekarpeg = karpegPath;
        }

        // Update pemohon data in database
        const pemohon = await prisma.pemohon.update({
            where: { id_user: pemohonId },
            data: updateData,
        });

        return {
            success: true,
            message: "Pemohon Updated Successfully!",
            data: pemohon,
        };
    } catch (e: unknown) {
        console.error(`Error updating pemohon: ${e}`);
        return { success: false, message: "Error updating pemohon" };
    }
}

/**
 * Deleting a pemohon
 */
export async function deletePemohon(id: string) {
    try {
        // Convert id to number and validate
        const pemohonId = parseInt(id);
        if (isNaN(pemohonId)) {
            return {
                success: false,
                message: "Invalid pemohon ID format",
            };
        }

        // Delete pemohon with prisma
        await prisma.pemohon.delete({
            where: { id_pemohon: pemohonId },
        });

        // Return response json
        return {
            success: true,
            message: "Pemohon Deleted Successfully!",
        };
    } catch (e: unknown) {
        console.error(`Error deleting pemohon: ${e}`);
        return { success: false, message: "Error deleting pemohon" };
    }
}