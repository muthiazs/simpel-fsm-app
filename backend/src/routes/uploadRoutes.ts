import { Elysia } from "elysia";
import { uploadKTP, uploadKarpeg } from "../controllers/upload.controller";

export const uploadRoutes = new Elysia()
    .post("/upload/ktp", async (context) => uploadKTP(context as any))
    .post("/upload/karpeg", async (context) => uploadKarpeg(context as any));
