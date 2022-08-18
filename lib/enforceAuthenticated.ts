import { GetServerSideProps } from "next";
import { supabase } from "~/lib/initSupabaseClient";

type EnforceAuthenticated = (
  redirectTo?: string,
  inner?: GetServerSideProps,
) => GetServerSideProps;

const enforceAuthenticated: EnforceAuthenticated = (
  redirectTo,
  inner,
) => async (context) => {
  const { req } = context;
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    const redirectParam = redirectTo ? `?redirect=${redirectTo}` : "";
    return { props: {}, redirect: { destination: `/login${redirectParam}` } };
  }

  if (inner) {
    return inner(context);
  }

  return { props: {} };
};

export default enforceAuthenticated;
