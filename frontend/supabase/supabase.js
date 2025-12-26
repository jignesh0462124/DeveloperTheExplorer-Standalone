import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
  {
    auth: {
      // Use PKCE flow instead of implicit flow for OAuth
      // This prevents access tokens from appearing in the URL
      flowType: 'pkce',
      // Automatically detect the redirect URL
      detectSessionInUrl: true,
      // Store session in local storage
      storage: window.localStorage,
      // Auto refresh tokens
      autoRefreshToken: true,
      // Persist session
      persistSession: true,
    }
  }
);
