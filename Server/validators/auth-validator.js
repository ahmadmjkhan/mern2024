const { z } = require("zod");

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email Is Required" })
        .trim()
        .min(3, { message: "Email Must be 3 chars" })
        .max(255, { message: "Email Not More than 255" }),
    password: z
        .string({ required_error: "Password Is Required" })
        .trim()
        .min(3, { message: "Password Must be 3 chars" })
        .max(50, { message: "Password Not More than 255" }),
});


const signupSchema = loginSchema.extend({

    username: z
        .string({ required_error: "Name Is Required" })
        .trim()
        .min(3, { message: "Name Must be 3 chars" })
        .max(255, { message: "Not More than 255" }),

    phone: z
        .string({ required_error: "Name Is Required" })
        .trim()
        .min(3, { message: "Phone Must be 3 chars" })
        .max(10, { message: "Phone Not More than 255" }),
});

module.exports = { signupSchema, loginSchema };