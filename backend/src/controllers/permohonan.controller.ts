import prisma from '../../prisma/client';


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
                createdat: true,
                updatedat: true,
                pemohon: {
                    select: { nama: true }
                }
            }
        });

        if (!permohonan) {
            return { success: false, message: "Permohonan not found!", data: null };
        }

        return { success: true, message: "Detail Permohonan", data: permohonan };
    } catch (error) {
        console.error(`Error fetching permohonan by ID: ${error}`);
        return { success: false, message: "Error fetching permohonan" };
    }
}

/**
 * ✅ Get permohonan berdasarkan ID User (Login)
 */
export async function getPermohonanByUserId(id_user: number) {
    try {
        // Cari pemohon berdasarkan id_user
        const pemohon = await prisma.pemohon.findUnique({
            where: { id_user },
            select: { id_pemohon: true }
        });

        if (!pemohon) {
            return { success: false, message: "Pemohon tidak ditemukan", data: null };
        }

        // Ambil permohonan berdasarkan id_pemohon
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
                createdat: true,
                updatedat: true,
                pemohon: {
                    select: { nama: true }
                }
            },
            orderBy: { createdat: 'desc' }
        });

        return { success: true, message: "Permohonan berdasarkan user", data: permohonanData };
    } catch (error) {
        console.error(`Error fetching permohonan by user ID: ${error}`);
        return { success: false, message: "Error fetching permohonan" };
    }
}

/**
 * Creating a permohonan
 */
export async function createPermohonan(data: { id_pemohon: number; negaratujuan: string; instansitujuan: string; keperluan: string; tglmulai: Date; tglselesai: Date; biaya: string; rencana: string; undangan: string; agenda: string; tor: string }) {
    try {
        const permohonan = await prisma.permohonan.create({
            data: {
                id_pemohon: data.id_pemohon,
                negaratujuan: data.negaratujuan,
                instansitujuan: data.instansitujuan,
                keperluan: data.keperluan,
                tglmulai: data.tglmulai,
                tglselesai: data.tglselesai,
                biaya: data.biaya,
                rencana: data.rencana,
                undangan: data.undangan,
                agenda: data.agenda,
                tor: data.tor,
                createdat: new Date(),
                updatedat: new Date(),
            },
        });

        return {
            success: true,
            message: "Permohonan Created Successfully!",
            data: permohonan,
        };
    } catch (e: unknown) {
        console.error(`Error creating permohonan: ${e}`);
        return { success: false, message: "Error creating permohonan" };
    }
}

/**
 * Updating a permohonan
 */
export async function updatePermohonan(id: string, data: { id_pemohon?: number; negaratujuan?: string; instansitujuan?: string; keperluan?: string; tglmulai?: Date; tglselesai?: Date; biaya?: string; rencana?: string; undangan?: string; agenda?: string; tor?: string }) {
    try {
        // Convert id to number and validate
        const permohonanId = parseInt(id);
        if (isNaN(permohonanId)) {
            return {
                success: false,
                message: "Invalid permohonan ID format",
                data: null,
            };
        }

        const existingPermohonan = await prisma.permohonan.findUnique({
            where: { id_permohonan: permohonanId },
        });

        if (!existingPermohonan) {
            return {
                success: false,
                message: "Permohonan tidak ditemukan",
            };
        }

        // Update permohonan with prisma
        const permohonan = await prisma.permohonan.update({
            where: { id_permohonan: permohonanId },
            data: {
                ...(data.id_pemohon ? { id_pemohon: data.id_pemohon } : {}),
                ...(data.negaratujuan ? { negaratujuan: data.negaratujuan } : {}),
                ...(data.instansitujuan ? { instansitujuan: data.instansitujuan } : {}),
                ...(data.keperluan ? { keperluan: data.keperluan } : {}),
                ...(data.tglmulai ? { tglmulai: data.tglmulai } : {}),
                ...(data.tglselesai ? { tglselesai: data.tglselesai } : {}),
                ...(data.biaya ? { biaya: data.biaya } : {}),
                ...(data.rencana ? { rencana: data.rencana } : {}),
                ...(data.undangan ? { undangan: data.undangan } : {}),
                ...(data.agenda ? { agenda: data.agenda } : {}),
                ...(data.tor ? { tor: data.tor } : {}),
                updatedat: new Date(),
            },
        });

        // Return response json
        return {
            success: true,
            message: "Permohonan Updated Successfully!",
            data: permohonan,
        };
    } catch (e: unknown) {
        console.error(`Error updating permohonan: ${e}`);
        return { success: false, message: "Error updating permohonan" };
    }
}

/**
 * Deleting a permohonan
 */
export async function deletePermohonan(id: string) {
    try {
        // Convert id to number and validate
        const permohonanId = parseInt(id);
        if (isNaN(permohonanId)) {
            return {
                success: false,
                message: "Invalid permohonan ID format",
            };
        }

        // Delete permohonan with prisma
        await prisma.permohonan.delete({
            where: { id_permohonan: permohonanId },
        });

        // Return response json
        return {
            success: true,
            message: "Permohonan Deleted Successfully!",
        };
    } catch (e: unknown) {
        console.error(`Error deleting permohonan: ${e}`);
        return { success: false, message: "Error deleting permohonan" };
    }
}