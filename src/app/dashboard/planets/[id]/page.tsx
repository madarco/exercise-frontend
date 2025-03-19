"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";

const resource: ResourceType = "planets";

// Define the properties to display for a planet
const properties: ColumnDef[] = [
  {
    property: "climate",
    title: "Climate",
    type: "badge",
  },
  {
    property: "terrain",
    title: "Terrain",
    type: "badge",
  },
  {
    property: "diameter",
    title: "Diameter",
    type: "measurement",
    unit: "km",
  },
  {
    property: "rotation_period",
    title: "Rotation Period",
    type: "measurement",
    unit: "hours",
  },
  {
    property: "orbital_period",
    title: "Orbital Period",
    type: "measurement",
    unit: "days",
  },
  {
    property: "gravity",
    title: "Gravity",
    type: "text",
  },
  {
    property: "population",
    title: "Population",
    type: "text",
  },
];

export default function PlanetDetailPage() {
  return <DetailPage resource={resource} properties={properties} />;
}
