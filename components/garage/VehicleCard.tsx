import React from "react";
import {
  Box, Center, Heading, Image, Stack, Tag, useColorModeValue,
} from "@chakra-ui/react";
import { ExtendedVehicle } from "~/types/garage/vehicle";
import { useVehicleCardImage } from "~/components/garage/hooks/useVehicleCardImage";
import { useTagColor } from "~/components/garage/hooks/useTagColor";

type Props = {
  vehicle: ExtendedVehicle;
};

export const VehicleCard = ({ vehicle }: Props) => {
  const imageSrc = useVehicleCardImage(vehicle.type);
  const tagColor = useTagColor(vehicle.type);

  return (
    <Center>
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
          {vehicle.type.name
            && (
            <Tag size="md" key="md" variant="solid" colorScheme={tagColor} textTransform="uppercase">
              {vehicle.type.name}
            </Tag>
            )}
          <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
            {vehicle.name}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
};
