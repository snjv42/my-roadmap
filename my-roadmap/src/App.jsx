import { useState, useEffect } from "react";

const PHASES = [
  {
    id: 1,
    title: "AI Foundations",
    subtitle: "Weeks 1–6 · 2–3 hrs/day",
    color: "#6366f1",
    light: "#eef2ff",
    border: "#c7d2fe",
    goal: "Understand LLMs, prompt engineering, and make your first API call",
    weeks: [
      {
        week: 1,
        label: "How LLMs Work",
        hours: "2 hrs/day",
        tasks: [
          "Read: 'How GPT works' — Andrej Karpathy's intro on YouTube (1h)",
          "Understand tokens, context windows, temperature, system prompts",
          "Set up OpenAI or Anthropic API account + get API key",
          "Make your first raw API call via Postman or curl",
        ],
      },
      {
        week: 2,
        label: "Prompt Engineering",
        hours: "2 hrs/day",
        tasks: [
          "Learn: zero-shot, few-shot, chain-of-thought prompting",
          "Practice on Claude.ai or ChatGPT: write prompts for frontend use cases",
          "Build a prompt that generates Adidas-style product descriptions",
          "Read Anthropic's prompt engineering guide (docs.anthropic.com)",
        ],
      },
      {
        week: 3,
        label: "LLM API in React",
        hours: "2–3 hrs/day",
        tasks: [
          "Integrate Anthropic or OpenAI API in a React app",
          "Build: a simple chat UI with streaming responses",
          "Learn: how to write a system prompt for a specific persona",
          "Deploy to Vercel (free tier)",
        ],
      },
      {
        week: 4,
        label: "Vercel AI SDK",
        hours: "2–3 hrs/day",
        tasks: [
          "Install and learn Vercel AI SDK (sdk.vercel.ai)",
          "Rebuild your chat UI using useChat() hook",
          "Add streaming + loading states to the UI",
          "Learn about tool calling / function calling basics",
        ],
      },
      {
        week: 5,
        label: "AI Dev Tools",
        hours: "2 hrs/day",
        tasks: [
          "Set up Cursor IDE — use AI to generate components",
          "Try GitHub Copilot for a week inside VS Code",
          "Practice: use AI to refactor an existing project",
          "Learn: how to write better prompts for code generation",
        ],
      },
      {
        week: 6,
        label: "Consolidate + Review",
        hours: "2 hrs/day",
        tasks: [
          "Revisit weeks 1–5, fill any gaps",
          "Polish your chat UI project — add history, clear, copy",
          "Write a short blog post (LinkedIn) about what you've learned",
          "Push everything to GitHub with a clean README",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Portfolio Projects",
    subtitle: "Weeks 7–18 · 2–3 hrs/day",
    color: "#0ea5e9",
    light: "#f0f9ff",
    border: "#bae6fd",
    goal: "Build 3 real AI-powered projects that employers can see and interact with",
    weeks: [
      {
        week: 7,
        label: "Project 1: AI Product Description Generator",
        hours: "3 hrs/day",
        tasks: [
          "Design a form: product name, category, tone, keywords",
          "Write a system prompt that generates ecommerce copy",
          "Add: copy button, regenerate, character count",
          "Style it professionally — think Adidas brand language",
        ],
      },
      {
        week: 8,
        label: "Project 1: Polish + Ship",
        hours: "2–3 hrs/day",
        tasks: [
          "Add multiple output variants (professional / casual / SEO-focused)",
          "Add language selector (EN / DE / NL — relevant for relocation!)",
          "Deploy to Vercel with custom domain",
          "Write a case study: problem → solution → outcome",
        ],
      },
      {
        week: 9,
        label: "Project 2: Smart Search UI",
        hours: "3 hrs/day",
        tasks: [
          "Learn: what are embeddings and vector similarity",
          "Use OpenAI text-embedding-3-small to embed sample product data",
          "Store embeddings in a simple JSON or Supabase pgvector",
          "Build a search bar that returns semantically similar results",
        ],
      },
      {
        week: 10,
        label: "Project 2: Polish + Ship",
        hours: "2–3 hrs/day",
        tasks: [
          "Add: highlighted matching text, relevance score display",
          "Compare keyword vs semantic search results side-by-side",
          "Write LinkedIn post about semantic search — builds your brand",
          "Deploy + add to portfolio",
        ],
      },
      {
        week: 11,
        label: "Project 3: AI Interview Prep Tool",
        hours: "3 hrs/day",
        tasks: [
          "Build a tool that generates technical interview questions by role",
          "Add AI answer evaluation: user answers → score + feedback",
          "Make it specific to frontend + AI engineering roles",
          "This is directly useful AND impressive to interviewers",
        ],
      },
      {
        week: 12,
        label: "Project 3: Polish + Ship",
        hours: "2–3 hrs/day",
        tasks: [
          "Add timer, difficulty levels, topic filters (React, TypeScript, AI)",
          "Export results as PDF",
          "Deploy + write case study",
          "Share on LinkedIn — community tools get real traction",
        ],
      },
      {
        week: 13,
        label: "Portfolio Site",
        hours: "3 hrs/day",
        tasks: [
          "Build a personal portfolio site (Next.js + Tailwind)",
          "Include: About, Projects, Skills, Contact sections",
          "Add an AI chat widget — 'Ask about Sanjiv's experience'",
          "Keep design clean, fast, and professional",
        ],
      },
      {
        week: 14,
        label: "Portfolio Site: Ship",
        hours: "2–3 hrs/day",
        tasks: [
          "Add project case studies with screenshots + live demos",
          "Optimize: Lighthouse score 90+, mobile-first",
          "Buy domain: sanjiv.dev or sanjivai.com",
          "Deploy + share with 3 people for feedback",
        ],
      },
      {
        week: 15,
        label: "GitHub + Open Source",
        hours: "2 hrs/day",
        tasks: [
          "Clean up all 3 project repos — good READMEs, demos, screenshots",
          "Pin them on GitHub profile",
          "Make 1 small open source contribution (fix a bug, improve docs)",
          "Add GitHub activity to portfolio site",
        ],
      },
      {
        week: 16,
        label: "TypeScript + Testing AI Apps",
        hours: "2–3 hrs/day",
        tasks: [
          "Strengthen TypeScript types across all projects",
          "Learn: how to test AI API integrations (mocking, error states)",
          "Add error handling: rate limits, empty responses, API failures",
          "Review all 3 projects for production-readiness",
        ],
      },
      {
        week: 17,
        label: "Adidas Innovation Proposal",
        hours: "2 hrs/day",
        tasks: [
          "Write a 1-page internal AI opportunity proposal for Adidas",
          "Frame around business value: revenue, efficiency, customer experience",
          "Use your Project 1 as a working prototype",
          "Present to your team or manager — this builds internal reputation",
        ],
      },
      {
        week: 18,
        label: "Consolidate + Rest",
        hours: "1–2 hrs/day",
        tasks: [
          "Review all work — what are you most proud of?",
          "List skills gap: what do companies want that you still lack?",
          "Update LinkedIn: new title, skills, featured projects",
          "Take 2 days off — you've earned it",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Job Hunt + Relocation",
    subtitle: "Weeks 19–36 · 2 hrs/day",
    color: "#10b981",
    light: "#f0fdf4",
    border: "#a7f3d0",
    goal: "Land interviews, get an offer, and handle visa + relocation logistics",
    weeks: [
      {
        week: 19,
        label: "CV + LinkedIn Overhaul",
        hours: "2 hrs/day",
        tasks: [
          "Rewrite CV headline: 'Senior Frontend Engineer · AI-Powered Products'",
          "Add AI projects to experience section with measurable outcomes",
          "LinkedIn: update title, banner, about section, featured posts",
          "Get CV reviewed by someone in Europe or on Honeypot",
        ],
      },
      {
        week: 20,
        label: "Target Company Research",
        hours: "2 hrs/day",
        tasks: [
          "Germany list: Zalando, About You, N26, Auto1, Delivery Hero, SAP",
          "Netherlands list: Booking.com, Adyen, TomTom, ASML, Mollie",
          "Research each: tech stack, culture, open roles, glassdoor reviews",
          "Build a spreadsheet: company, role, contact, status",
        ],
      },
      {
        week: 21,
        label: "Visa Research",
        hours: "1–2 hrs/day",
        tasks: [
          "Germany EU Blue Card: research salary threshold + requirements",
          "Netherlands HSM Permit: research employer sponsorship process",
          "Find a relocation-friendly recruiter on LinkedIn",
          "Join expat communities: InterNations, Reddit r/IWantOut, r/amsterdam",
        ],
      },
      {
        week: 22,
        label: "Networking",
        hours: "2 hrs/day",
        tasks: [
          "Connect with 10 frontend/AI engineers in Berlin, Munich, Amsterdam",
          "Reach out for 20-min chats — genuine curiosity, not begging for jobs",
          "Attend a virtual meetup: React Amsterdam, JS Nation, Berlin.js",
          "Post 2 LinkedIn articles about your AI project learnings",
        ],
      },
      {
        week: 23,
        label: "Applications Begin",
        hours: "2–3 hrs/day",
        tasks: [
          "Apply to 5 roles on Honeypot (tech-specific EU platform)",
          "Apply to 5 roles on LinkedIn with personalized cover notes",
          "Use Relocate.me for relocation-friendly companies",
          "Follow up on any connections from week 22",
        ],
      },
      {
        week: 24,
        label: "Interview Prep: Technical",
        hours: "2–3 hrs/day",
        tasks: [
          "Practice: React architecture, performance, accessibility questions",
          "Practice: AI integration scenarios (how would you add AI to X?)",
          "Do 2 mock interviews on Pramp or with a peer",
          "Review your projects — be ready to explain every decision",
        ],
      },
      {
        week: 25,
        label: "Interview Prep: Behavioral",
        hours: "2 hrs/day",
        tasks: [
          "Prepare STAR stories: leadership, conflict, failure, impact",
          "Research each company's engineering culture before every call",
          "Prepare smart questions to ask interviewers",
          "Practice in English (and optionally basic German/Dutch greetings)",
        ],
      },
      {
        week: 26,
        label: "Ongoing: Apply + Interview",
        hours: "2 hrs/day",
        tasks: [
          "Continue applying: 3–5 new roles per week",
          "Track all applications in your spreadsheet",
          "Follow up after 1 week if no response",
          "Debrief after every interview — what can you improve?",
        ],
      },
      {
        week: "27–32",
        label: "Interview Loops + Offers",
        hours: "As needed",
        tasks: [
          "Push through full interview loops — technical + system design",
          "Negotiate: salary, relocation package, visa sponsorship, start date",
          "Get at least 2 competing offers if possible — gives negotiating power",
          "Research: cost of living in Berlin vs Amsterdam vs Munich",
        ],
      },
      {
        week: "33–36",
        label: "Relocation",
        hours: "Logistics heavy",
        tasks: [
          "Sign offer → employer initiates visa process",
          "Netherlands HSM: ~2–4 weeks processing. Germany Blue Card: ~6–8 weeks",
          "Find housing: HousingAnywhere, Pararius (NL), ImmoScout24 (DE)",
          "Sort banking: N26 or Bunq work before you arrive in Europe",
          "Move! Join local tech communities on arrival",
        ],
      },
    ],
  },
];

const totalTasks = PHASES.flatMap(p => p.weeks).flatMap(w => w.tasks).length;

export default function Roadmap() {
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({ "phase-1": true });
  const [activePhase, setActivePhase] = useState(1);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sanjiv_roadmap");
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (key) => {
    setChecked(prev => {
      const next = { ...prev, [key]: !prev[key] };
      try { localStorage.setItem("sanjiv_roadmap", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const toggleSection = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const doneCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((doneCount / totalTasks) * 100);

  const phaseProgress = (phase) => {
    const tasks = phase.weeks.flatMap(w =>
      w.tasks.map((_, i) => `${phase.id}-${w.week}-${i}`)
    );
    const done = tasks.filter(k => checked[k]).length;
    return tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "0 0 60px" }}>
      {/* Header */}
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

        {/* Overall progress */}
        <div style={{ marginTop: 24, maxWidth: 420, margin: "24px auto 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>
            <span>{doneCount} of {totalTasks} tasks complete</span>
            <span style={{ color: "#6366f1", fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{
              width: `${progress}%`, height: "100%", borderRadius: 99,
              background: "linear-gradient(90deg, #6366f1, #0ea5e9, #10b981)",
              transition: "width 0.4s ease"
            }} />
          </div>
        </div>

        {/* Phase tabs */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
          {PHASES.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePhase(p.id)}
              style={{
                padding: "6px 14px", borderRadius: 99, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                background: activePhase === p.id ? p.color : "#1e293b",
                color: activePhase === p.id ? "white" : "#64748b",
              }}
            >
              Phase {p.id}: {p.title}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 0" }}>
        {PHASES.filter(p => p.id === activePhase).map(phase => (
          <div key={phase.id}>
            {/* Phase header */}
            <div style={{
              background: phase.light, border: `1.5px solid ${phase.border}`,
              borderRadius: 14, padding: "18px 20px", marginBottom: 16
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
                  <div style={{ fontSize: 28, fontWeight: 800, color: phase.color }}>{phaseProgress(phase)}%</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>complete</div>
                </div>
              </div>
              <div style={{ marginTop: 12, background: "#e2e8f0", borderRadius: 99, height: 6, overflow: "hidden" }}>
                <div style={{ width: `${phaseProgress(phase)}%`, height: "100%", background: phase.color, borderRadius: 99, transition: "width 0.4s" }} />
              </div>
              <div style={{ marginTop: 12, fontSize: 13, color: "#475569" }}>
                🎯 <strong>Goal:</strong> {phase.goal}
              </div>
            </div>

            {/* Weeks */}
            {phase.weeks.map((week, wi) => {
              const sectionKey = `${phase.id}-w${wi}`;
              const isOpen = expanded[sectionKey];
              const weekDone = week.tasks.filter((_, i) => checked[`${phase.id}-${week.week}-${i}`]).length;
              const allDone = weekDone === week.tasks.length;

              return (
                <div key={wi} style={{
                  background: "white", borderRadius: 12,
                  border: `1.5px solid ${allDone ? phase.border : "#e2e8f0"}`,
                  marginBottom: 10, overflow: "hidden",
                  boxShadow: isOpen ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
                  transition: "box-shadow 0.2s"
                }}>
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    style={{
                      width: "100%", padding: "14px 18px", background: "none", border: "none",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
                      textAlign: "left"
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: allDone ? phase.color : phase.light,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, color: allDone ? "white" : phase.color
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
                      transition: "transform 0.2s"
                    }}>⌄</div>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 18px 14px" }}>
                      <div style={{ height: 1, background: "#f1f5f9", marginBottom: 12 }} />
                      {week.tasks.map((task, ti) => {
                        const key = `${phase.id}-${week.week}-${ti}`;
                        const done = !!checked[key];
                        return (
                          <div
                            key={ti}
                            onClick={() => toggle(key)}
                            style={{
                              display: "flex", alignItems: "flex-start", gap: 12,
                              padding: "8px 0", cursor: "pointer",
                              borderBottom: ti < week.tasks.length - 1 ? "1px solid #f8fafc" : "none"
                            }}
                          >
                            <div style={{
                              width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                              border: done ? "none" : `2px solid ${phase.color}40`,
                              background: done ? phase.color : "white",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 12, color: "white", transition: "all 0.15s"
                            }}>
                              {done && "✓"}
                            </div>
                            <div style={{
                              fontSize: 13.5, color: done ? "#94a3b8" : "#334155",
                              textDecoration: done ? "line-through" : "none",
                              lineHeight: 1.5, transition: "all 0.15s"
                            }}>
                              {task}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Footer tips */}
        <div style={{
          marginTop: 24, background: "#0f172a", borderRadius: 14,
          padding: "20px 20px", color: "white"
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>
            📌 Keep in Mind
          </div>
          {[
            "Consistency beats intensity. 2 hrs every day > 8 hrs once a week.",
            "Share your work publicly on LinkedIn as you go — network builds itself.",
            "The AI chat widget on your portfolio site alone will get you interviews.",
            "Netherlands 30% tax ruling can save you €15–20k/year as an expat. Ask every employer.",
            "Honeypot.io is the #1 platform for EU tech jobs — create a profile early.",
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>
              <span style={{ color: "#6366f1", flexShrink: 0 }}>→</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
