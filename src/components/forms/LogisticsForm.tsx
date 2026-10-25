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
  requiredText,
  zodFormResolver,
} from "@/lib/validation";

const schema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  requirements: messageSchema,
  make: optionalText(),
  model: optionalText(),
  budget: requiredText("a budget", 40),
  origin: z.string().min(1, "Choose a country preference or no preference."),
  specifications: optionalText(2000),
  consent: consentSchema,
});

type FormValues = z.infer<typeof schema>;

export function LogisticsForm() {
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
      requirements: "",
      make: "",
      model: "",
      budget: "",
      origin: "",
      specifications: "",
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
            ["Enquiry", "Logistics and import"],
            ["Name", values.fullName],
            ["Email", values.email],
            ["Phone", values.phone],
            ["Requirements", values.requirements],
            ["Preferred make", values.make],
            ["Preferred model", values.model],
            ["Budget", values.budget],
            ["Country of origin preference", values.origin],
            ["Specifications", values.specifications],
          ]),
        );
      })}
    >
      <Field id="log-requirements" label="Vehicle requirements" required error={errors.requirements?.message}>
        <TextArea id="log-requirements" invalid={Boolean(errors.requirements)} {...register("requirements")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="log-make" label="Preferred make" error={errors.make?.message}>
          <TextInput id="log-make" {...register("make")} />
        </Field>
        <Field id="log-model" label="Preferred model" error={errors.model?.message}>
          <TextInput id="log-model" {...register("model")} />
        </Field>
      </div>
      <Field id="log-budget" label="Budget" required error={errors.budget?.message}>
        <TextInput id="log-budget" invalid={Boolean(errors.budget)} {...register("budget")} />
      </Field>
      <Field id="log-origin" label="Country of origin preference" required error={errors.origin?.message}>
        <SelectInput id="log-origin" invalid={Boolean(errors.origin)} {...register("origin")}>
          <option value="">Select</option>
          <option>No preference</option>
          <option>Japan</option>
          <option>United States</option>
          <option>Europe</option>
          <option>United Arab Emirates</option>
          <option>Other</option>
        </SelectInput>
      </Field>
      <Field id="log-specs" label="Desired specifications" error={errors.specifications?.message}>
        <TextArea id="log-specs" {...register("specifications")} />
      </Field>
      <Field id="log-name" label="Full name" required error={errors.fullName?.message}>
        <TextInput id="log-name" autoComplete="name" invalid={Boolean(errors.fullName)} {...register("fullName")} />
      </Field>
      <Field id="log-email" label="Email address" required error={errors.email?.message}>
        <TextInput id="log-email" type="email" autoComplete="email" invalid={Boolean(errors.email)} {...register("email")} />
      </Field>
      <Field id="log-phone" label="Phone number" required error={errors.phone?.message}>
        <TextInput id="log-phone" type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} {...register("phone")} />
      </Field>
      <Consent id="log-consent" error={errors.consent?.message} {...register("consent")} />
      <Submit loading={demo.status === "submitting"} label="Submit logistics enquiry" />
    </form>
  );
}
