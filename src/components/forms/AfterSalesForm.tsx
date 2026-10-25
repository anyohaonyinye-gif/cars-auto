"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Consent, Submit } from "@/components/forms/ContactForm";
import { DemoFormSuccess } from "@/components/forms/DemoFormSuccess";
import { Field, SelectInput, TextArea, TextInput } from "@/components/forms/fields";
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

const schema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  category: z.string().min(1, "Choose an enquiry category."),
  vehicle: optionalText(120),
  message: messageSchema,
  consent: consentSchema,
});

type FormValues = z.infer<typeof schema>;

export function AfterSalesForm() {
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
      category: "",
      vehicle: "",
      message: "",
      consent: false,
    },
  });

  if (demo.status === "success") return <DemoFormSuccess message={demo.summary} onEdit={demo.edit} />;

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await demo.complete(
          enquiryWhatsAppMessage([
            ["Enquiry", "After-sales support"],
            ["Name", values.fullName],
            ["Email", values.email],
            ["Phone", values.phone],
            ["Category", values.category],
            ["Vehicle", values.vehicle],
            ["Message", values.message],
          ]),
        );
      })}
    >
      <Field id="after-category" label="Enquiry category" required error={errors.category?.message}>
        <SelectInput id="after-category" invalid={Boolean(errors.category)} {...register("category")}>
          <option value="">Select</option>
          <option>Servicing question</option>
          <option>Parts enquiry</option>
          <option>Ownership support</option>
          <option>Other</option>
        </SelectInput>
      </Field>
      <Field id="after-vehicle" label="Vehicle" error={errors.vehicle?.message} hint="Make, model, and year if you have them.">
        <TextInput id="after-vehicle" {...register("vehicle")} />
      </Field>
      <Field id="after-message" label="Message" required error={errors.message?.message}>
        <TextArea id="after-message" invalid={Boolean(errors.message)} {...register("message")} />
      </Field>
      <Field id="after-name" label="Full name" required error={errors.fullName?.message}>
        <TextInput id="after-name" autoComplete="name" invalid={Boolean(errors.fullName)} {...register("fullName")} />
      </Field>
      <Field id="after-email" label="Email address" required error={errors.email?.message}>
        <TextInput id="after-email" type="email" autoComplete="email" invalid={Boolean(errors.email)} {...register("email")} />
      </Field>
      <Field id="after-phone" label="Phone number" required error={errors.phone?.message}>
        <TextInput id="after-phone" type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} {...register("phone")} />
      </Field>
      <Consent id="after-consent" error={errors.consent?.message} {...register("consent")} />
      <Submit loading={demo.status === "submitting"} label="Submit support enquiry" />
    </form>
  );
}
