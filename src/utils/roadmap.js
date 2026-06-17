export function taskKey(phaseId, week, taskIndex) {
  return `${phaseId}-${week}-${taskIndex}`;
}

export function getDoneCount(checked) {
  return Object.values(checked).filter(Boolean).length;
}

export function getPhaseProgress(phase, checked) {
  const keys = phase.weeks.flatMap((week) =>
    week.tasks.map((_, i) => taskKey(phase.id, week.week, i))
  );
  const done = keys.filter((key) => checked[key]).length;
  return keys.length > 0 ? Math.round((done / keys.length) * 100) : 0;
}
