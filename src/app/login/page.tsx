import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import LoginForm from "./LoginForm";
import ToastMessage from "@/components/ToastMessage";

type LoginPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;

  return (
    <>
      <LoginForm />

      <ToastMessage message={params.message} />
    </>
  );
}
