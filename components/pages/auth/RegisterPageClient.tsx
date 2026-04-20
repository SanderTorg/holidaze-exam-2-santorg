"use client ";

export default function RegisterPageClient() {
  return (
    <>
      <section className="flex flex-col justify-center items-center mx-auto max-w-xl px-4 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Register</h1>

        <form action="" className="my-4 w-full">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </form>
      </section>
    </>
  );
}
