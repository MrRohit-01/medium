import z from "zod";
export declare const Signup: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export type SignupType = z.infer<typeof Signup>;
export declare const Signin: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninType = z.infer<typeof Signin>;
export declare const Post: z.ZodObject<{
    title: z.ZodString;
    context: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    context: string;
}, {
    title: string;
    context: string;
}>;
export declare const Put: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    context: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    context: string;
    id: string;
}, {
    title: string;
    context: string;
    id: string;
}>;
export type PostType = z.infer<typeof Post>;
export type PutType = z.infer<typeof Put>;
