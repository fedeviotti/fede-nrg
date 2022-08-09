import React from "react";
import {
  Box, Center, Heading, Image, Stack, Tag, useColorModeValue,
} from "@chakra-ui/react";
import BIKE_IMAGE_LIGHT from "~/assets/garage/bicycle-1054-ligth.svg";
import BIKE_IMAGE_DARK from "~/assets/garage/bicycle-1054-dark.svg";
import { ExtendedVehicle } from "~/types/garage/vehicle";

type Props = {
  vehicle: ExtendedVehicle;
};

export const VehicleCard = ({ vehicle }: Props) => {
  const imageSrc = useColorModeValue(BIKE_IMAGE_LIGHT.src, BIKE_IMAGE_DARK.src);

  return (
    <Center px={8}>
      <Box
        role="group"
        p={8}
        maxW="330px"
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        pos="relative"
        zIndex={1}
        border="1px solid"
        borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
        borderRadius="lg"
      >
        <Image
          alt="Vehicle detail card"
          rounded="lg"
          height={230}
          width={282}
          objectFit="cover"
          src={imageSrc}
        />
        <Stack pt={8} align="center" spacing={6}>
          <Tag size="md" key="md" variant="solid" colorScheme="orange" textTransform="uppercase">
            {vehicle.type.name}
          </Tag>
          <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
            {vehicle.name}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
};
