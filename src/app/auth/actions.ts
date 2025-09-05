"use server";

import dbConnect from "@/lib/db-connect";
import User from "@/models/user.model";
import { z } from "zod";

// NOTE: This is a simplified example. In a real-world scenario,
// you would use a robust password hashing library like bcrypt.
// Storing plain text passwords is a major security risk.

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    college: z.string().min(2, "College name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
});

export async function registerUserAction(data: unknown) {
    // 1. Validate input data
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
        // Zod provides detailed error messages, let's use them.
        const errorMessage = parsed.error.errors.map(e => e.message).join(", ");
        return { success: false, message: `Invalid input: ${errorMessage}` };
    }

    try {
        // 2. Connect to the database
        await dbConnect();

        // 3. Check for existing user
        const existingUser = await User.findOne({ email: parsed.data.email });
        if (existingUser) {
            return { success: false, message: "An account with this email already exists." };
        }
        
        // 4. Create and save the new user
        // In a real app, hash the password before saving
        const newUser = new User(parsed.data);
        await newUser.save();
        
        // 5. Return success response
        return { success: true, message: "Registration successful. You can now log in." };

    } catch (error) {
        console.error("Registration Error:", error);
        if (error instanceof Error) {
            return { success: false, message: `Server Error: ${error.message}` };
        }
        return { success: false, message: "An unexpected server error occurred during registration." };
    }
}


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function loginUserAction(data: unknown) {
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
        return { success: false, message: "Invalid input." };
    }
    
    try {
        await dbConnect();
        const user = await User.findOne<{ password: string; name: string; college: string; email: string }>({ email: parsed.data.email }).select('+password');

        if (!user || user.password !== parsed.data.password) {
             return { success: false, message: "Invalid email or password." };
        }
        
        // Important: Do not send the password back to the client
        const userProfile = {
            name: user.name,
            college: user.college,
            email: user.email
        };
        
        return { success: true, user: userProfile };

    } catch (error) {
        console.error("Login Error:", error);
        if (error instanceof Error) {
          return { success: false, message: `Server Error: ${error.message}` };
        }
        return { success: false, message: "An unexpected error occurred during login." };
    }
}
