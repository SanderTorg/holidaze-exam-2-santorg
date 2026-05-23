const stats = [
  { label: "Venues listed", value: "1,200+" },
  { label: "Happy guests", value: "45,000+" },
  { label: "Countries", value: "38" },
  { label: "Average rating", value: "4.8 ★" },
];

const values = [
  {
    icon: "🏡",
    title: "Curated stays",
    description:
      "Every venue on Holidaze is reviewed to meet our quality standards, so you can book with confidence.",
  },
  {
    icon: "🤝",
    title: "Trust & transparency",
    description:
      "No hidden fees, no surprises. What you see is what you pay — always.",
  },
  {
    icon: "🌍",
    title: "Global reach, local feel",
    description:
      "We connect travellers with unique local hosts across 38 countries, giving you an authentic experience wherever you go.",
  },
  {
    icon: "⚡",
    title: "Instant booking",
    description:
      "Skip the back-and-forth. Reserve your perfect getaway in seconds with real-time availability.",
  },
];

const team = [
  { name: "Sofia Larsen", role: "CEO & Co-founder", initials: "SL" },
  { name: "Marcus Haugen", role: "CTO & Co-founder", initials: "MH" },
  { name: "Amara Diallo", role: "Head of Design", initials: "AD" },
  { name: "Jonas Berg", role: "Head of Operations", initials: "JB" },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted/40 border-b">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 text-center">
          <span className="inline-block text-5xl mb-5">🌅</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Vacations worth remembering
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Holidaze is a platform built by travellers, for travellers. We
            believe the perfect stay is out there — we just make it easy to find
            it.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our story</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Holidaze started in 2019 when two friends — tired of overpriced
            hotel rooms and impersonal stays — decided to build something better.
            They wanted a place where travellers could find authentic,
            well-priced accommodations and where hosts could share their spaces
            with the world.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, Holidaze connects thousands of guests with unique venues in
            over 38 countries. We&apos;re still driven by the same idea: that
            every trip should feel like home, no matter where you go.
          </p>
        </div>
        <div className="rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border p-8 flex flex-col gap-4">
          <div className="text-4xl">🏔️</div>
          <blockquote className="text-base font-medium leading-relaxed italic">
            &ldquo;We didn&apos;t just want to build a booking platform — we
            wanted to build a community of people who love to travel and love to
            host.&rdquo;
          </blockquote>
          <p className="text-sm text-muted-foreground">— Sofia Larsen, CEO</p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 border-y">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-background border rounded-2xl p-6 flex flex-col gap-3"
              >
                <span className="text-3xl">{v.icon}</span>
                <h3 className="font-semibold text-lg">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-2">Meet the team</h2>
        <p className="text-center text-muted-foreground mb-10">
          The people building the future of holiday rentals.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {member.initials}
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
