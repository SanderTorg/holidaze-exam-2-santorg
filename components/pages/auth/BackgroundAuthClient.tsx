import Image from "next/image";

interface LoginProps {
  children: React.ReactNode;
}

export default function BackgroundAuthClient({ children }: LoginProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src="/path/to/your/image.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
      />
      {children}
    </div>
  );
}
