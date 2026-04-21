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
          layout="fill"
          objectFit="cover"
        />
      </div>
      {children}
    </div>
  );
}
