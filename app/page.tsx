export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Holidaze!</h1>
        <p className="text-lg text-gray-600">
          Your one-stop destination for booking the perfect vacation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Discover Your Next Adventure
        </h2>
        <p className="text-gray-700 mb-6">
          Explore our wide range of vacation rentals, from cozy cabins to
          luxurious beachfront villas. Whether you're planning a romantic
          getaway or a family vacation, Holidaze has something for everyone.
          Book now and start your journey to unforgettable memories!
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Listings</h2>
      </section>
    </div>
  );
}
