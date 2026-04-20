import BackgroundAuthClient from "@/components/pages/auth/BackgroundAuthClient";
import RegisterPageClient from "@/components/pages/auth/RegisterPageClient";

export default function Register() {
  return (
    <>
      <BackgroundAuthClient>
        <RegisterPageClient />
      </BackgroundAuthClient>
    </>
  );
}
