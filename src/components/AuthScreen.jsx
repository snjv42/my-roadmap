import { supabase } from "../lib/supabase.js";

export default function AuthScreen({ email, setEmail, authMessage, setAuthMessage, onGoogleSignIn }) {
  const sendMagicLink = async (e) => {
    e.preventDefault();
    setAuthMessage(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setAuthMessage({ type: "error", text: "Enter your email address." });
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: { emailRedirectTo: window.location.origin },
    });

    if (error) {
      setAuthMessage({ type: "error", text: error.message });
      return;
    }

    setAuthMessage({
      type: "success",
      text: "Check your email for the sign-in link. It works on any device.",
    });
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#0f172a", padding: 24, fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: 400, background: "#1e293b", borderRadius: 16,
        padding: "32px 28px", color: "white",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#94a3b8", textTransform: "uppercase", marginBottom: 8 }}>
          Sync across devices
        </div>
        <h1 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700 }}>Sign in to your roadmap</h1>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>
          Progress is saved to your account and stays in sync on phone, laptop, and tablet.
        </p>

        <form onSubmit={sendMagicLink}>
          <label style={{ display: "block", fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            style={{
              width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 8,
              border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: 14,
              marginBottom: 12,
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%", padding: "10px 16px", borderRadius: 8, border: "none",
              background: "#6366f1", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}
          >
            Send magic link
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#334155" }} />
          <span style={{ fontSize: 12, color: "#64748b" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#334155" }} />
        </div>

        <button
          type="button"
          onClick={onGoogleSignIn}
          style={{
            width: "100%", padding: "10px 16px", borderRadius: 8,
            border: "1px solid #334155", background: "#0f172a", color: "white",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}
        >
          Continue with Google
        </button>

        {authMessage && (
          <p style={{
            marginTop: 16, marginBottom: 0, fontSize: 13, lineHeight: 1.5,
            color: authMessage.type === "error" ? "#f87171" : "#86efac",
          }}>
            {authMessage.text}
          </p>
        )}
      </div>
    </div>
  );
}
