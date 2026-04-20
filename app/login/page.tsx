import BackgroundAuthClient from "@/components/pages/auth/BackgroundAuthClient";
import LoginPageClient from "@/components/pages/auth/LoginPageClient";

export default function Login() {
  return (
    <>
      <BackgroundAuthClient>
        <LoginPageClient />
      </BackgroundAuthClient>
    </>
  );
}
