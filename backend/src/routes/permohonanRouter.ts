import { Elysia } from 'elysia';
import {
    getPermohonan,
    getPermohonanById,
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

// Route untuk mendapatkan semua permohonan
permohonanRouter.get('/', authMiddleware(async () => {
    try {
        const response = await getPermohonan();
        return response;
    } catch (error) {
        console.error(`Error fetching permohonan: ${error}`);
        return { success: false, message: 'Internal server error' };
    }
}));

// Route untuk mendapatkan permohonan berdasarkan ID
permohonanRouter.get('/:id', authMiddleware(async (req) => {
    const { id } = req.params;
    try {
        const response = await getPermohonanById(id);
        return response;
    } catch (error) {
        console.error(`Error fetching permohonan by ID: ${error}`);
        return { success: false, message: 'Internal server error' };
    }
}));

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
