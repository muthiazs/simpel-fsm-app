import prisma from '../../prisma/client';
import { uploadToMinio } from './upload.controller';
import type { Context } from 'elysia'; // or the appropriate library providing Context
import { PermohonanStatus } from "@prisma/client"; // Pastikan enum diambil dari Prisma
/**
 * ✅ Get all permohonan (Tanpa filter)
 */
export async function getPermohonan() {
    try {
        console.log("Fetching all permohonan...");
        const permohonan = await prisma.permohonan.findMany({
            orderBy: { createdat: 'desc' },
            select: {
                id_permohonan: true,
                negaratujuan: true,
                instansitujuan: true,
                keperluan: true,
                tglmulai: true,
                tglselesai: true,
                biaya: true,
                createdat: true,
                updatedat: true,
                pemohon: {
                    select: { nama: true }
                }
            }
        });

        console.log("Success fetching all permohonan:", permohonan);

        return {
            success: true,
            message: "List Data Permohonan",
            data: permohonan,
        };
    } catch (error) {
        console.error(`Error getting all permohonan: ${error}`);
        return { success: false, message: "Error fetching permohonan" };
    }
}

/**
 * ✅ Get permohonan berdasarkan ID Permohonan
 */
export async function getPermohonanById(id_permohonan: string) {
    try {
        const permohonanId = parseInt(id_permohonan);
        if (isNaN(permohonanId)) {
            return { success: false, message: "Invalid permohonan ID format", data: null };
        }

        const permohonan = await prisma.permohonan.findUnique({
            where: { id_permohonan: permohonanId },
            select: {
                id_permohonan: true,
                negaratujuan: true,
                instansitujuan: true,
                keperluan: true,
                tglmulai: true,
                tglselesai: true,
                biaya: true,
                rencana: true,
                undangan: true,
                agenda: true,
                tor: true,
                createdat: true,
                updatedat: true,
                pemohon: {
                    select: { 
                        id_pemohon: true,
                        nama: true,
                        nohp: true,
                        nik: true,
                        jabatan: true,
                        pangkatgol: true,
                        nopaspor: true,
                        prodi: true,
                        nipnim: true,
                        filektp: true,
                        filekarpeg: true,
                    }
                }
            }
        });

        if (!permohonan) {
            return { success: false, message: "Permohonan not found!", data: null };
        }

        // Format tanggal agar sesuai dengan frontend
        const formattedPermohonan = {
            ...permohonan,
            tglmulai: permohonan.tglmulai.toISOString(),
            tglselesai: permohonan.tglselesai.toISOString(),
        };

        return { success: true, message: "Detail Permohonan", data: formattedPermohonan };
    } catch (error) {
        console.error(`Error fetching permohonan by ID: ${error}`);
        return { success: false, message: "Error fetching permohonan" };
    }
}

/**
 * Get permohonan by user ID (Login)
 */

export const getPermohonanByUserId = async (id_user: number) => {
    try {
      // 1. Cari id_pemohon dari tabel pemohon berdasarkan id_user
      const pemohon = await prisma.pemohon.findUnique({
        where: { id_user },
        select: { 
          id_pemohon: true, 
          nama: true,
          nohp: true,
          nik: true,
          jabatan: true,
          pangkatgol: true,
          nopaspor: true,
          prodi: true,
          nipnim: true,
          filektp: true,
          filekarpeg: true,
     },
      })
  
      if (!pemohon) {
        return { success: false, message: "Pemohon tidak ditemukan", data: null }
      }
  
      // 2. Ambil data permohonan berdasarkan id_pemohon dengan detail lengkap
      const permohonanData = await prisma.permohonan.findMany({
        where: { id_pemohon: pemohon.id_pemohon },
        select: {
          id_permohonan: true,
          negaratujuan: true,
          instansitujuan: true,
          keperluan: true,
          tglmulai: true,
          tglselesai: true,
          biaya: true,
          rencana: true,
          undangan: true,
          agenda: true,
          tor: true,
        },
        orderBy: { createdat: 'desc' },
      })
  
      // Kombinasikan data pemohon dan permohonan
      const combinedData = {
        ...pemohon,
        permohonan: permohonanData.map(permohonan => ({
          ...permohonan,
          tglmulai: permohonan.tglmulai.toISOString(),
          tglselesai: permohonan.tglselesai.toISOString(),
        }))
      }
  
      return {
        success: true,
        message: "Data permohonan berhasil diambil",
        data: combinedData,
      }
    } catch (error) {
      console.error('Error fetching permohonan:', error)
      return { 
        success: false, 
        message: "Terjadi kesalahan saat mengambil data permohonan",
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

/**
 * Create a new permohonan
 */
export const createPermohonan = async (options: {
    id_user: number;
    negaratujuan: string;
    instansitujuan: string;
    keperluan: string;
    tglmulai: string | Date;
    tglselesai: string | Date;
    biaya: string;
    rencana: string;
    undangan: File;
    agenda: File;
    tor: File;
}) => {
    try {
        console.log("📥 Incoming id_user:", options.id_user); // Debugging

        const idUser = Number(options.id_user);
        console.log("🔢 Converted id_user:", idUser); 

        if (isNaN(idUser) || idUser <= 0) {
            console.error("❌ ID User tidak valid:", options.id_user);
            return { success: false, message: "ID User tidak valid" };
        }

        // 🔹 1. Cari id_pemohon berdasarkan id_user
        const pemohon = await prisma.pemohon.findUnique({
            where: { id_user: idUser }, 
            select: { id_pemohon: true },
        });

        console.log("Found pemohon:", pemohon);

        if (!pemohon) {
            console.log("Pemohon tidak ditemukan untuk id_user:", idUser);
            return { success: false, message: "Pemohon tidak ditemukan" };
        }

        // 🔹 2. Upload file ke MinIO
        const [undanganPath, agendaPath, torPath] = await Promise.all([
            uploadToMinio(options.undangan, "undangan-bucket"),
            uploadToMinio(options.agenda, "agenda-bucket"),
            uploadToMinio(options.tor, "tor-bucket"),
        ]);

        console.log("Uploaded files:", { undanganPath, agendaPath, torPath });

        // 🔹 3. Simpan data permohonan ke database
        const permohonan = await prisma.permohonan.create({
            data: {
                id_pemohon: pemohon.id_pemohon,
                negaratujuan: options.negaratujuan,
                instansitujuan: options.instansitujuan,
                keperluan: options.keperluan,
                tglmulai: new Date(options.tglmulai),
                tglselesai: new Date(options.tglselesai),
                biaya: options.biaya,
                rencana: options.rencana,
                undangan: undanganPath,
                agenda: agendaPath,
                tor: torPath,
            },
        });

        console.log("Permohonan created successfully:", permohonan);

        return {
            success: true,
            message: "Permohonan created successfully",
            data: permohonan,
        };
    } catch (error) {
        console.error("Error creating permohonan:", error);
        return { success: false, message: "Error creating permohonan" };
    }
};

/**
 * Update a permohonan
 */


export async function updatePermohonan(id: string, data: {
    id_pemohon?: number;
    negaratujuan?: string;
    instansitujuan?: string;
    keperluan?: string;
    tglmulai?: Date;
    tglselesai?: Date;
    biaya?: string;
    rencana?: string;
    undangan?: string;
    agenda?: string;
    tor?: string;
    status?: string;
}) {
    try {
        console.log("📝 Updating permohonan with ID:", id);
        console.log("📦 Update data received:", data);

        const permohonanId = parseInt(id);
        if (isNaN(permohonanId)) {
            console.error("❌ Invalid ID format:", id);
            return { success: false, message: "Invalid permohonan ID format" };
        }

        const existingPermohonan = await prisma.permohonan.findUnique({
            where: { id_permohonan: permohonanId },
        });

        if (!existingPermohonan) {
            console.error("❌ Permohonan not found for ID:", permohonanId);
            return { success: false, message: "Permohonan not found" };
        }

        console.log("🔍 Found existing permohonan:", existingPermohonan);

        let statusEnum: PermohonanStatus | undefined;
        if (data.status) {
            console.log("📊 Processing status update:", data.status);
            if (Object.values(PermohonanStatus).includes(data.status as PermohonanStatus)) {
                statusEnum = data.status as PermohonanStatus;
            } else {
                console.error("❌ Invalid status value:", data.status);
                return { success: false, message: "Invalid status value" };
            }
        }

        const updateData = {
            id_pemohon: data.id_pemohon ?? undefined,
            negaratujuan: data.negaratujuan ?? undefined,
            instansitujuan: data.instansitujuan ?? undefined,
            keperluan: data.keperluan ?? undefined,
            tglmulai: data.tglmulai ?? undefined,
            tglselesai: data.tglselesai ?? undefined,
            biaya: data.biaya ?? undefined,
            rencana: data.rencana ?? undefined,
            undangan: data.undangan ?? undefined,
            agenda: data.agenda ?? undefined,
            tor: data.tor ?? undefined,
            status: statusEnum,
            updatedat: new Date(),
        };

        console.log("🔄 Applying updates with data:", updateData);

        const permohonan = await prisma.permohonan.update({
            where: { id_permohonan: permohonanId },
            data: updateData,
        });

        console.log("✅ Update successful. Updated permohonan:", permohonan);

        return {
            success: true,
            message: "Permohonan updated successfully",
            data: permohonan,
        };
    } catch (error) {
        console.error("❌ Error updating permohonan:", error);
        return { success: false, message: "Error updating permohonan" };
    }
}

/**
 * Delete a permohonan
 */
export async function deletePermohonan(id: string) {
    try {
        const permohonanId = parseInt(id);
        if (isNaN(permohonanId)) {
            return { success: false, message: "Invalid permohonan ID format" };
        }

        const existingPermohonan = await prisma.permohonan.findUnique({
            where: { id_permohonan: permohonanId },
        });

        if (!existingPermohonan) {
            return { success: false, message: "Permohonan not found" };
        }

        await prisma.permohonan.delete({
            where: { id_permohonan: permohonanId },
        });

        return { success: true, message: "Permohonan deleted successfully" };
    } catch (error) {
        console.error(`Error deleting permohonan: ${error}`);
        return { success: false, message: "Error deleting permohonan" };
    }
}