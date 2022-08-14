import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthLogin from "~/components/AuthLogin";
import Link from "next/link";

const Login = () => (
  <Flex flexDirection="column" gap={2}>
    <Link href="/signup">Sign up</Link>
    <AuthLogin />
  </Flex>
);

export default Login;
