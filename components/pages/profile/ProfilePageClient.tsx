"use client";

import { useUserStore } from "@/lib/hooks/useUserStore";
import { updateProfileAction } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BadgeCheck, Pencil, User } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePageClient() {
  const router = useRouter();
  const {
    name,
    email,
    accessToken,
    venueManager,
    avatar,
    isLoggedIn,
    setUser,
  } = useUserStore();

  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(avatar?.url ?? "");
  const [avatarAlt, setAvatarAlt] = useState(avatar?.alt ?? "");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  async function handleSave() {
    setSaving(true);
    try {
      const updated = await updateProfileAction(name, accessToken, {
        bio: bio || undefined,
        avatar: avatarUrl
          ? { url: avatarUrl, alt: avatarAlt || name }
          : undefined,
      });
      setUser({
        name,
        email,
        accessToken,
        venueManager,
        avatar: updated.avatar ?? avatar,
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
    <div className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-8">
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border shrink-0 bg-muted flex items-center justify-center">
          {avatar?.url ? (
            <Image
              src={avatar.url}
              alt={avatar.alt || name}
              fill
              className="object-cover"
            />
          ) : (
            <User size={40} className="text-muted-foreground" />
          )}
        </div>

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
          className="cursor-pointer ml-auto flex items-center gap-1.5 text-sm border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors"
        >
          <Pencil size={14} />
          Edit
        </button>
      </div>

      {editing && (
        <div className="border rounded-xl p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Update Profile</h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Avatar URL</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Avatar alt text</label>
            <input
              type="text"
              value={avatarAlt}
              onChange={(e) => setAvatarAlt(e.target.value)}
              placeholder="A short description of the image"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Tell us a little about yourself..."
              className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 text-sm rounded-lg border hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}

      {venueManager ? (
        <div className="border rounded-xl p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Venue Manager</h2>
          <p className="text-sm text-muted-foreground">
            Manage your listed venues, view bookings, and create new venues.
          </p>
          <button
            onClick={() => router.push("/venues/manage")}
            className="self-start px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Go to my venues
          </button>
        </div>
      ) : (
        <div className="border rounded-xl p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-lg">My Bookings</h2>
          <p className="text-sm text-muted-foreground">
            View and manage your upcoming stays.
          </p>
          <button
            onClick={() => router.push("/bookings")}
            className="cursor-pointer self-start px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View my bookings
          </button>
        </div>
      )}
    </div>
  );
}
