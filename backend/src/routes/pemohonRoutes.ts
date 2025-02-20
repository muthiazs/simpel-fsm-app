import { Elysia } from 'elysia';
import { getPemohon, getPemohonById, updatePemohon, deletePemohon } from '../controllers/pemohon.controller';
import { cors } from '@elysiajs/cors';
import prisma from '../../prisma/client';
import { authMiddleware } from '../middleware/authMiddleware';

// Menggunakan Elysia router dengan prefix '/pemohon'
const pemohonRouter = new Elysia({ prefix: '/pemohon' });

// Middleware untuk mengaktifkan CORS
pemohonRouter.use(cors());

// Route untuk mendapatkan data pemohon berdasarkan token JWT yang dikirim di header Authorization
pemohonRouter.get('/', authMiddleware(async (context) => {
    const user = context.user; // Mendapatkan data user dari context (hasil verifikasi token)
    
    // Ambil data pemohon berdasarkan id yang sudah terverifikasi
    const pemohonData = await prisma.pemohon.findUnique({
        where: { id_user: user.id }, // ID user yang sudah terverifikasi
        select: {
            id_pemohon: true,
            nipnim: true,
            id_user: true,
            nama: true,
            nik: true,
            jabatan: true,
            pangkatgol: true,
            nopaspor: true,
            nohp: true,
            filektp: true,
            filekarpeg: true,
            // prodi: true, // Include the new field
            createdat: true,
            updatedat: true,
        },
    });

    if (!pemohonData) {
        return { success: false, message: 'Pemohon not found' };
    }

    return { success: true, pemohon: pemohonData }; // Kembalikan data pemohon
}));

pemohonRouter.get('/:id', async (req) => {
    console.log(`Fetching pemohon with ID: ${req.params.id}`);
    const id = req.params.id;
    return await getPemohonById(id);
});

// Route to get all pemohon
pemohonRouter.get('/all', async () => await getPemohon());

// Route to update pemohon
pemohonRouter.patch('/:id', async (req) => {
    try {
        const { id } = req.params;
        const options = req.body as { nipnim?: string; nama?: string; nik?: string; jabatan?: string; pangkatgol?: string; nopaspor?: string; nohp?: string; filektp?: string; filekarpeg?: string; prodi?: string };

        // Log data yang diterima
        console.log(`Request received to update pemohon with ID: ${id}`, options);

        // Pastikan setidaknya ada satu field yang diupdate
        if (!options.nipnim && !options.nama && !options.nik && !options.jabatan && !options.pangkatgol && !options.nopaspor && !options.nohp && !options.filektp && !options.filekarpeg && !options.prodi) {
            return { success: false, message: "At least one field is required to update" };
        }

        // Log bahwa data sudah lengkap sebelum mengupdate pemohon
        console.log("Fields are present. Updating pemohon...");
        console.log(`ID yang diterima: ${id}`);
        console.log(`Data yang diterima:`, options);

        // Update pemohon
        return await updatePemohon(id, options);
    } catch (error) {
        console.error(`Error handling PUT request: ${error}`);
        return { success: false, message: "Internal server error" };
    }
});

// Route to delete pemohon
pemohonRouter.delete('/:id', async (req) => {
    try {
        const { id } = req.params;
        // Log data yang diterima
        console.log(`Request received to delete pemohon with ID: ${id}`);
        return await deletePemohon(id);
    } catch (error) {
        console.error(`Error handling DELETE request: ${error}`);
        return { success: false, message: "Internal server error" };
    }
});

export default pemohonRouter;