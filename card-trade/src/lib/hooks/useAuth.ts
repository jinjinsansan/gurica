"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const supabase = useMemo(() => createClient(), []);
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function hydrate() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      setState((prev) => ({
        ...prev,
        user: data.session?.user ?? null,
        session: data.session ?? null,
        error: error?.message ?? null,
        loading: false,
      }));
    }

    hydrate();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setState({
        user: session?.user ?? null,
        session: session ?? null,
        loading: false,
        error: null,
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }, [supabase]);

  return {
    ...state,
    supabase,
    signOut,
  };
}
