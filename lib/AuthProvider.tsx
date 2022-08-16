import React from "react";
import {
  AuthChangeEvent,
  Session, SupabaseClient, User,
} from "@supabase/supabase-js";
import { useRouter } from "next/router";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  signOut: () => void;
};

export const AuthContext = React.createContext<AuthContextValue>({
  session: null,
  user: null,
  signOut: () => {},
});

type Props = {
  supabase: SupabaseClient;
  children: React.ReactNode;
};

async function handleAuthChange(event: AuthChangeEvent, session: Session | null) {
  await fetch("/api/auth", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  });
}

export const AuthProvider = ({ supabase, ...props }: Props) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
        if (event === "SIGNED_OUT") {
          setSession(null);
          setUser(null);
        }
      },
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, [session, supabase.auth]);

  const contextValue = React.useMemo(() => ({
    session,
    user,
    signOut: () => {
      supabase.auth.signOut();
      router.push("/login");
    },
  }), [router, session, supabase.auth, user]);

  return (
    <AuthContext.Provider
      value={contextValue}
      {...props}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
