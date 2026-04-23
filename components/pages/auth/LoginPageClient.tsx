"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/schema/loginSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/lib/actions/authActions";
import { useUserStore } from "@/lib/hooks/useUserStore";
import Link from "next/link";

export default function LoginPageClient() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormData) {
    try {
      const result = await loginAction(values);
      setUser({
        name: result.data.name,
        email: result.data.email,
        accessToken: result.data.accessToken,
        venueManager: result.data.venueManager,
      });
      toast.success("Login successful! Redirecting...");
      router.push("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
    }
  }
  return (
    <section className="flex flex-col items-center w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold">Welcome back!</h1>
      <p className="font-semibold text-gray-600 mt-2 text-center">
        Please enter your details to continue.
      </p>

      <form className="my-4 w-full" onSubmit={handleSubmit(onSubmit)}>
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
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}
