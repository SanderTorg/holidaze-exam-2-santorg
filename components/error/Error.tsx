"use client";

export default function ErrorComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Error</h1>
      <p className="text-lg text-gray-700 mb-6">
        An error occurred while loading the content. Please try again later.
      </p>
    </div>
  );
}
