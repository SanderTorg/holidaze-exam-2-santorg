import CarouselComponent from "@/components/pages/home/Carousel";
import NewsletterSection from "@/components/pages/home/NewsletterSection";
import { Suspense } from "react";
import type { Venue } from "@/lib/types/apiTypes";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  let popularVenues: Venue[] = [];
  let featuredVenues: Venue[] = [];
  try {
    const [popularRes, featuredRes] = await Promise.all([
      fetch(
        `${process.env.API_HOLIDAZE_VENUES_URL}?limit=100&sort=rating&sortOrder=desc`,
        {
          headers: { "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}` },
          cache: "no-store",
        },
      ),
      fetch(
        `${process.env.API_HOLIDAZE_VENUES_URL}?limit=12&sort=created&sortOrder=desc`,
        {
          headers: { "X-Noroff-API-Key": `${process.env.NOROFF_API_KEY}` },
          cache: "no-store",
        },
      ),
    ]);

    if (popularRes.ok) {
      const json = await popularRes.json();
      const venues: Venue[] = Array.isArray(json?.data) ? json.data : [];
      popularVenues = venues
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 10);
    }

    if (featuredRes.ok) {
      const json = await featuredRes.json();
      featuredVenues = Array.isArray(json?.data) ? json.data.slice(0, 12) : [];
    }
  } catch (error) {
    console.error("Failed to fetch venues:", error);
  }

  return (
    <div className="flex flex-col">
      <section className="relative h-[90vh] w-full overflow-hidden">
        <Image
          src="/images/authBackground-jpeg.jpg"
          alt="Holidaze hero background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-4 tracking-tight">
            Welcome to Holidaze
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8 drop-shadow">
            Your one-stop destination for booking the perfect vacation.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/venues"
              className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Browse Venues
            </Link>
            <Link
              href="/register"
              className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-linear-to-br from-sky-50 to-indigo-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-indigo-500 mb-3">
            Explore the world
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your Next Adventure
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            From cozy mountain cabins to luxurious beachfront villas — find the
            perfect rental for every kind of trip. Whether it&apos;s a romantic
            escape or a family vacation, Holidaze has something for everyone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: "🏡",
                title: "Unique Stays",
                desc: "Thousands of hand-picked properties in breathtaking locations.",
              },
              {
                icon: "📅",
                title: "Easy Booking",
                desc: "Check availability and book in seconds — no hidden fees.",
              },
              {
                icon: "⭐",
                title: "Trusted Reviews",
                desc: "Real ratings from real guests to help you choose with confidence.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-indigo-500 mb-2">
              Top rated
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Popular Destinations
            </h2>
          </div>
          <div className="flex items-center justify-center px-7">
            <Suspense
              fallback={
                <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />
              }
            >
              <CarouselComponent venues={popularVenues} />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-indigo-500 mb-2">
                Just listed
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured Venues
              </h2>
            </div>
            <Link
              href="/venues"
              className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View More →
            </Link>
          </div>

          {featuredVenues.length === 0 ? (
            <p className="text-gray-500 text-center">
              No venues available right now.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredVenues.map((venue) => {
                const image = venue.media?.[0];
                return (
                  <Link
                    key={venue.id}
                    href={`/venues/${venue.id}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-44 w-full bg-gray-100">
                      {image?.url ? (
                        <Image
                          src={image.url}
                          alt={image.alt || venue.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-300 text-sm">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 truncate mb-1">
                        {venue.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate mb-3">
                        {[venue.location?.city, venue.location?.country]
                          .filter(Boolean)
                          .join(", ") || "Location unknown"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">
                          ${venue.price}
                          <span className="text-sm font-normal text-gray-500">
                            {" "}
                            /night
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-sm text-amber-500 font-medium">
                          ★ {venue.rating?.toFixed(1) ?? "—"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
