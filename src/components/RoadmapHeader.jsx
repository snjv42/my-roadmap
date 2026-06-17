import { PHASES } from "../data/phases.js";
import { supabaseConfigured } from "../lib/supabase.js";

export default function RoadmapHeader({
  user,
  doneCount,
  totalTasks,
  progress,
  activePhase,
  onPhaseChange,
  onSignOut,
  syncError,
}) {
  return (
    <div style={{ background: "#0f172a", color: "white", padding: "36px 24px 28px", textAlign: "center" }}>
      <div style={{ fontSize: 11, letterSpacing: 3, color: "#94a3b8", textTransform: "uppercase", marginBottom: 10 }}>
        Senior Frontend → AI Engineer · Europe Relocation
      </div>
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1.2, color: "#ffffff" }}>
        Your 9-Month Roadmap
      </h1>
      <div style={{ color: "#64748b", marginTop: 8, fontSize: 14 }}>
        2–3 hrs/day · Germany & Amsterdam · AI-Ready Career
      </div>

      {supabaseConfigured && user && (
        <div style={{
          marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center",
          gap: 12, flexWrap: "wrap", fontSize: 12, color: "#94a3b8",
        }}>
          <span>Signed in as {user.email}</span>
          <button
            type="button"
            onClick={onSignOut}
            style={{
              padding: "4px 10px", borderRadius: 6, border: "1px solid #334155",
              background: "transparent", color: "#cbd5e1", fontSize: 12, cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>
      )}

      {!supabaseConfigured && (
        <div style={{
          marginTop: 14, fontSize: 12, color: "#fbbf24", maxWidth: 480, marginLeft: "auto", marginRight: "auto",
        }}>
          Supabase not configured — progress saves locally only. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
        </div>
      )}

      {syncError && (
        <div style={{
          marginTop: 10, fontSize: 12, color: "#f87171", maxWidth: 480, marginLeft: "auto", marginRight: "auto",
        }}>
          Sync issue: {syncError} (saved locally as backup)
        </div>
      )}

      <div style={{ marginTop: 24, maxWidth: 420, margin: "24px auto 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>
          <span>{doneCount} of {totalTasks} tasks complete</span>
          <span style={{ color: "#6366f1", fontWeight: 600 }}>{progress}%</span>
        </div>
        <div style={{ background: "#1e293b", borderRadius: 99, height: 8, overflow: "hidden" }}>
          <div style={{
            width: `${progress}%`, height: "100%", borderRadius: 99,
            background: "linear-gradient(90deg, #6366f1, #0ea5e9, #10b981)",
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
        {PHASES.map((phase) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => onPhaseChange(phase.id)}
            style={{
              padding: "6px 14px", borderRadius: 99, border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: 600, transition: "all 0.2s",
              background: activePhase === phase.id ? phase.color : "#1e293b",
              color: activePhase === phase.id ? "white" : "#64748b",
            }}
          >
            Phase {phase.id}: {phase.title}
          </button>
        ))}
      </div>
    </div>
  );
}
