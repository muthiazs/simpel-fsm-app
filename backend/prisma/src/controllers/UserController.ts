// Import prisma client
import prisma from "../../client";

/**
 * Mendapatkan semua user
 */
export async function getUser() {
    try {
        const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });

        return {
            success: true,
            message: "List Data Users!",
            data: users,
        };
    } catch (error) {
        console.error(`Error getting users: ${error}`);
        return { success: false, message: "Error fetching users" };
    }
}
