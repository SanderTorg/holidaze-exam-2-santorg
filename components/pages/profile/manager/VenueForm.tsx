"use client";

import { useState } from "react";
import { useUserStore } from "@/lib/hooks/useUserStore";
import {
  createVenueAction,
  updateVenueAction,
} from "@/lib/actions/venueActions";
import type { Venue } from "@/lib/types/apiTypes";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface Props {
  initial?: Venue;
  onSuccess: (venue: Venue) => void;
  onCancel: () => void;
}

const inputClass =
  "rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full";
const labelClass = "text-sm font-medium";

export default function VenueForm({ initial, onSuccess, onCancel }: Props) {
  const { accessToken } = useUserStore();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    price: initial?.price?.toString() ?? "",
    maxGuests: initial?.maxGuests?.toString() ?? "",
    mediaUrl: initial?.media[0]?.url ?? "",
    mediaAlt: initial?.media[0]?.alt ?? "",
    wifi: initial?.meta.wifi ?? false,
    parking: initial?.meta.parking ?? false,
    breakfast: initial?.meta.breakfast ?? false,
    pets: initial?.meta.pets ?? false,
    address: initial?.location.address ?? "",
    city: initial?.location.city ?? "",
    zip: initial?.location.zip ?? "",
    country: initial?.location.country ?? "",
  });

  const setField =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const setCheck =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.checked }));

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        maxGuests: Number(form.maxGuests),
        media: form.mediaUrl
          ? [{ url: form.mediaUrl, alt: form.mediaAlt || form.name }]
          : [],
        meta: {
          wifi: form.wifi,
          parking: form.parking,
          breakfast: form.breakfast,
          pets: form.pets,
        },
        location: {
          address: form.address || undefined,
          city: form.city || undefined,
          zip: form.zip || undefined,
          country: form.country || undefined,
        },
      };
      const result = initial
        ? await updateVenueAction(accessToken, initial.id, payload)
        : await createVenueAction(accessToken, payload);
      onSuccess(result);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save venue");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <button
        onClick={onCancel}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to my venues
      </button>

      <h1 className="text-2xl font-bold mb-6">
        {initial ? "Edit Venue" : "Create New Venue"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Basic Info</h2>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Venue name *</label>
            <input
              required
              value={form.name}
              onChange={setField("name")}
              className={inputClass}
              placeholder="My Awesome Cabin"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Description *</label>
            <textarea
              required
              value={form.description}
              onChange={setField("description")}
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Describe your venue..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Price per night (NOK) *</label>
              <input
                required
                type="number"
                min={0}
                value={form.price}
                onChange={setField("price")}
                className={inputClass}
                placeholder="500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Max guests *</label>
              <input
                required
                type="number"
                min={1}
                value={form.maxGuests}
                onChange={setField("maxGuests")}
                className={inputClass}
                placeholder="4"
              />
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Image</h2>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Image URL</label>
            <input
              type="url"
              value={form.mediaUrl}
              onChange={setField("mediaUrl")}
              className={inputClass}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Image alt text</label>
            <input
              value={form.mediaAlt}
              onChange={setField("mediaAlt")}
              className={inputClass}
              placeholder="A photo of the venue"
            />
          </div>
        </div>

        <div className="border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Included</h2>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { key: "wifi", label: "WiFi" },
                { key: "parking", label: "Parking" },
                { key: "breakfast", label: "Breakfast" },
                { key: "pets", label: "Pets allowed" },
              ] as { key: keyof typeof form; label: string }[]
            ).map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={form[key] as boolean}
                  onChange={setCheck(key)}
                  className="h-4 w-4 rounded border-input"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Address</label>
              <input
                value={form.address}
                onChange={setField("address")}
                className={inputClass}
                placeholder="123 Main St"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>City</label>
              <input
                value={form.city}
                onChange={setField("city")}
                className={inputClass}
                placeholder="Oslo"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Zip</label>
              <input
                value={form.zip}
                onChange={setField("zip")}
                className={inputClass}
                placeholder="0150"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Country</label>
              <input
                value={form.country}
                onChange={setField("country")}
                className={inputClass}
                placeholder="Norway"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : initial ? "Save Changes" : "Create Venue"}
          </button>
        </div>
      </form>
    </div>
  );
}
