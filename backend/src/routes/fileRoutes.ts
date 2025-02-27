import { Elysia } from "elysia";
import { getFileUrl } from "../controllers/file.controller";

const fileRouter = new Elysia()
  .get("/get-file-url", async ({ query }) => {
    const { bucket, filePath } = query;
    if (!bucket || !filePath) return { error: "Bucket dan file path diperlukan" };

    try {
      const url = await getFileUrl(bucket, filePath);
      return { url };
    } catch (error) {
      return { error: "Gagal mendapatkan signed URL" };
    }
  });

export default fileRouter;
