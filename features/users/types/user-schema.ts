
import { z } from "zod";

export const userFormSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long"),

    username: z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must be at most 20 characters long")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),

    email: z.email("Invalid email address"),

    gender: z.string().min(4, "Gender is required"),

    address: z.object({
        street: z.string().min(2, "Street is required"),
        city: z.string().min(2, "City is required"),
        suite: z.string().optional().default("Suite 100"),
        zipcode: z
            .string()
            .regex(/^\d{5,6}$/, "Zipcode must be 5 or 6 digits"),

        geo: z.object({
            lat: z.string().optional().default("0"),
            lng: z.string().optional().default("0"),
        }).optional().default({ lat: "0", lng: "0" }),
    }),

    phone: z
        .string()
        .regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone number"),

    website: z.string().optional().default("example.com"),
    company: z.object({
        name: z.string().min(2, "Company name is required"),
        catchPhrase: z.string().optional().default("Leading the way"),
        bs: z.string().optional().default("Innovation"),
    }),
});

export type UserType = z.infer<typeof userFormSchema>;
