import { taskKey } from "../utils/roadmap.js";
import TaskItem from "./TaskItem.jsx";

export default function WeekSection({ phase, week, weekIndex, checked, expanded, onToggleSection, onToggleTask }) {
  const sectionKey = `${phase.id}-w${weekIndex}`;
  const isOpen = expanded[sectionKey];
  const weekDone = week.tasks.filter((_, i) => checked[taskKey(phase.id, week.week, i)]).length;
  const allDone = weekDone === week.tasks.length;

  return (
    <div style={{
      background: "white", borderRadius: 12,
      border: `1.5px solid ${allDone ? phase.border : "#e2e8f0"}`,
      marginBottom: 10, overflow: "hidden",
      boxShadow: isOpen ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
      transition: "box-shadow 0.2s",
    }}>
      <button
        type="button"
        onClick={() => onToggleSection(sectionKey)}
        style={{
          width: "100%", padding: "14px 18px", background: "none", border: "none",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
          textAlign: "left",
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: allDone ? phase.color : phase.light,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: allDone ? "white" : phase.color,
        }}>
          {allDone ? "✓" : `W${week.week}`}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{week.label}</div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
            {week.hours} · {weekDone}/{week.tasks.length} tasks
          </div>
        </div>
        <div style={{
          fontSize: 18, color: "#cbd5e1", transform: isOpen ? "rotate(180deg)" : "none",
          transition: "transform 0.2s",
        }}>
          ⌄
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: "0 18px 14px" }}>
          <div style={{ height: 1, background: "#f1f5f9", marginBottom: 12 }} />
          {week.tasks.map((task, taskIndex) => (
            <TaskItem
              key={taskIndex}
              phase={phase}
              week={week}
              task={task}
              taskIndex={taskIndex}
              checked={checked}
              onToggle={onToggleTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
