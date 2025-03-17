import { Elysia } from 'elysia';
import {
    getPermohonan,
    getPermohonanById,
    getPermohonanByUserId,
    createPermohonan,
    updatePermohonan,
    deletePermohonan
} from '../controllers/permohonan.controller';
import { cors } from '@elysiajs/cors';
import { authMiddleware } from '../middleware/authMiddleware';
import { PermohonanStatus } from "@prisma/client"; // Pastikan enum diambil dari Prisma

// Create router for permohonan
const permohonanRouter = new Elysia({ prefix: '/permohonan' });

// Enable CORS middleware
permohonanRouter.use(cors());

// Endpoint untuk mengambil permohonan berdasarkan id_user
permohonanRouter.get('/user/:id_user', async ({ params }) => {
    const { id_user } = params;
    console.log("mengambil data permohonan dengan id_user" , id_user)
    return await getPermohonanByUserId(Number(id_user));
});

// Get permohonan by ID
permohonanRouter.get('/:id', async ({ params: { id } }) => {
    console.log(`Fetching permohonan with ID: ${id}`);
    return await getPermohonanById(id);
});

// Get all permohonan
permohonanRouter.get('/', async () => {
    return await getPermohonan();
});



// Create new permohonan (requires authentication)
permohonanRouter.post(
    "/",
    authMiddleware(async ({ body }) => {
        try {
            if (!body) {
                return { success: false, message: "Invalid request body" };
            }

            const {
                id_user,
                negaratujuan,
                instansitujuan,
                keperluan,
                tglmulai,
                tglselesai,
                biaya,
                rencana,
                undangan,
                agenda,
                tor,
            } = body as Record<string, any>;

            if (!undangan || !agenda || !tor) {
                return { success: false, message: "All files are required" };
            }

            return await createPermohonan({
                id_user: Number(id_user),
                negaratujuan,
                instansitujuan,
                keperluan,
                tglmulai,
                tglselesai,
                biaya,
                rencana,
                undangan,
                agenda,
                tor,
            });
        } catch (error) {
            console.error(`Error creating permohonan: ${error}`);
            return { success: false, message: "Internal server error" };
        }
    }),

);


// Update permohonan by ID (requires authentication)
permohonanRouter.patch('/:id', async (context) => {
    return authMiddleware(async (ctx) => {
        try {
            if (!ctx.user || !ctx.user.id) {
                return { success: false, message: "User not found" };
            }

            const { id } = ctx.params;
            const formData = ctx.body as {
                id_pemohon?: number;
                negaratujuan?: string;
                instansitujuan?: string;
                keperluan?: string;
                tglmulai?: Date;
                tglselesai?: Date;
                biaya?: string;
                rencana?: string;
                undangan?: File; // ✅ Ubah ke tipe File
                agenda?: File; // ✅ Ubah ke tipe File
                tor?: File; // ✅ Ubah ke tipe File
                status?: string;
            };

            console.log("Request received with data:", formData);

            if (Object.keys(formData).length === 0) {
                return { success: false, message: "At least one field is required to update" };
            }

            // ✅ Validasi status jika ada
            if (formData.status) {
                if (!Object.values(PermohonanStatus).includes(formData.status as PermohonanStatus)) {
                    return { success: false, message: "Invalid status value" };
                }
            }

            console.log("Fields are present. Updating permohonan...");

            return await updatePermohonan(id, formData);
        } catch (error) {
            console.error(`Error handling PATCH request: ${error}`);
            return { success: false, message: "Internal server error" };
        }
    })(context);
});

// Delete permohonan by ID (requires authentication)
permohonanRouter.delete('/:id', authMiddleware(async ({ params: { id } }) => {
    try {
        return await deletePermohonan(id);
    } catch (error) {
        console.error(`Error deleting permohonan: ${error}`);
        return { success: false, message: 'Internal server error' };
    }
}));

export default permohonanRouter;