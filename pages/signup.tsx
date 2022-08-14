import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthSignup from "~/components/AuthSignup";
import Link from "next/link";

const Login = () => (
  <Flex flexDirection="column" gap={2}>
    <Link href="/login">Log in</Link>
    <AuthSignup />
  </Flex>
);

export default Login;
