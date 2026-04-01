import { os } from "@orpc/server";

export const base = os.$context<{ request: Request }>().errors({
    RATE_LIMIT_EXCEEDED: { message: "You have been rate limited" },
    FORBIDDEN: { message: "You do not have access to this resource" },
    NOT_FOUND: { message: "The requested resource was not found" },
    BAD_REQUEST: { message: "The request was invalid" },
    INTERNAL_SERVER_ERROR: { message: "Something went wrong on the server" },
    UNAUTHORIZED: { message: "You are not authorized to access this resource" },
})