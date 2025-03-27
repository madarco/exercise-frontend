"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";
import { IconCake, IconGenderBigender, IconRuler2, IconWeight, IconScissors, IconEye, IconWorld } from "@tabler/icons-react";

const resource: ResourceType = "people";

// Define the properties to display for a person
const properties: ColumnDef[] = [
  {
    property: "birth_year",
    title: "Birth Year",
    type: "badge",
    icon: IconCake,
  },
  {
    property: "gender",
    title: "Gender",
    type: "badge",
    icon: IconGenderBigender,
  },
  {
    property: "height",
    title: "Height",
    type: "measurement",
    unit: "cm",
    icon: IconRuler2,
  },
  {
    property: "mass",
    title: "Mass",
    type: "measurement",
    unit: "kg",
    icon: IconWeight,
  },
  {
    property: "hair_color",
    title: "Hair Color",
    type: "badge",
    icon: IconScissors,
  },
  {
    property: "eye_color",
    title: "Eye Color",
    type: "badge",
    icon: IconEye,
  },
  {
    property: "homeworld",
    title: "Homeworld",
    resource: "planets",
    icon: IconWorld,
  },
];

export default function PersonDetailPage() {
  return <DetailPage resource={resource} properties={properties} />;
}
