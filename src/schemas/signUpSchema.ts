import {z} from "zod";

export const signUpSchema = z.object({
    username:  z.string().min(2, 'Username too small').max(20, 'Username too big').regex(/^[a-ZA-Z0-9_]+$/, 'Username must not contain special Characters'),
    email: z.string().email({message: 'Invalid email Format'}),
    password: z.string().min(6, {message: 'must be of atleast 6 Characters'}),
})