import ViewBookingsClient from "@/components/pages/profile/customer/ViewBookingsClient";

export const metadata = {
  title: "My Bookings | Holidaze",
};

export default function BookingsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <ViewBookingsClient />
    </main>
  );
}
