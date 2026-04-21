"use client ";

import { Button } from "@/components/ui/button";

export default function RegisterPageClient() {
  return (
    <>
      <section className="flex flex-col items-center w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="font-semibold text-gray-600 mt-2 text-center">
          Join so you can book and browse venues for your next trip.
        </p>

        <form action="" className="my-4 w-full">
          <div className="flex flex-col pb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold capitalize"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="pt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              required
            />
          </div>

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
              name="email"
              className="pt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
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
              name="password"
              className="pt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:text-indigo-500">
              Log in
            </a>
          </p>
        </form>
      </section>
    </>
  );
}
