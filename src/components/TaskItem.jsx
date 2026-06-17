import { taskKey } from "../utils/roadmap.js";

export default function TaskItem({ phase, week, task, taskIndex, checked, onToggle }) {
  const key = taskKey(phase.id, week.week, taskIndex);
  const done = !!checked[key];

  return (
    <div
      onClick={() => onToggle(key)}
      style={{
        display: "flex", alignItems: "flex-start", gap: 12,
        padding: "8px 0", cursor: "pointer",
        borderBottom: taskIndex < week.tasks.length - 1 ? "1px solid #f8fafc" : "none",
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
        border: done ? "none" : `2px solid ${phase.color}40`,
        background: done ? phase.color : "white",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, color: "white", transition: "all 0.15s",
      }}>
        {done && "✓"}
      </div>
      <div style={{
        fontSize: 13.5, color: done ? "#94a3b8" : "#334155",
        textDecoration: done ? "line-through" : "none",
        lineHeight: 1.5, transition: "all 0.15s",
      }}>
        {task}
      </div>
    </div>
  );
}
