export default function LoadingScreen({ message = "Loading…" }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#0f172a", color: "#94a3b8", fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {message}
    </div>
  );
}
