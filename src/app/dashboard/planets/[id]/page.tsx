"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";
import { IconCloud, IconMountain, IconRuler2, IconClock, IconCalendar, IconArrowsDown, IconUsers } from "@tabler/icons-react";

const resource: ResourceType = "planets";

// Define the properties to display for a planet
const properties: ColumnDef[] = [
  {
    property: "climate",
    title: "Climate",
    type: "badge",
    icon: IconCloud,
  },
  {
    property: "terrain",
    title: "Terrain",
    type: "badge",
    icon: IconMountain,
  },
  {
    property: "diameter",
    title: "Diameter",
    type: "measurement",
    unit: "km",
    icon: IconRuler2,
  },
  {
    property: "rotation_period",
    title: "Rotation Period",
    type: "measurement",
    unit: "hours",
    icon: IconClock,
  },
  {
    property: "orbital_period",
    title: "Orbital Period",
    type: "measurement",
    unit: "days",
    icon: IconCalendar,
  },
  {
    property: "gravity",
    title: "Gravity",
    type: "text",
    icon: IconArrowsDown,
  },
  {
    property: "population",
    title: "Population",
    unit: "people",
    type: "measurement",
    icon: IconUsers,
  },
];

export default function PlanetDetailPage() {
  return <DetailPage resource={resource} properties={properties} />;
}
