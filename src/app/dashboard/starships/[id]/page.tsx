"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";
import {
  IconRocket,
  IconCategory,
  IconBuildingFactory,
  IconEngine,
  IconCoin,
  IconRuler2,
  IconUsers,
  IconUserFilled,
  IconSpeedboat,
  IconGauge,
  IconLetterM,
  IconBox,
  IconClock,
  IconUser,
  IconMovie,
} from "@tabler/icons-react";

const resource: ResourceType = "starships";

// Define the properties to display for a starship
const starshipProperties: ColumnDef[] = [
  {
    property: "name",
    title: "Name",
    type: "text",
    icon: IconRocket,
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
    property: "starship_class",
    title: "Starship Class",
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
    property: "hyperdrive_rating",
    title: "Hyperdrive Rating",
    type: "text",
    icon: IconGauge,
  },
  {
    property: "MGLT",
    title: "MGLT",
    type: "text",
    icon: IconLetterM,
  },
  {
    property: "cargo_capacity",
    title: "Cargo Capacity",
    type: "measurement",
    unit: "tons",
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

export default function StarshipDetailPage() {
  return <DetailPage resource={resource} properties={starshipProperties} />;
}
