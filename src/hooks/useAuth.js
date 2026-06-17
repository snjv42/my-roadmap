import { useState, useEffect } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase.js";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(!supabaseConfigured);
  const [email, setEmail] = useState("");
  const [authMessage, setAuthMessage] = useState(null);

  useEffect(() => {
    if (!supabaseConfigured) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) setAuthMessage({ type: "error", text: error.message });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAuthMessage(null);
  };

  return {
    user,
    authReady,
    email,
    setEmail,
    authMessage,
    setAuthMessage,
    signInWithGoogle,
    signOut,
  };
}
