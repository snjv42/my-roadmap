import { getPhaseProgress } from "../utils/roadmap.js";
import WeekSection from "./WeekSection.jsx";

export default function PhaseView({ phase, checked, expanded, onToggleSection, onToggleTask }) {
  const progress = getPhaseProgress(phase, checked);

  return (
    <div>
      <div style={{
        background: phase.light, border: `1.5px solid ${phase.border}`,
        borderRadius: 14, padding: "18px 20px", marginBottom: 16,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: phase.color, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
              Phase {phase.id}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{phase.title}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>{phase.subtitle}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: phase.color }}>{progress}%</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>complete</div>
          </div>
        </div>
        <div style={{ marginTop: 12, background: "#e2e8f0", borderRadius: 99, height: 6, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: phase.color, borderRadius: 99, transition: "width 0.4s" }} />
        </div>
        <div style={{ marginTop: 12, fontSize: 13, color: "#475569" }}>
          🎯 <strong>Goal:</strong> {phase.goal}
        </div>
      </div>

      {phase.weeks.map((week, weekIndex) => (
        <WeekSection
          key={weekIndex}
          phase={phase}
          week={week}
          weekIndex={weekIndex}
          checked={checked}
          expanded={expanded}
          onToggleSection={onToggleSection}
          onToggleTask={onToggleTask}
        />
      ))}
    </div>
  );
}
