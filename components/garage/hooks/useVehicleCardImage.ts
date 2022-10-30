import { VehicleTypes } from "@prisma/client";
import BIKE_IMAGE_DARK from "~/assets/garage/bicycle-9628-dark.svg";
import BIKE_IMAGE_LIGHT from "~/assets/garage/bicycle-9628-light.svg";
import CAR_IMAGE_DARK from "~/assets/garage/car-2899-dark.svg";
import CAR_IMAGE_LIGHT from "~/assets/garage/car-2899-light.svg";
import { useColorModeValue } from "@chakra-ui/react";

type VehicleImage = {
  type: string;
  images: {
    light: any;
    dark: any;
  };
};

const VEHICLE_IMAGES: VehicleImage[] = [
  {
    type: "bike",
    images: {
      light: BIKE_IMAGE_LIGHT,
      dark: BIKE_IMAGE_DARK,
    },
  },
  {
    type: "car",
    images: {
      light: CAR_IMAGE_LIGHT,
      dark: CAR_IMAGE_DARK,
    },
  },
];

export function useVehicleCardImage(type: VehicleTypes) {
  const { images } = VEHICLE_IMAGES.find((_image) => _image.type === type.name) || {};
  const imageSrc = useColorModeValue(images?.light.src, images?.dark.src);
  return imageSrc;
}
