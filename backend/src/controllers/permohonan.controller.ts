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
 * Get permohonan by user ID (Login)
 */
export async function getPermohonanByUserId(id_user: number) {
    try {
        const pemohon = await prisma.pemohon.findUnique({
            where: { id_user },
            select: { id_pemohon: true }
        });

        if (!pemohon) {
            return { success: false, message: "Pemohon not found", data: null };
        }

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

        return { success: true, message: "User's permohonan retrieved successfully", data: permohonanData };
    } catch (error) {
        console.error(`Error fetching permohonan by user ID: ${error}`);
        return { success: false, message: "Error fetching permohonan" };
    }
}

/**
 * Create a new permohonan
 */
export async function createPermohonan(data: {
    id_pemohon: number;
    negaratujuan: string;
    instansitujuan: string;
    keperluan: string;
    tglmulai: Date;
    tglselesai: Date;
    biaya: string;
    rencana: string;
    undangan: string;
    agenda: string;
    tor: string;
}) {
    try {
        const permohonan = await prisma.permohonan.create({
            data: {
                ...data,
                createdat: new Date(),
                updatedat: new Date(),
            },
        });

        return {
            success: true,
            message: "Permohonan created successfully",
            data: permohonan,
        };
    } catch (error) {
        console.error(`Error creating permohonan: ${error}`);
        return { success: false, message: "Error creating permohonan" };
    }
}

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
}) {
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

        const permohonan = await prisma.permohonan.update({
            where: { id_permohonan: permohonanId },
            data: {
                ...data,
                updatedat: new Date(),
            },
        });

        return {
            success: true,
            message: "Permohonan updated successfully",
            data: permohonan,
        };
    } catch (error) {
        console.error(`Error updating permohonan: ${error}`);
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