"use client";

import { Button } from "@/components/ui/button";

export default function LoginPageClient() {
  return (
    <section className="flex flex-col items-center w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="font-semibold text-gray-600 mt-2 text-center">
        Welcome back! Please enter your details to continue.
      </p>

      <form className="my-4 w-full">
        <div className="flex flex-col pb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold capitalize"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex flex-col pb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold capitalize"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </form>
    </section>
  );
}
