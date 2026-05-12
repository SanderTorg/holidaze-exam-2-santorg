import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Venue } from "@/lib/types/apiTypes";

interface CarouselComponentProps {
  venues: Venue[];
}

export default function CarouselComponent({ venues }: CarouselComponentProps) {
  if (venues.length === 0) {
    return (
      <p className="text-gray-500">No popular venues available right now.</p>
    );
  }

  return (
    <Carousel className="w-full max-w-4xl" opts={{ loop: true }}>
      <CarouselContent>
        {venues.map((venue) => {
          const image = venue.media?.[0];
          return (
            <CarouselItem key={venue.id} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/venues/${venue.id}`} className="block group">
                <div className="relative h-52 w-full rounded-lg overflow-hidden bg-gray-200">
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || venue.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <p className="font-semibold truncate">{venue.name}</p>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span>
                        {venue.location?.city || venue.location?.country || "—"}
                      </span>
                      <span className="flex items-center gap-1">
                        ★ {venue.rating?.toFixed(1) ?? "N/A"}
                      </span>
                    </div>
                    <p className="text-sm mt-0.5">${venue.price} / night</p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
