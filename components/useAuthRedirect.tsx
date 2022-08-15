import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "~/lib/AuthProvider";

export const useAuthRedirect = () => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    const { pathname } = router;
    const redirectBase = "/login";
    const redirectParam = pathname === "/login" ? "" : `?redirect=${pathname}`;
    const redirect = pathname === "/" ? redirectBase : `${redirectBase}${redirectParam}`;
    if (!user) {
      router.push(redirect);
    }
  }, [router, user]);

  return useAuth();
};
