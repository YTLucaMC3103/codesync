import { supabase } from "../lib/SupabaseClient";
import { useNavigate } from "react-router-dom";

export default function EditorPage() {
  const navigate = useNavigate();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Logout fehlgeschlagen: " + error.message);
      return;
    }
    // sichere Navigation zurück zur Auth‑Seite
    navigate("/", { replace: true });
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>📝 CodeSync Editor</h1>
        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </header>

      {/* 👉 Hier kommt dein Monaco‑Editor oder weiteres UI hin */}
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "#0f172a",
    color: "#e2e8f0",
    display: "flex",
    flexDirection: "column" as const,
  },
  header: {
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #1e293b",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
    margin: 0,
  },
  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
} as const;
