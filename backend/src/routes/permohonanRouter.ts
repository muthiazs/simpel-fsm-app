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

// Membuat router untuk permohonan
const permohonanRouter = new Elysia({ prefix: '/permohonan' });

// Middleware untuk mengaktifkan CORS
permohonanRouter.use(cors());

// 🔹 **1. GET /permohonan/user → Get berdasarkan id_user (Login)**
permohonanRouter.get('/user', authMiddleware(async (context) => {
    return await getPermohonanByUserId(context.user.id);
}));

// 🔹 **2. GET /permohonan/:id → Get berdasarkan id_permohonan**
permohonanRouter.get('/:id', async (req) => {
    return await getPermohonanById(req.params.id);
});

// 🔹 **3. GET /permohonan → Get semua permohonan (tanpa filter)**
permohonanRouter.get('/', async () => {
    return await getPermohonan();
});

// Route untuk membuat permohonan baru
permohonanRouter.post('/', authMiddleware(async (req) => {
    try {
        const data = req.body as { id_pemohon: number; negaratujuan: string; instansitujuan: string; keperluan: string; tglmulai: Date; tglselesai: Date; biaya: string; rencana: string; undangan: string; agenda: string; tor: string };
        const response = await createPermohonan(data);
        return response;
    } catch (error) {
        console.error(`Error creating permohonan: ${error}`);
        return { success: false, message: 'Internal server error' };
    }
}));

// Route untuk memperbarui permohonan berdasarkan ID
permohonanRouter.patch('/:id', authMiddleware(async (req) => {
    const { id } = req.params;
    try {
        const data = req.body as { id_pemohon?: number; negaratujuan?: string; instansitujuan?: string; keperluan?: string; tglmulai?: Date; tglselesai?: Date; biaya?: string; rencana?: string; undangan?: string; agenda?: string; tor?: string };
        const response = await updatePermohonan(id, data);
        return response;
    } catch (error) {
        console.error(`Error updating permohonan: ${error}`);
        return { success: false, message: 'Internal server error' };
    }
}));

// Route untuk menghapus permohonan berdasarkan ID
permohonanRouter.delete('/:id', authMiddleware(async (req) => {
    const { id } = req.params;
    try {
        const response = await deletePermohonan(id);
        return response;
    } catch (error) {
        console.error(`Error deleting permohonan: ${error}`);
        return { success: false, message: 'Internal server error' };
    }
}));

export default permohonanRouter;
