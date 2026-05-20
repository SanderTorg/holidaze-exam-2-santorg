"use client";

import Image from "next/image";

interface LoginProps {
  children: React.ReactNode;
}

export default function BackgroundAuthClient({ children }: LoginProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/authBackground-jpeg.jpg"
          alt="Background"
          fill
          sizes="100vw"
          loading="eager"
          style={{ objectFit: "cover" }}
        />
      </div>
      {children}
    </div>
  );
}
