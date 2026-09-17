import { createClient } from "./server";

export async function getAuthenticatedUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      supabase,
      user: null,
    };
  }

  return {
    supabase,
    user,
  };
}
