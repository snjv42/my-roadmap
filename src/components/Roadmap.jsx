import { useState } from "react";
import { PHASES, TOTAL_TASKS } from "../data/phases.js";
import { supabaseConfigured } from "../lib/supabase.js";
import { getDoneCount } from "../utils/roadmap.js";
import { useAuth } from "../hooks/useAuth.js";
import { useProgress } from "../hooks/useProgress.js";
import AuthScreen from "./AuthScreen.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import RoadmapHeader from "./RoadmapHeader.jsx";
import PhaseView from "./PhaseView.jsx";
import TipsFooter from "./TipsFooter.jsx";

export default function Roadmap() {
  const [expanded, setExpanded] = useState({ "phase-1": true });
  const [activePhase, setActivePhase] = useState(1);

  const {
    user,
    authReady,
    email,
    setEmail,
    authMessage,
    setAuthMessage,
    signInWithGoogle,
    signOut,
  } = useAuth();

  const { checked, progressReady, syncError, toggle, clearProgress } = useProgress(user?.id);

  const handleSignOut = async () => {
    await signOut();
    clearProgress();
  };

  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const doneCount = getDoneCount(checked);
  const progress = Math.round((doneCount / TOTAL_TASKS) * 100);
  const activePhaseData = PHASES.find((p) => p.id === activePhase);

  if (supabaseConfigured && !authReady) {
    return <LoadingScreen />;
  }

  if (supabaseConfigured && !user) {
    return (
      <AuthScreen
        email={email}
        setEmail={setEmail}
        authMessage={authMessage}
        setAuthMessage={setAuthMessage}
        onGoogleSignIn={signInWithGoogle}
      />
    );
  }

  if (supabaseConfigured && user && !progressReady) {
    return <LoadingScreen message="Syncing your progress…" />;
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "0 0 60px" }}>
      <RoadmapHeader
        user={user}
        doneCount={doneCount}
        totalTasks={TOTAL_TASKS}
        progress={progress}
        activePhase={activePhase}
        onPhaseChange={setActivePhase}
        onSignOut={handleSignOut}
        syncError={syncError}
      />

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 0" }}>
        {activePhaseData && (
          <PhaseView
            phase={activePhaseData}
            checked={checked}
            expanded={expanded}
            onToggleSection={toggleSection}
            onToggleTask={toggle}
          />
        )}
        <TipsFooter />
      </div>
    </div>
  );
}
