"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";

const resource: ResourceType = "species";

// Define the properties to display for a species
const speciesProperties: ColumnDef[] = [
  {
    property: "name",
    title: "Name",
    type: "text",
  },
  {
    property: "classification",
    title: "Classification",
    type: "badge",
  },
  {
    property: "designation",
    title: "Designation",
    type: "badge",
  },
  {
    property: "language",
    title: "Language",
    type: "text",
  },
  {
    property: "average_height",
    title: "Average Height",
    type: "measurement",
    unit: "cm",
  },
  {
    property: "average_lifespan",
    title: "Average Lifespan",
    type: "measurement",
    unit: "years",
  },
  {
    property: "skin_colors",
    title: "Skin Colors",
    type: "text",
  },
  {
    property: "hair_colors",
    title: "Hair Colors",
    type: "text",
  },
  {
    property: "eye_colors",
    title: "Eye Colors",
    type: "text",
  },
  {
    property: "homeworld",
    title: "Homeworld",
    resource: "planets",
    type: "text",
  },
  {
    property: "people",
    title: "Characters",
    type: "resources",
    resource: "people",
  },
];

export default function SpeciesDetailPage() {
  return <DetailPage resource={resource} properties={speciesProperties} />;
}
