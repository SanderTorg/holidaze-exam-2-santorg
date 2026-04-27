import { Datum } from "@/lib/types/apiTypes";

export function ListingsClient({ venues }: { venues: Datum[] }) {
  return (
    <section className="flex flex-wrap">
      {venues.map((venue: Datum) => (
        <div key={venue.id} className="p-4">
          <h3 className="text-lg font-semibold">{venue.name}</h3>
          <p className="text-muted-foreground">{venue.description}</p>
        </div>
      ))}
    </section>
  );
}
