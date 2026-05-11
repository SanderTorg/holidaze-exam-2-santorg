"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const AUTH_ROUTES = ["/login", "/register"];

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <>
      <main className={`flex-1 min-h-0 ${isAuthPage ? "" : "px-4 py-6"}`}>
        {children}
      </main>
      {!isAuthPage && (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  );
}
