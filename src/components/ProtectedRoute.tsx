import React, { useEffect, useState, ReactNode } from 'react';
import { Session, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/SupabaseClient';

type AuthChangeEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED';

interface ProtectedRouteProps {
  children: ReactNode; // Definiere den Typ für children
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Hole die aktuelle Session und setze sie
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null);
    };

    fetchSession();

    // Setze einen Listener für Auth-Änderungen
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_evt: AuthChangeEvent, sess: Session | null) => {
        setSession(sess);
      }
    );

    // Cleanup: Entferne den Listener bei der Entmontage der Komponente
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // Wenn keine Session existiert, leite zur Login-Seite weiter
  if (!session) {
    navigate('/login');
    return null; // Verhindert das Rendern der Kinder, während die Weiterleitung stattfindet
  }

  // Wenn die Session vorhanden ist, rendere die Kinder
  return <>{children}</>;
};

export default ProtectedRoute;
