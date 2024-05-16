import { supabase } from "@/configs/supabaseClient.config";

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error: any) {
    throw new Error("Sign up failed: " + error.message);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return { user, error: null };
  } catch (error: any) {
    throw new Error("Sign in failed: " + error.message);
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    return null;
  } catch (error: any) {
    throw new Error("Sign out failed: " + error.message);
  }
}