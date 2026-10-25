"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { modificationCategories } from "@/data/services";
import { Consent, Submit } from "@/components/forms/ContactForm";
import { DemoFormSuccess } from "@/components/forms/DemoFormSuccess";
import { Field, TextArea, TextInput } from "@/components/forms/fields";
import { useDemoSubmit } from "@/components/forms/useDemoSubmit";
import { enquiryWhatsAppMessage } from "@/lib/contactLinks";
import {
  consentSchema,
  emailSchema,
  fullNameSchema,
  messageSchema,
  optionalText,
  phoneSchema,
  zodFormResolver,
} from "@/lib/validation";

const categoryShape = Object.fromEntries(modificationCategories.map((item) => [item.value, z.boolean()])) as Record<
  (typeof modificationCategories)[number]["value"],
  z.ZodBoolean
>;

const schema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  vehicle: optionalText(120),
  categories: z
    .object(categoryShape)
    .refine((value) => Object.values(value).some(Boolean), "Select at least one enquiry category."),
  notes: messageSchema,
  consent: consentSchema,
});

type FormValues = z.infer<typeof schema>;

const defaultCategories = Object.fromEntries(modificationCategories.map((item) => [item.value, false])) as FormValues["categories"];

export function ModificationForm() {
  const demo = useDemoSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodFormResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      vehicle: "",
      categories: defaultCategories,
      notes: "",
      consent: false,
    },
  });

  const categoryError = (errors.categories as { message?: string } | undefined)?.message;

  if (demo.status === "success") return <DemoFormSuccess message={demo.summary} onEdit={demo.edit} />;

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        const selected = modificationCategories
          .filter((item) => values.categories[item.value])
          .map((item) => item.label)
          .join(", ");
        await demo.complete(
          enquiryWhatsAppMessage([
            ["Enquiry", "Vehicle modification"],
            ["Name", values.fullName],
            ["Email", values.email],
            ["Phone", values.phone],
            ["Vehicle", values.vehicle],
            ["Categories", selected],
            ["Notes", values.notes],
          ]),
        );
      })}
    >
      <fieldset>
        <legend className="text-sm font-medium">
          Enquiry categories <span className="text-danger">*</span>
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {modificationCategories.map((item) => (
            <label key={item.value} className="flex min-h-11 items-center gap-3 rounded-xl border border-line px-3 text-sm">
              <input type="checkbox" className="h-4 w-4 accent-ink" {...register(`categories.${item.value}`)} />
              {item.label}
            </label>
          ))}
        </div>
        {categoryError ? (
          <p className="mt-2 text-sm text-danger" role="alert">
            {categoryError}
          </p>
        ) : null}
      </fieldset>
      <Field id="mod-vehicle" label="Vehicle" error={errors.vehicle?.message}>
        <TextInput id="mod-vehicle" {...register("vehicle")} />
      </Field>
      <Field id="mod-notes" label="What would you like to discuss?" required error={errors.notes?.message}>
        <TextArea id="mod-notes" invalid={Boolean(errors.notes)} {...register("notes")} />
      </Field>
      <Field id="mod-name" label="Full name" required error={errors.fullName?.message}>
        <TextInput id="mod-name" autoComplete="name" invalid={Boolean(errors.fullName)} {...register("fullName")} />
      </Field>
      <Field id="mod-email" label="Email address" required error={errors.email?.message}>
        <TextInput id="mod-email" type="email" autoComplete="email" invalid={Boolean(errors.email)} {...register("email")} />
      </Field>
      <Field id="mod-phone" label="Phone number" required error={errors.phone?.message}>
        <TextInput id="mod-phone" type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} {...register("phone")} />
      </Field>
      <Consent id="mod-consent" error={errors.consent?.message} {...register("consent")} />
      <Submit loading={demo.status === "submitting"} label="Submit modification enquiry" />
    </form>
  );
}
