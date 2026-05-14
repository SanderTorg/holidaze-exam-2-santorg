"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type FormData } from "@/lib/schema/registerSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/lib/actions/authActions";
import Link from "next/link";

export default function RegisterPageClient() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { venueManager: false },
  });

  const isVenueManager = watch("venueManager");

  async function onSubmit(values: FormData) {
    try {
      await registerAction(values);
      toast.success("Account created! You can now log in.");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed",
      );
      console.error("Registration failed:", error);
    }
  }

  return (
    <section className="flex flex-col items-center w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold">Create Account</h1>
      <p className="font-semibold text-gray-600 mt-2 text-center">
        Join so you can book and browse venues for your next trip.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="my-4 w-full">
        <div className="flex flex-col pb-4">
          <label className="block text-sm font-semibold mb-2">
            Account type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setValue("venueManager", false)}
              className={`flex flex-col cursor-pointer items-center gap-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${
                !isVenueManager
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <span className="text-xl">🧳</span>
              Customer
              <span className="text-xs font-normal text-gray-400">
                Browse &amp; book venues
              </span>
            </button>
            <button
              type="button"
              onClick={() => setValue("venueManager", true)}
              className={`flex flex-col cursor-pointer items-center gap-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${
                isVenueManager
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <span className="text-xl">🏡</span>
              Venue Manager
              <span className="text-xs font-normal text-gray-400">
                List &amp; manage venues
              </span>
            </button>
          </div>
          <input type="hidden" {...register("venueManager")} />
        </div>

        <div className="flex flex-col pb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold capitalize"
          >
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Bob Ross"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col pb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold capitalize"
          >
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="bob@stud.noroff.no"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col pb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold capitalize"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="********"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </Button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}
