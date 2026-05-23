import ContactPageClient from "@/components/pages/contact/ContactPageClient";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <div className="bg-muted/40 border-b">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Mail className="text-primary" size={26} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Get in touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a question, feedback, or need help with a booking? We&apos;d
            love to hear from you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <aside className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-5">Contact information</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                  <Mail size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    support@holidaze.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                  <Phone size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    +47 123 45 678
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    Storgata 12, 0155 Oslo, Norway
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                  <Clock size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Support hours</p>
                  <p className="text-sm text-muted-foreground">
                    Mon – Fri, 09:00 – 18:00 CET
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-muted/60 border p-5">
            <p className="text-sm font-medium mb-1">Typical response time</p>
            <p className="text-2xl font-bold text-primary">Under 24 hours</p>
            <p className="text-xs text-muted-foreground mt-1">
              We aim to reply to every message within one business day.
            </p>
          </div>
        </aside>

        <div className="lg:col-span-3 border rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-1">Send us a message</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Fill in the form and we&apos;ll get back to you as soon as possible.
          </p>
          <ContactPageClient />
        </div>
      </div>
    </div>
  );
}
