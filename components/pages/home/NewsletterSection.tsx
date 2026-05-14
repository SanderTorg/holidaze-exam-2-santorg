"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    toast.success("Subscribed to newsletter!");
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="bg-foreground py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-white/50 mb-3">
          Stay in the loop
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get the best deals, first.
        </h2>
        <p className="text-white/70 mb-8 text-lg">
          Subscribe to our newsletter and be the first to hear about new venues,
          exclusive offers, and travel inspiration.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-6 py-3 text-sm font-medium">
            ✓ You&apos;re subscribed — thanks!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 flex flex-col gap-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="your@email.com"
                className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              {error && <p className="text-xs text-red-400 pl-4">{error}</p>}
            </div>
            <button
              type="submit"
              className="cursor-pointer shrink-0 rounded-full bg-white text-foreground font-semibold px-6 py-3 text-sm hover:bg-white/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-white/40">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
