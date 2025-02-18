import prisma from '../../prisma/client';

/**
 * Get all users
 */
export async function getUsers() {
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

/**
 * Creating a user
 */
export async function createUser(options: { username: string, email: string, password: string }) {
    try {
        const { username, email, password } = options;

        // Buat user menggunakan Prisma
        const user = await prisma.user.create({
            data: {
                username: username, // Jangan lupa untuk menyertakan username
                email: email,
                password: password,
                role: 'PEMOHON', // Add the role property
            },
        });

         // Log setelah user berhasil dibuat
         console.log("User successfully created:", user);

        return {
            success: true,
            message: "User Created Successfully!",
            data: user,
        };
    } catch (e: unknown) {
        console.error(`Error creating user: ${e}`);
        return { success: false, message: "Error creating user" };
    }
}

/**
 * Get user by id
 */
export async function getUserById(id: string) {
    try {
        // Convert id to number and validate
        const userId = parseInt(id);
        console.log(`ID received in getUserById: ${id}`);
        if (isNaN(userId)) {
            return {
                success: false,
                message: "Invalid user ID format",
                data: null,
            };
        }

        // Get user by id
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        // If user not found
        if (!user) {
            return {
                success: false, // Set to false to indicate failure
                message: "User not found!",
                data: null,
            };
        }

        // Return response json
        return {
            success: true,
            message: `User details for ID: ${id}`,
            data: user,
        };
    } catch (e: unknown) {
        console.error(`Error finding user: ${e}`);
        return { success: false, message: "Error fetching user" };
    }
}
/* Updating a post */
/**
 * Updating a user
 */
export async function updateUser(id: string, options: { username?: string; email?: string; password?: string }) {
    try {
        // Convert id to number and validate
        const userId = parseInt(id);
        if (isNaN(userId)) {
            return {
                success: false,
                message: "Invalid user ID format",
                data: null,
            };
        }

        // Get fields to update
        const { username, email, password } = options;

        // Update user with prisma
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(username ? { username } : {}),
                ...(email ? { email } : {}),
                ...(password ? { password } : {}),
            },
        });

        // Return response json
        return {
            success: true,
            message: "User Updated Successfully!",
            data: user,
        };
    } catch (e: unknown) {
        console.error(`Error updating user: ${e}`);
        return { success: false, message: "Error updating user" };
    }
}

/**
 * Deleting a user
 */
export async function deleteUser(id: string) {
    try {
        // Convert id to number and validate
        const userId = parseInt(id);
        if (isNaN(userId)) {
            return {
                success: false,
                message: "Invalid user ID format",
            };
        }

        // Delete user with prisma
        await prisma.user.delete({
            where: { id: userId },
        });

        // Return response json
        return {
            success: true,
            message: "User Deleted Successfully!",
        };
    } catch (e: unknown) {
        console.error(`Error deleting user: ${e}`);
        return { success: false, message: "Error deleting user" };
    }
}

