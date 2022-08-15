import { GetServerSideProps } from "next";
import { supabase } from "~/lib/initSupabaseClient";

type EnforceAuthenticated = (inner?: GetServerSideProps) => GetServerSideProps;

const enforceAuthenticated: EnforceAuthenticated = (inner) => async (context) => {
  const { req, resolvedUrl } = context;
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const baseDestination = "/login";
  const redirect = resolvedUrl !== "/" ? `?redirect=${resolvedUrl}` : "";

  if (!user) {
    return { props: {}, redirect: { destination: `${baseDestination}${redirect}` } };
  }

  if (inner) {
    return inner(context);
  }

  return { props: {} };
};

export default enforceAuthenticated;
