export default function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#1A202C", // Dunkles Grau für Sidebar
        color: "#CBD5E0", // Helles Blau/Grau für den Text
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        borderRight: "2px solid #4A5568", // Feiner Trenner
      }}
    >
      <h4 style={{ color: "#E2E8F0" }}>🗂 Dateien</h4>
      <ul style={{ paddingLeft: "15px" }}>
        <li style={sidebarItemStyle}>main.js</li>
        <li style={sidebarItemStyle}>index.html</li>
        <li style={sidebarItemStyle}>notes.txt</li>
      </ul>
    </div>
  );
}

// Sidebar-Item-Stil
const sidebarItemStyle = {
  margin: "10px 0",
  cursor: "pointer",
  transition: "color 0.3s",
};

