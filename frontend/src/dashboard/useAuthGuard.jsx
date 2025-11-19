import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase.js";

export function useAuthGuard(redirect = "/") {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          window.location.href = redirect;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        window.location.href = redirect;
      } finally {
        setIsLoading(false);
      }
    }
    check();
  }, [redirect]);

  return { isLoading };
}