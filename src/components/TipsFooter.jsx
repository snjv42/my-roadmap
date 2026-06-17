import { TIPS } from "../data/tips.js";

export default function TipsFooter() {
  return (
    <div style={{
      marginTop: 24, background: "#0f172a", borderRadius: 14,
      padding: "20px 20px", color: "white",
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>
        📌 Keep in Mind
      </div>
      {TIPS.map((tip, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>
          <span style={{ color: "#6366f1", flexShrink: 0 }}>→</span>
          <span>{tip}</span>
        </div>
      ))}
    </div>
  );
}
