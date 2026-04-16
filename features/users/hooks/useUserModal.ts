import { userFormSchema, UserType } from "../types/user-schema";
import { useModal } from "@/hooks/use-modal";

type Mode = "create" | "update";

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

const INITIAL_DATA: UserType = {
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
};

export function useUserModal() {
    const { modal, isOpen, openModal, closeModal, updateModal } = useModal("User");

    const mode = (modal?.mode as Mode) || "create";
    const data = (modal?.data as UserType) || INITIAL_DATA;
    const userId = modal?.userId as string | undefined;

    const openCreate = () => {
        openModal({
            mode: "create",
            data: INITIAL_DATA,
        });
    };

    const openUpdate = (updateData: UserType & { _id: string }) => {
        openModal({
            mode: "update",
            data: updateData as UserType,
            userId: updateData._id,
        });
    };

    const close = () => closeModal();

    const updateData = (newData: Partial<UserType>) => {
        updateModal({
            data: {
                ...data,
                ...newData,
            } as UserType,
        });
    };

    const validate = () => {
        if (!data) return { success: false };

        const result = userFormSchema.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                errors: result.error.format(),
            };
        }

        return { success: true };
    };

    return {
        open: isOpen,
        mode,
        data,
        userId,
        setOpen: (value: boolean) => {
            if (value) openCreate();
            else close();
        },
        openCreate,
        openUpdate,
        close,
        updateData,
        validate,
    };
}
