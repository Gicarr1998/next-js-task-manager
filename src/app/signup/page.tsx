import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import SignupForm from "./SignupForm";

export default async function SignupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If the user is already logged in,
  // don't allow them to access the signup page.
  if (user) {
    redirect("/dashboard");
  }

  return <SignupForm />;
}
