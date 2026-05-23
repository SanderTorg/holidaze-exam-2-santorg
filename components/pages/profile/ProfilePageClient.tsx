"use client";

import { useUserStore, useUserStoreHydrated } from "@/lib/hooks/useUserStore";
import { updateProfileAction } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BadgeCheck, Pencil, User } from "lucide-react";
import { toast } from "sonner";
import VenueManagerDashboard from "./manager/VenueManagerDashboard";
import ViewBookingsClient from "./customer/ViewBookingsClient";
import { FormField } from "@/components/universal/FormField";

export default function ProfilePageClient() {
  const router = useRouter();
  const {
    name,
    email,
    accessToken,
    venueManager,
    avatar,
    banner,
    isLoggedIn,
    setUser,
  } = useUserStore();

  const hasHydrated = useUserStoreHydrated();

  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(avatar?.url ?? "");
  const [avatarAlt, setAvatarAlt] = useState(avatar?.alt ?? "");
  const [bannerUrl, setBannerUrl] = useState(banner?.url ?? "");
  const [bannerAlt, setBannerAlt] = useState(banner?.alt ?? "");
  const [bio, setBio] = useState("");
  const [roleIsManager, setRoleIsManager] = useState(venueManager);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"venues" | "bookings">("venues");

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, hasHydrated, router]);

  if (!hasHydrated) return null;
  if (!isLoggedIn) return null;

  async function handleSave() {
    setSaving(true);
    try {
      const updated = await updateProfileAction(name, accessToken, {
        bio: bio || undefined,
        avatar: avatarUrl
          ? { url: avatarUrl, alt: avatarAlt || name }
          : undefined,
        banner: bannerUrl
          ? { url: bannerUrl, alt: bannerAlt || name }
          : undefined,
        venueManager: roleIsManager,
      });
      setUser({
        name,
        email,
        accessToken,
        venueManager: updated.venueManager ?? roleIsManager,
        avatar: updated.avatar ?? avatar,
        banner: updated.banner ?? banner,
      });
      setEditing(false);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="relative w-full h-48 bg-muted">
        {banner?.url && (
          <Image
            src={banner.url}
            alt={banner.alt || "Profile banner"}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        )}
      </div>

      <div className="max-w-2xl mx-auto py-6 px-4 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-14">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background shrink-0 bg-muted flex items-center justify-center shadow">
            {avatar?.url ? (
              <Image
                src={avatar.url}
                alt={avatar.alt || name}
                fill
                sizes="96px"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <User size={40} className="text-muted-foreground" />
            )}
          </div>

          <div className="flex flex-1 items-center justify-between pb-1">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{name}</h1>
                {venueManager && (
                  <span className="flex items-center gap-1 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                    <BadgeCheck size={12} />
                    Venue Manager
                  </span>
                )}
                {!venueManager && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                    Customer
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>

            <button
              onClick={() => setEditing((v) => !v)}
              className="cursor-pointer flex items-center gap-1.5 text-sm border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors"
            >
              <Pencil size={14} />
              Edit
            </button>
          </div>
        </div>

        {editing && (
          <div className="border rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-lg">Update Profile</h2>

            <FormField label="Banner URL">
              <input
                type="url"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="https://example.com/banner.jpg"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </FormField>

            <FormField label="Banner alt text">
              <input
                type="text"
                value={bannerAlt}
                onChange={(e) => setBannerAlt(e.target.value)}
                placeholder="A short description of the banner"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </FormField>

            <FormField label="Avatar URL">
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </FormField>

            <FormField label="Avatar alt text">
              <input
                type="text"
                value={avatarAlt}
                onChange={(e) => setAvatarAlt(e.target.value)}
                placeholder="A short description of the image"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </FormField>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Account type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRoleIsManager(false)}
                  className={`flex flex-col cursor-pointer items-center gap-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${
                    !roleIsManager
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">🧳</span>
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRoleIsManager(true)}
                  className={`flex flex-col cursor-pointer items-center gap-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${
                    roleIsManager
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">🏡</span>
                  Venue Manager
                </button>
              </div>
            </div>

            <FormField label="Bio">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell us a little about yourself..."
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </FormField>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 cursor-pointer text-sm rounded-lg border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 cursor-pointer text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        )}
      </div>

      {venueManager && (
        <div className="max-w-5xl mx-auto w-full px-4 pb-10">
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setActiveTab("venues")}
              className={`cursor-pointer px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "venues"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              My Venues
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`cursor-pointer px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "bookings"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              My Bookings
            </button>
          </div>
          {activeTab === "venues" && <VenueManagerDashboard />}
          {activeTab === "bookings" && <ViewBookingsClient />}
        </div>
      )}
      {!venueManager && (
        <div className="max-w-2xl mx-auto w-full px-4 pb-10">
          <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
          <ViewBookingsClient />
        </div>
      )}
    </>
  );
}
