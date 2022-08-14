import { GetServerSideProps } from "next";
import { supabase } from "~/lib/initSupabaseClient";

type EnforceAuthenticated = (inner?: GetServerSideProps) => GetServerSideProps;

const enforceAuthenticated: EnforceAuthenticated = (inner) => async (context) => {
  const { req } = context;
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } };
  }

  if (inner) {
    return inner(context);
  }

  return { props: {} };
};

export default enforceAuthenticated;
