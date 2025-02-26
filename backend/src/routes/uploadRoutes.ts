import { Elysia } from "elysia";
import { UploadController } from "../controllers/upload.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const uploadRouter = new Elysia();

// 2. Update the upload router to use the same authentication as pemohon:
uploadRouter.post("/upload", async (context) => {
    return authMiddleware(async (ctx) => {
        // Pastikan request berisi file dalam format FormData
        if (!ctx.body || !(ctx.body as any).file) {
            return {
                success: false,
                message: "No file uploaded",
            };
        }

        const file = (ctx.body as any).file;
        return await UploadController.uploadFile({ file });
    })(context);
}, { type: "multipart" });

export default uploadRouter;
