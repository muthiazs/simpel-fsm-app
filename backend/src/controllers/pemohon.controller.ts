import prisma from '../../prisma/client';

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
                // prodi: true, // Include prodi in the selection
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
                // prodi: true, // Include prodi in the selection
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

/**
 * Updating a pemohon
 */
export async function updatePemohon(id: string, options: { nipnim?: string; nama?: string; nik?: string; jabatan?: string; pangkatgol?: string; nopaspor?: string; nohp?: string; filektp?: string; filekarpeg?: string; prodi?: string }) {
    try {
        // Convert id to number and validate
        const pemohonId = parseInt(id);
        if (isNaN(pemohonId)) {
            return {
                success: false,
                message: "Invalid pemohon ID format",
                data: null,
            };
        }

        const existingPemohon = await prisma.pemohon.findUnique({
            where: { id_pemohon: pemohonId },
          });
          
          if (!existingPemohon) {
            return {
              success: false,
              message: "Pemohon tidak ditemukan",
            };
          }

        // Update pemohon with prisma
        const pemohon = await prisma.pemohon.update({
            where: { id_pemohon: pemohonId },
            data: {
                ...(options.nipnim ? { nipnim: options.nipnim } : {}),
                ...(options.nama ? { nama: options.nama } : {}),
                ...(options.nik ? { nik: options.nik } : {}),
                ...(options.jabatan ? { jabatan: options.jabatan } : {}),
                ...(options.pangkatgol ? { pangkatgol: options.pangkatgol } : {}),
                ...(options.nopaspor ? { nopaspor: options.nopaspor } : {}),
                ...(options.nohp ? { nohp: options.nohp } : {}),
                ...(options.filektp ? { filektp: options.filektp } : {}),
                ...(options.filekarpeg ? { filekarpeg: options.filekarpeg } : {}),
                ...(options.prodi ? { prodi: options.prodi } : {}),
                updatedat: new Date(),
            },
        });

        // Return response json
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