"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Consent, Submit } from "@/components/forms/ContactForm";
import { DemoFormSuccess } from "@/components/forms/DemoFormSuccess";
import { Field, SelectInput, TextArea, TextInput } from "@/components/forms/fields";
import { useDemoSubmit } from "@/components/forms/useDemoSubmit";
import { enquiryWhatsAppMessage } from "@/lib/contactLinks";
import { getBodyFilters, getFuelTypes, getTransmissions } from "@/lib/vehicleUtils";
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
  make: optionalText(),
  model: optionalText(),
  budget: requiredText("a budget", 40),
  bodyType: z.string().min(1, "Choose a vehicle type."),
  transmission: z.string(),
  fuelType: z.string(),
  intendedUse: requiredText("the intended use", 160),
  specifications: messageSchema,
  consent: consentSchema,
});

type FormValues = z.infer<typeof schema>;

export function VehicleSelectionForm() {
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
      budget: "",
      bodyType: "",
      transmission: "",
      fuelType: "",
      intendedUse: "",
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
            ["Enquiry", "Vehicle selection and sourcing"],
            ["Name", values.fullName],
            ["Email", values.email],
            ["Phone", values.phone],
            ["Make", values.make],
            ["Model", values.model],
            ["Budget", values.budget],
            ["Vehicle type", values.bodyType],
            ["Transmission", values.transmission],
            ["Fuel type", values.fuelType],
            ["Intended use", values.intendedUse],
            ["Other specifications", values.specifications],
          ]),
        );
      })}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="select-make" label="Preferred make" error={errors.make?.message}>
          <TextInput id="select-make" {...register("make")} />
        </Field>
        <Field id="select-model" label="Preferred model" error={errors.model?.message}>
          <TextInput id="select-model" {...register("model")} />
        </Field>
      </div>
      <Field id="select-budget" label="Budget" required error={errors.budget?.message} hint="For example, up to GHS 250,000. This is a preference, not a quote.">
        <TextInput id="select-budget" invalid={Boolean(errors.budget)} {...register("budget")} />
      </Field>
      <Field id="select-body" label="Vehicle type" required error={errors.bodyType?.message}>
        <SelectInput id="select-body" invalid={Boolean(errors.bodyType)} {...register("bodyType")}>
          <option value="">Select</option>
          {getBodyFilters().map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </SelectInput>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="select-transmission" label="Transmission" error={errors.transmission?.message}>
          <SelectInput id="select-transmission" {...register("transmission")}>
            <option value="">No preference</option>
            {getTransmissions().map((item) => (
              <option key={item}>{item}</option>
            ))}
          </SelectInput>
        </Field>
        <Field id="select-fuel" label="Fuel type" error={errors.fuelType?.message}>
          <SelectInput id="select-fuel" {...register("fuelType")}>
            <option value="">No preference</option>
            {getFuelTypes().map((item) => (
              <option key={item}>{item}</option>
            ))}
          </SelectInput>
        </Field>
      </div>
      <Field id="select-use" label="Intended use" required error={errors.intendedUse?.message}>
        <TextInput id="select-use" invalid={Boolean(errors.intendedUse)} {...register("intendedUse")} />
      </Field>
      <Field id="select-specs" label="Other specifications" required error={errors.specifications?.message}>
        <TextArea id="select-specs" invalid={Boolean(errors.specifications)} {...register("specifications")} />
      </Field>
      <Field id="select-name" label="Full name" required error={errors.fullName?.message}>
        <TextInput id="select-name" autoComplete="name" invalid={Boolean(errors.fullName)} {...register("fullName")} />
      </Field>
      <Field id="select-email" label="Email address" required error={errors.email?.message}>
        <TextInput id="select-email" type="email" autoComplete="email" invalid={Boolean(errors.email)} {...register("email")} />
      </Field>
      <Field id="select-phone" label="Phone number" required error={errors.phone?.message}>
        <TextInput id="select-phone" type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} {...register("phone")} />
      </Field>
      <Consent id="select-consent" error={errors.consent?.message} {...register("consent")} />
      <Submit loading={demo.status === "submitting"} label="Submit vehicle request" />
    </form>
  );
}
