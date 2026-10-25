import { z } from "zod";
import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";

export const fullNameSchema = z
  .string()
  .trim()
  .min(2, "Enter your full name.")
  .max(80, "Name must be 80 characters or fewer.");

export const emailSchema = z.string().trim().email("Enter a valid email address.");

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9][0-9\s()-]{8,18}$/, "Enter a valid phone number.");

export const messageSchema = z
  .string()
  .trim()
  .min(20, "Enter at least 20 characters so the team can understand the enquiry.")
  .max(2000, "Message must be 2,000 characters or fewer.");

export const consentSchema = z
  .boolean()
  .refine((value) => value, "Please confirm that Cars Auto may use these details to respond.");

export const optionalText = (max = 120) =>
  z.string().trim().max(max, `Use ${max} characters or fewer.`);

export const requiredText = (label: string, max = 80) =>
  z.string().trim().min(2, `Enter ${label}.`).max(max, `Use ${max} characters or fewer.`);

export const yearField = z
  .string()
  .trim()
  .regex(/^(19|20)\d{2}$/, "Enter a four-digit model year.")
  .refine(
    (value) => Number(value) <= new Date().getFullYear() + 1,
    "Enter a model year that is not further ahead than next year.",
  );

export const mileageField = z
  .string()
  .trim()
  .regex(/^\d+$/, "Enter mileage as a whole number of kilometres.")
  .refine((value) => Number(value) <= 1_000_000, "Enter a mileage of 1,000,000 km or less.");

export const optionalMoneyField = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^\d+$/.test(value),
    "Enter a whole number in Ghanaian cedis, or leave this blank.",
  );

export function zodFormResolver<T extends FieldValues>(schema: z.ZodType<T>): Resolver<T> {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "");
      if (field && !errors[field]) {
        errors[field] = { type: issue.code, message: issue.message };
      }
    }

    return {
      values: {} as never,
      errors: errors as FieldErrors<T>,
    };
  };
}
