import { supabase } from "../lib/SupabaseClient";

export default function Header() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div
      style={{
        background: "#2D3748", // Header mit dunklem Grau
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ margin: 0, fontWeight: "bold" }}>CodeSync</h3>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#E53E3E", // Roter Button für Logout
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        Logout
      </button>
    </div>
  );
}
