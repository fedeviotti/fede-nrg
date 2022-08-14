import React from "react";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";

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

export const AuthProvider = ({ supabase, ...props }: Props) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      },
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, [supabase.auth]);

  const contextValue = React.useMemo(() => ({
    session,
    user,
    signOut: () => supabase.auth.signOut(),
  }), [session, supabase.auth, user]);

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
