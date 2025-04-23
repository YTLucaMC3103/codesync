import Header from "./Header";
import Sidebar from "./Sidebar";
import CodeEditor from "./EditorPage";

export default function Layout() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ flex: 1, display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}
