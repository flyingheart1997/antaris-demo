
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
        suite: z.string().min(2, "Suite is required"),
        zipcode: z
            .string()
            .regex(/^\d{5,6}$/, "Zipcode must be 5 or 6 digits"),

        geo: z.object({
            lat: z
                .string()
                .regex(/^[-+]?\d+(\.\d+)?$/, "Invalid latitude"),
            lng: z
                .string()
                .regex(/^[-+]?\d+(\.\d+)?$/, "Invalid longitude"),
        }),
    }),

    phone: z
        .string()
        .regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone number"),

    website: z.string("Invalid website URL"),
    company: z.object({
        name: z.string().min(2, "Company name is required"),
        catchPhrase: z.string().min(2, "Catch phrase is required"),
        bs: z.string().min(2, "BS is required"),
    }),
});

export type UserType = z.infer<typeof userFormSchema>;
