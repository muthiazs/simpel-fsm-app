import prisma from '../../prisma/client';

/**
 * Get all permohonan
 */
export async function getPermohonan() {
    try {
        const permohonan = await prisma.permohonan.findMany({
            orderBy: { createdat: 'desc' },
            select: {
                id_permohonan: true,
                id_pemohon: true,
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
            }
        });

        return {
            success: true,
            message: "List Data Permohonan!",
            data: permohonan,
        };
    } catch (error) {
        console.error(`Error getting permohonan: ${error}`);
        return { success: false, message: "Error fetching permohonan" };
    }
}

/**
 * Get permohonan by id
 */
export async function getPermohonanById(id_permohonan: string) {
    try {
        // Convert id to number and validate
        const permohonanId = parseInt(id_permohonan);
        if (isNaN(permohonanId)) {
            return {
                success: false,
                message: "Invalid permohonan ID format",
                data: null,
            };
        }

        // Get permohonan by id
        const permohonan = await prisma.permohonan.findUnique({
            where: { id_permohonan: permohonanId },
            select: {
                id_permohonan: true,
                id_pemohon: true,
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
            }
        });

        // If permohonan not found
        if (!permohonan) {
            return {
                success: false,
                message: "Permohonan not found!",
                data: null,
            };
        }

        // Return response json
        return {
            success: true,
            message: `Permohonan details for ID: ${id_permohonan}`,
            data: permohonan,
        };
    } catch (e: unknown) {
        console.error(`Error finding permohonan: ${e}`);
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