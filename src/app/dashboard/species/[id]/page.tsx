"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";
import {
  IconAlien,
  IconCategory,
  IconFlag,
  IconLanguage,
  IconRuler2,
  IconClock,
  IconPalette,
  IconScissors,
  IconEye,
  IconWorld,
  IconUsers,
} from "@tabler/icons-react";

const resource: ResourceType = "species";

// Define the properties to display for a species
const speciesProperties: ColumnDef[] = [
  {
    property: "name",
    title: "Name",
    type: "text",
    icon: IconAlien,
  },
  {
    property: "classification",
    title: "Classification",
    type: "badge",
    icon: IconCategory,
  },
  {
    property: "designation",
    title: "Designation",
    type: "badge",
    icon: IconFlag,
  },
  {
    property: "language",
    title: "Language",
    type: "text",
    icon: IconLanguage,
  },
  {
    property: "average_height",
    title: "Average Height",
    type: "measurement",
    unit: "cm",
    icon: IconRuler2,
  },
  {
    property: "average_lifespan",
    title: "Average Lifespan",
    type: "measurement",
    unit: "years",
    icon: IconClock,
  },
  {
    property: "skin_colors",
    title: "Skin Colors",
    type: "text",
    icon: IconPalette,
  },
  {
    property: "hair_colors",
    title: "Hair Colors",
    type: "text",
    icon: IconScissors,
  },
  {
    property: "eye_colors",
    title: "Eye Colors",
    type: "text",
    icon: IconEye,
  },
  {
    property: "homeworld",
    title: "Homeworld",
    resource: "planets",
    type: "text",
    icon: IconWorld,
  },
  {
    property: "people",
    title: "Characters",
    type: "resources",
    resource: "people",
    icon: IconUsers,
  },
];

export default function SpeciesDetailPage() {
  return <DetailPage resource={resource} properties={speciesProperties} />;
}
