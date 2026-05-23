import { Session } from "@supabase/supabase-js";
import React, {
  createContext,
  PropsWithChildren,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { supabase } from "./supabase";

const AuthContext = createContext<{
  signIn: (email: string) => Promise<boolean>;
  verify: (email: string, token: string) => Promise<boolean>;
  signOut: () => void;
  session: Session | null;
  isLoading: boolean;
  profile: Profile | null;
  refetchProfile: () => void;
} | null>(null);

export function useAuth() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped in a <AuthProvider />");
  }
  return value;
}

type Profile = {
  id: string;
  username: string;
};

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === "TOKEN_REFRESHED") {
        setSession(newSession);
      } else if (event === "SIGNED_OUT") {
        setSession(null);
      } else {
        setSession(newSession);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username")
      .eq("id", userId)
      .single();

    if (error || !data) return;
    setProfile(data as Profile);
  }, []);

  useEffect(() => {
    if (!session) {
      setProfile(null);
      return;
    }
    fetchProfile(session.user.id);
  }, [fetchProfile, session]);

  const refetchProfile = useCallback(() => {
    if (session) fetchProfile(session.user.id);
  }, [session, fetchProfile]);

  const signIn = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      Alert.alert("Error", error.message);
      return false;
    }

    return true;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Error signing out", error.message);
  };

  const verify = async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) {
      Alert.alert("Invalid code", error.message);
      return false;
    }
    return !!data.session;
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        verify,
        signOut,
        session,
        isLoading,
        profile,
        refetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
