"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/lib/hooks/useUserStore";
import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { isLoggedIn, name, venueManager, avatar, clearUser } = useUserStore();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    clearUser();
    router.push("/");
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/venues", label: "Venues" },
    { href: "/contact", label: "Contact " },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Holidaze
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border">
                  {avatar?.url ? (
                    <Image
                      src={avatar.url}
                      alt={avatar.alt ?? name}
                      fill
                      className="object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-medium">{name}</p>
                  {venueManager && (
                    <p className="text-xs text-muted-foreground">
                      Venue Manager
                    </p>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/profile`} className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border">
                  {avatar?.url ? (
                    <Image
                      src={avatar.url}
                      alt={avatar.alt ?? name}
                      fill
                      className="object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-medium">{name}</p>
                  {venueManager && (
                    <p className="text-xs text-muted-foreground">
                      Venue Manager
                    </p>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/profile`} className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 cursor-pointer" />
            ) : (
              <Menu className="h-6 w-6 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="border-t md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? null : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
