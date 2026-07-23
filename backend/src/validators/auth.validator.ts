import { z } from "zod";


// ===============================
// REGISTER VALIDATION
// ===============================

export const registerSchema = z.object({

  name: z
    .string()
    .min(
      3,
      "Name must be at least 3 characters"
    ),


  email: z
    .string()
    .email(
      "Invalid email"
    ),


  phone: z
    .string()
    .min(
      10,
      "Phone number is required"
    ),


  password: z
    .string()
    .min(
      6,
      "Password must be at least 6 characters"
    ),

});




// ===============================
// LOGIN VALIDATION
// ===============================

export const loginSchema = z.object({

  email: z
    .string()
    .email(
      "Invalid email"
    ),


  password: z
    .string()
    .min(
      6,
      "Password must be at least 6 characters"
    ),

});




// ===============================
// FORGOT PASSWORD
// ===============================

export const forgotPasswordSchema = z.object({

  email: z
    .string()
    .email(
      "Invalid email"
    ),

});




// ===============================
// RESET PASSWORD
// ===============================

export const resetPasswordSchema = z.object({

  password: z
    .string()
    .min(
      6,
      "Password must be at least 6 characters"
    ),

});