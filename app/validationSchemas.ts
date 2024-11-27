import { z } from "zod";

export const accountOperationSchema = z.object({
  generalAccountId: z.string().min(1, "generalAccountId is required.").max(255),
  tiereAccountId: z.string().max(255).optional().default(""),
  date: z.string().datetime().or(z.string()).optional(),
  debitSold: z.coerce.number().gte(0).default(0),
  creditSold: z.coerce.number().gte(0).default(0),
  lebelle: z.string().max(255).optional().default(""),
});

export const generalAccountSchema = z.object({
  name: z.string().min(3, "Name is required.").max(255),
  debitSold: z.coerce.number().gte(0).default(0),
  creditSold: z.coerce.number().gte(0).default(0),
});

export const productOperationSchema = z.object({
  productId: z.string().min(1, "productId is required.").max(255),
  date: z.string().datetime().or(z.string()).optional(),
  unitPrice: z.coerce.number().optional(),
  purchaseQuantity: z.coerce.number(),
  purchasePrice: z.coerce.number(),
  saleQuantity: z.coerce.number(),
  salePrice: z.coerce.number(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required.").max(255),
  unit: z.string().min(1, "unit is required.").max(255),
  stock: z.coerce.number().gte(0).default(0),
  purchasePrice: z.coerce.number().gte(0).default(0),
});

export const tiereAccountSchema = z.object({
  generalAccountId: z.string().min(1, "generalAccountId is required.").max(255),
  name: z.string().min(3, "Name is required.").max(255),
  debitSold: z.coerce.number().gte(0).default(0),
  creditSold: z.coerce.number().gte(0).default(0),
  email: z.string().email().or(z.literal("")).optional().nullable(),
  address: z.string().min(3).max(65535).or(z.literal("")).optional().nullable(),
  phone: z.string().min(8).max(255).or(z.literal("")).optional().nullable(),
});

export const registerUserSchema = z
  .object({
    username: z.string().min(3, "username is required.").max(50),
    email: z.string().email("email is required.").max(200),
    password: z.string().min(8, "password is required.").max(800),
    confirmPassword: z.string().min(8, "conform password").max(800),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dosn't match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    email: z.string().email("email is required.").max(200),
    password: z.string().min(8, "password is required.").max(800),
    newPassword: z.string().min(8, "new password is required.").max(800),
    confirmNewPassword: z
      .string()
      .min(8, "confirm new password is required.")
      .max(800),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password dosn't match",
    path: ["confirmNewPassword"],
  });
