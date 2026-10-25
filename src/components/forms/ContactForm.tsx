"use client";

import type { InputHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { enquirySubjects } from "@/config/site";
import { vehicles } from "@/data/vehicles";
import { DemoFormSuccess } from "@/components/forms/DemoFormSuccess";
import { Field, SelectInput, TextArea, TextInput } from "@/components/forms/fields";
import { useDemoSubmit } from "@/components/forms/useDemoSubmit";
import { enquiryWhatsAppMessage } from "@/lib/contactLinks";
import { vehicleTitle } from "@/lib/vehicleUtils";
import {
  consentSchema,
  emailSchema,
  fullNameSchema,
  messageSchema,
  phoneSchema,
  zodFormResolver,
} from "@/lib/validation";

const subjectValues = enquirySubjects.map((subject) => subject.value) as [
  (typeof enquirySubjects)[number]["value"],
  ...(typeof enquirySubjects)[number]["value"][],
];

const schema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: z.enum(subjectValues, { message: "Choose an enquiry subject." }),
  vehicle: z.string(),
  message: messageSchema,
  consent: consentSchema,
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({
  defaultSubject = "",
  defaultVehicle = "",
}: {
  defaultSubject?: string;
  defaultVehicle?: string;
}) {
  const subject = subjectValues.includes(defaultSubject as FormValues["subject"])
    ? (defaultSubject as FormValues["subject"])
    : "general";
  const vehicle = vehicles.some((item) => item.slug === defaultVehicle) ? defaultVehicle : "";
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
      subject,
      vehicle,
      message: "",
      consent: false,
    },
  });

  if (demo.status === "success") {
    return <DemoFormSuccess message={demo.summary} onEdit={demo.edit} />;
  }

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        const selected = vehicles.find((item) => item.slug === values.vehicle);
        const subjectLabel = enquirySubjects.find((item) => item.value === values.subject)?.label ?? values.subject;
        await demo.complete(
          enquiryWhatsAppMessage([
            ["Name", values.fullName],
            ["Email", values.email],
            ["Phone", values.phone],
            ["Subject", subjectLabel],
            ["Vehicle", selected ? `${vehicleTitle(selected)} (${selected.stockNumber})` : ""],
            ["Message", values.message],
          ]),
        );
      })}
    >
      <Field id="contact-name" label="Full name" required error={errors.fullName?.message}>
        <TextInput id="contact-name" autoComplete="name" invalid={Boolean(errors.fullName)} {...register("fullName")} />
      </Field>
      <Field id="contact-email" label="Email address" required error={errors.email?.message}>
        <TextInput id="contact-email" type="email" autoComplete="email" invalid={Boolean(errors.email)} {...register("email")} />
      </Field>
      <Field id="contact-phone" label="Phone number" required error={errors.phone?.message}>
        <TextInput id="contact-phone" type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} {...register("phone")} />
      </Field>
      <Field id="contact-subject" label="Enquiry subject" required error={errors.subject?.message}>
        <SelectInput id="contact-subject" invalid={Boolean(errors.subject)} {...register("subject")}>
          {enquirySubjects.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field id="contact-vehicle" label="Related vehicle" error={errors.vehicle?.message} hint="Optional. Choose a demonstration listing if your enquiry is about one.">
        <SelectInput id="contact-vehicle" {...register("vehicle")}>
          <option value="">No specific vehicle</option>
          {vehicles.map((item) => (
            <option key={item.slug} value={item.slug}>
              {vehicleTitle(item)}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field id="contact-message" label="Message" required error={errors.message?.message}>
        <TextArea id="contact-message" invalid={Boolean(errors.message)} {...register("message")} />
      </Field>
      <Consent id="contact-consent" error={errors.consent?.message} {...register("consent")} />
      <Submit loading={demo.status === "submitting"} label="Submit enquiry" />
    </form>
  );
}

export function Consent({
  id,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 text-sm leading-6">
        <input
          id={id}
          type="checkbox"
          className="mt-1 h-4 w-4 accent-ink"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <span>I understand Cars Auto may use these details to respond to this enquiry.</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Submit({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-white hover:bg-ink-deep disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {loading ? "Submitting…" : label}
    </button>
  );
}
