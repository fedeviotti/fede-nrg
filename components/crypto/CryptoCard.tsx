import React from "react";
import {
  Center, Heading, Image, Stack, Tag, useColorModeValue, HStack,
} from "@chakra-ui/react";
import { CryptoCurrency } from "~/types/crypto/cryptoCurrency";

type Props = {
  crypto: CryptoCurrency;
};

export const CryptoCard = ({ crypto }: Props) => (
  <Center>
    <Stack
      direction="column"
      alignItems="center"
      role="group"
      p={4}
      minWidth="200px"
      bg={useColorModeValue("white", "gray.800")}
      pos="relative"
      zIndex={1}
      border="1px solid"
      borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
      borderRadius="lg"
    >
      <HStack>
        <Image
          boxSize="32px"
          alt="Vehicle detail card"
          rounded="lg"
          objectFit="cover"
          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
        />
        <Heading fontSize="lg" fontFamily="body" fontWeight={500}>
          {crypto.name}
        </Heading>
      </HStack>
      <Tag size="md" key="md" variant="solid" colorScheme="brand" textTransform="uppercase">
        {crypto.symbol}
      </Tag>
    </Stack>
  </Center>
);
