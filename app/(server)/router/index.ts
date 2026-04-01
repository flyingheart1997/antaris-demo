import { createuser, deleteuser, getuser, listusers, updateuser } from "./user";

export const router = {
    user: {
        list: listusers,
        details: getuser,
        create: createuser,
        update: updateuser,
        delete: deleteuser
    },
    mission: {}
}