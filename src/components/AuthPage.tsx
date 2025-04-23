import { supabase } from "../lib/SupabaseClient";
import { Icon } from "@iconify/react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import backgroundImage from "../assets/code.jpg"

export default function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSessionRedirect = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) navigate("/editor", { replace: true });
  };

  const loginWithProvider = async (
    provider: "github" | "google" | "discord"
  ) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      alert("Login-Fehler: " + error.message);
      setLoading(false);
    } else {
      await handleSessionRedirect();
    }
  };

  const loginWithEmail = async () => {
    const email = prompt("E-Mail eingeben:");
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) alert("OTP-Fehler: " + error.message);
    else alert("Check deine E-Mail");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Willkommen bei <span style={{ color: "#38bdf8" }}>CodeSync</span></h1>
        <p style={styles.subtitle}>Synchronisiere deinen Code – überall.</p>

        <div style={styles.buttons}>
          <AuthButton
            icon={<Icon icon="logos:google-icon" width={20} />}
            label="Mit Google"
            disabled={loading}
            onClick={() => loginWithProvider("google")}
          />
          <AuthButton
            icon={<Icon icon="logos:github-icon" width={20} />}
            label="Mit GitHub"
            disabled={loading}
            onClick={() => loginWithProvider("github")}
          />
          <AuthButton
            icon={<Icon icon="logos:discord-icon" width={20} />}
            label="Mit Discord"
            disabled={loading}
            onClick={() => loginWithProvider("discord")}
          />
          <AuthButton
            icon={<Mail size={20} />}
            label="Per E-Mail"
            disabled={loading}
            onClick={loginWithEmail}
          />
        </div>
      </div>
    </div>
  );
}

function AuthButton({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      style={{ ...styles.button, opacity: disabled ? 0.6 : 1 }}
      onClick={onClick}
      disabled={disabled}
    >
      <span style={styles.buttonContent}>
        {icon}
        {label}
      </span>
    </button>
  );
}

const styles = {
  page: {
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    gap: "20px",
    color: "#e2e8f0",
    backdropFilter: "blur(6px)",         // Leichter Blur-Effekt über dem Bild
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Fallback-Farbüberlagerung
  },
  card: {
    backgroundColor: "rgba(15,23,42,0.85)",
    backdropFilter: "blur(8px)",
    borderRadius: "16px",
    padding: "40px",
    color: "#e2e8f0",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    textAlign: "center" as const,
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#94a3b8",
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  button: {
    background: "#1e293b",
    color: "#e2e8f0",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    cursor: "pointer",
    transition: "transform 0.2s, background 0.2s",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
} as const;
