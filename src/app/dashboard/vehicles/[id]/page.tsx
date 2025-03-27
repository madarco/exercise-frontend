"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";
import {
  IconCar,
  IconCategory,
  IconBuildingFactory,
  IconEngine,
  IconCoin,
  IconRuler2,
  IconUsers,
  IconUserFilled,
  IconSpeedboat,
  IconBox,
  IconClock,
  IconUser,
  IconMovie,
} from "@tabler/icons-react";

const resource: ResourceType = "vehicles";

// Define the properties to display for a vehicle
const vehicleProperties: ColumnDef[] = [
  {
    property: "name",
    title: "Name",
    type: "text",
    icon: IconCar,
  },
  {
    property: "model",
    title: "Model",
    type: "text",
    icon: IconCategory,
  },
  {
    property: "manufacturer",
    title: "Manufacturer",
    type: "text",
    icon: IconBuildingFactory,
  },
  {
    property: "vehicle_class",
    title: "Vehicle Class",
    type: "badge",
    icon: IconEngine,
  },
  {
    property: "cost_in_credits",
    title: "Cost",
    type: "measurement",
    unit: "credits",
    icon: IconCoin,
  },
  {
    property: "length",
    title: "Length",
    type: "measurement",
    unit: "m",
    icon: IconRuler2,
  },
  {
    property: "crew",
    title: "Crew",
    type: "text",
    icon: IconUsers,
  },
  {
    property: "passengers",
    title: "Passengers",
    type: "text",
    icon: IconUserFilled,
  },
  {
    property: "max_atmosphering_speed",
    title: "Max Speed",
    type: "measurement",
    unit: "km/h",
    icon: IconSpeedboat,
  },
  {
    property: "cargo_capacity",
    title: "Cargo Capacity",
    type: "measurement",
    unit: "kg",
    icon: IconBox,
  },
  {
    property: "consumables",
    title: "Consumables",
    type: "text",
    icon: IconClock,
  },
  {
    property: "pilots",
    title: "Pilots",
    resource: "people",
    type: "resources",
    icon: IconUser,
  },
  {
    property: "films",
    title: "Films",
    resource: "films",
    type: "resources",
    icon: IconMovie,
  },
];

export default function VehicleDetailPage() {
  return <DetailPage resource={resource} properties={vehicleProperties} />;
}
