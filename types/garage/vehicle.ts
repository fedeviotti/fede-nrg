import { Vehicles as Vehicle, VehicleTypes as VehicleType } from "@prisma/client";

export type ExtendedVehicle = Vehicle & { type: VehicleType };
