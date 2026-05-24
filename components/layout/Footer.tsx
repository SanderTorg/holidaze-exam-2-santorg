import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/venues", label: "Venues" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About Us" },
];

const socialLinks = [
  { href: "#", label: "Facebook", icon: FaFacebook },
  { href: "#", label: "Instagram", icon: FaInstagram },
  { href: "#", label: "Twitter / X", icon: FaXTwitter },
  { href: "#", label: "YouTube", icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex flex-col items-center gap-4 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 sm:flex-row sm:justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Holidaze
        </Link>
        <nav className="flex items-center text-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
        <div className="text-center border-t pt-4 sm:border-t-0 sm:pt-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Holidaze
          </p>
          <p className="text-sm text-muted-foreground">All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Student Project</p>
        </div>
      </div>
    </footer>
  );
}
