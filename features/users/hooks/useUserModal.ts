import { userFormSchema, UserType } from "../types/user-schema";
import { create } from "zustand";
type Mode = "create" | "update";

type UserModalStore = {
    open: boolean;
    mode: Mode;
    data: UserType;
    userId?: string;

    setOpen: (value: boolean) => void;
    openCreate: () => void;
    openUpdate: (data: UserType & { _id: string }) => void;
    close: () => void;
    updateData: (data: Partial<UserType>) => void;
    validate: () => { success: boolean; errors?: any };
};


function getRandomShortDescription() {
    const descriptions = [
        "Fast and reliable solution",
        "Designed for modern users",
        "Built with performance in mind",
        "Simple, smart and efficient",
        "A powerful digital experience",
        "Clean, smooth and responsive",
        "Made for everyday productivity",
        "Next-generation smart tool",
        "Optimized for best results",
        "Lightweight and user friendly",
        "Perfect for daily use",
        "Crafted with precision",
        "Smart, secure and fast",
        "High quality digital product",
        "Minimal yet powerful"
    ]

    const randomIndex = Math.floor(Math.random() * descriptions.length)
    return descriptions[randomIndex]
}

export const useUserModal = create<UserModalStore>((set, get) => ({
    open: false,
    mode: "create" as Mode,
    data: {
        name: '',
        username: '',
        email: '',
        gender: '',
        address: {
            street: '',
            suite: `Suite ${Math.floor(1000 + Math.random() * 9000)}`,
            city: '',
            zipcode: '',
            geo: {
                lat: '',
                lng: '',
            },
        },
        phone: '',
        website: '',
        company: {
            name: '',
            catchPhrase: getRandomShortDescription(),
            bs: getRandomShortDescription(),
        },
    } as UserType,
    userId: undefined,

    setOpen: (value) => set({ open: value }),

    openCreate: () => {
        set((state) => ({
            open: true,
            mode: "create",
            data: state.data,
        }))
    },
    openUpdate: (data) =>
        set({
            open: true,
            mode: "update",
            data: data as UserType,
            userId: data._id,
        }),

    close: () =>
        set((state) => ({
            open: false,
            data: state.data,
            userId: undefined,
        })),

    updateData: (newData) =>
        set((state) => ({
            data: {
                ...state.data,
                ...newData,
            } as UserType,
        })),

    validate: () => {
        const data = get().data;

        if (!data) return { success: false };

        const result = userFormSchema.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                errors: result.error.format(),
            };
        }

        return { success: true };
    },
}));
