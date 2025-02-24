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
        where: { id_user : user?.id }, // yang sudah terverifikasi
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
            prodi: true, // Include the new field
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
pemohonRouter.patch('/', async (context) => {
    return authMiddleware(async (ctx) => {
        try {
            if (!ctx.user || !ctx.user.id) {
                return { success: false, message: "User not found" };
            }

            const userId = ctx.user.id;
            const options = ctx.body as { 
                nama?: string, 
                nik?: string, 
                jabatan?: string, 
                pangkatgol?: string, 
                nopaspor?: string, 
                nohp?: string, 
                filektp?: string,  // Pastikan ini bisa menangani path file yang di-upload
                filekarpeg?: string, 
                prodi?: string 
            };

            console.log("Request received with data:", options);

            // Jika ada filektp atau filekarpeg, pastikan formatnya benar (string path file)
            if (options.filektp && typeof options.filektp !== "string") {
                return { success: false, message: "Invalid filektp format" };
            }
            if (options.filekarpeg && typeof options.filekarpeg !== "string") {
                return { success: false, message: "Invalid filekarpeg format" };
            }

            // Periksa apakah ada setidaknya satu field yang akan diupdate
            if (Object.keys(options).length === 0) {
                return { success: false, message: "At least one field is required to update" };
            }

            console.log("Fields are present. Updating pemohon...");
            console.log("Data yang diterima:", options);

            // ✅ Panggil function untuk update data pemohon
            return await updatePemohon(userId.toString(), options);
        } catch (error) {
            console.error(`Error handling PATCH request: ${error}`);        
            return { success: false, message: "Internal server error" };
        }
    })(context);
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