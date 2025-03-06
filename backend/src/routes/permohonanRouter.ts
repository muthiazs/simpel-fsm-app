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
    { type: "multipart" }
);


// Update permohonan by ID (requires authentication)
permohonanRouter.patch('/:id', authMiddleware(async ({ params: { id }, body }) => {
    try {
        const data = body as {
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
        };
        return await updatePermohonan(id, data);
    } catch (error) {
        console.error(`Error updating permohonan: ${error}`);
        return { success: false, message: 'Internal server error' };
    }
}));

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