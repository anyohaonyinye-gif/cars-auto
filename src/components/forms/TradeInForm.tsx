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
  mileageField,
  optionalMoneyField,
  optionalText,
  phoneSchema,
  requiredText,
  yearField,
  zodFormResolver,
} from "@/lib/validation";

const schema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  make: requiredText("the make"),
  model: requiredText("the model"),
  year: yearField,
  mileage: mileageField,
  condition: z.string().min(1, "Choose a condition."),
  expectedPrice: optionalMoneyField,
  replacement: optionalText(120),
  notes: optionalText(2000),
  consent: consentSchema,
});

type FormValues = z.infer<typeof schema>;

export function TradeInForm() {
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
      make: "",
      model: "",
      year: "",
      mileage: "",
      condition: "",
      expectedPrice: "",
      replacement: "",
      notes: "",
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
            ["Enquiry", "Trade-in"],
            ["Name", values.fullName],
            ["Email", values.email],
            ["Phone", values.phone],
            ["Current vehicle", `${values.year} ${values.make} ${values.model}`],
            ["Mileage", `${values.mileage} km`],
            ["Condition described by customer", values.condition],
            ["Expected price (GHS)", values.expectedPrice],
            ["Preferred replacement", values.replacement],
            ["Notes", values.notes],
          ]),
        );
      })}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="trade-make" label="Current vehicle make" required error={errors.make?.message}>
          <TextInput id="trade-make" invalid={Boolean(errors.make)} {...register("make")} />
        </Field>
        <Field id="trade-model" label="Model" required error={errors.model?.message}>
          <TextInput id="trade-model" invalid={Boolean(errors.model)} {...register("model")} />
        </Field>
        <Field id="trade-year" label="Year" required error={errors.year?.message}>
          <TextInput id="trade-year" inputMode="numeric" invalid={Boolean(errors.year)} {...register("year")} />
        </Field>
        <Field id="trade-mileage" label="Mileage (km)" required error={errors.mileage?.message}>
          <TextInput id="trade-mileage" inputMode="numeric" invalid={Boolean(errors.mileage)} {...register("mileage")} />
        </Field>
      </div>
      <Field id="trade-condition" label="Condition" required error={errors.condition?.message}>
        <SelectInput id="trade-condition" invalid={Boolean(errors.condition)} {...register("condition")}>
          <option value="">Select</option>
          <option>Excellent</option>
          <option>Good</option>
          <option>Fair</option>
          <option>Needs attention</option>
        </SelectInput>
      </Field>
      <Field id="trade-price" label="Expected price (GHS)" error={errors.expectedPrice?.message} hint="Optional. This is not a guaranteed offer.">
        <TextInput id="trade-price" inputMode="numeric" invalid={Boolean(errors.expectedPrice)} {...register("expectedPrice")} />
      </Field>
      <Field id="trade-replacement" label="Preferred replacement vehicle" error={errors.replacement?.message}>
        <TextInput id="trade-replacement" {...register("replacement")} />
      </Field>
      <Field id="trade-name" label="Full name" required error={errors.fullName?.message}>
        <TextInput id="trade-name" autoComplete="name" invalid={Boolean(errors.fullName)} {...register("fullName")} />
      </Field>
      <Field id="trade-email" label="Email address" required error={errors.email?.message}>
        <TextInput id="trade-email" type="email" autoComplete="email" invalid={Boolean(errors.email)} {...register("email")} />
      </Field>
      <Field id="trade-phone" label="Phone number" required error={errors.phone?.message}>
        <TextInput id="trade-phone" type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} {...register("phone")} />
      </Field>
      <Field id="trade-notes" label="Additional notes" error={errors.notes?.message}>
        <TextArea id="trade-notes" {...register("notes")} />
      </Field>
      <Consent id="trade-consent" error={errors.consent?.message} {...register("consent")} />
      <Submit loading={demo.status === "submitting"} label="Submit trade-in enquiry" />
    </form>
  );
}
