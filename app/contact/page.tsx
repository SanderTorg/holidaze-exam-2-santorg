import ContactPageClient from "@/components/pages/contact/ContactPageClient";
export default function Contact() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="pb-2 text-2xl font-bold">Contact Us</h1>
      <p className="pb-8 text-muted-foreground">
        Have a question or feedback? Send us a message.
      </p>

      <ContactPageClient></ContactPageClient>
    </div>
  );
}
