"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";

const resource: ResourceType = "starships";

// Define the properties to display for a starship
const starshipProperties: ColumnDef[] = [
  {
    property: "name",
    title: "Name",
    type: "text",
  },
  {
    property: "model",
    title: "Model",
    type: "text",
  },
  {
    property: "manufacturer",
    title: "Manufacturer",
    type: "text",
  },
  {
    property: "starship_class",
    title: "Starship Class",
    type: "badge",
  },
  {
    property: "cost_in_credits",
    title: "Cost",
    type: "measurement",
    unit: "credits",
  },
  {
    property: "length",
    title: "Length",
    type: "measurement",
    unit: "m",
  },
  {
    property: "crew",
    title: "Crew",
    type: "text",
  },
  {
    property: "passengers",
    title: "Passengers",
    type: "text",
  },
  {
    property: "max_atmosphering_speed",
    title: "Max Speed",
    type: "measurement",
    unit: "km/h",
  },
  {
    property: "hyperdrive_rating",
    title: "Hyperdrive Rating",
    type: "text",
  },
  {
    property: "MGLT",
    title: "MGLT",
    type: "text",
  },
  {
    property: "cargo_capacity",
    title: "Cargo Capacity",
    type: "measurement",
    unit: "tons",
  },
  {
    property: "consumables",
    title: "Consumables",
    type: "text",
  },
  {
    property: "pilots",
    title: "Pilots",
    resource: "people",
    type: "resources",
  },
  {
    property: "films",
    title: "Films",
    resource: "films",
    type: "resources",
  },
];

export default function StarshipDetailPage() {
  return <DetailPage resource={resource} properties={starshipProperties} />;
}
