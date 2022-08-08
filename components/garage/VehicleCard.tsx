import React from "react";
import {
  Box, Center, Heading, Image, Stack, Text, useColorModeValue,
} from "@chakra-ui/react";
import { Vehicles as Vehicle } from "@prisma/client";

const IMAGE = "https://picsum.photos/282/230";

type Props = {
  vehicle: Vehicle;
};

export const VehicleCard = ({ vehicle }: Props) => (
  <Center py={12}>
    <Box
      role="group"
      p={6}
      maxW="330px"
      w="full"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="2xl"
      rounded="lg"
      pos="relative"
      zIndex={1}
    >
      <Box
        rounded="lg"
        mt={-12}
        pos="relative"
        height="230px"
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 5,
          left: 0,
          backgroundImage: `url(${IMAGE})`,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(20px)",
          },
        }}
      >
        <Image
          alt="Vehicle detail card"
          rounded="lg"
          height={230}
          width={282}
          objectFit="cover"
          src={IMAGE}
        />
      </Box>
      <Stack pt={10} align="center">
        {/* For type use tag */}
        <Text color="gray.500" fontSize="sm" textTransform="uppercase">
          {vehicle.typeId}
        </Text>
        <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
          {vehicle.name}
        </Heading>
      </Stack>
    </Box>
  </Center>
);
