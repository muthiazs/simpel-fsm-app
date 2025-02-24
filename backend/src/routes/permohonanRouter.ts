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

// Get permohonan by user ID (requires authentication)
permohonanRouter.get('/user', authMiddleware(async ({ user }) => {
    console.log(`Fetching permohonan for user ID: ${user.id}`);
    return await getPermohonanByUserId(user.id);
}));

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
permohonanRouter.post('/', authMiddleware(async ({ body }) => {
    try {
        const data = body as {
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
        };
        return await createPermohonan(data);
    } catch (error) {
        console.error(`Error creating permohonan: ${error}`);
        return { success: false, message: 'Internal server error' };
    }
}));

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