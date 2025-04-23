import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/SupabaseClient";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_evt, sess) => {
      setSession(sess);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", paddingTop: "30vh" }}>
        Lade …
      </div>
    );
  }

  return session ? children : <Navigate to="/" replace />;
}
