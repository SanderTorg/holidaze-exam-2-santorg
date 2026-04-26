"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/schema/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ContactPageComponent() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    mode: "onBlur",
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted with data:", data);
    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <label htmlFor="fullName" className="pb-1 block text-sm font-medium">
          Full Name
        </label>

        <Input
          type="text"
          id="fullName"
          {...register("fullName")}
          aria-invalid={errors.fullName ? "true" : "false"}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={errors.fullName ? "border-destructive" : ""}
          placeholder="Jacques Webster"
        />
        {errors.fullName && (
          <p
            id="fullName-error"
            role="alert"
            className="pt-1 text-sm text-destructive"
          >
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="pb-1 block text-sm font-medium">
          Email
        </label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={errors.email ? "border-destructive" : ""}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            className="pt-1 text-sm text-destructive"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="pb-1 block text-sm font-medium">
          Subject
        </label>
        <Input
          type="text"
          id="subject"
          {...register("subject")}
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          placeholder="What is this about?"
        />
        {errors.subject && (
          <p
            id="subject-error"
            role="alert"
            className="pt-1 text-sm text-destructive"
          >
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="pb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Your message"
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="pt-1 text-sm text-destructive"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
