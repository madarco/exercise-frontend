"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";

const resource: ResourceType = "people";

// Define the properties to display for a person
const properties: ColumnDef[] = [
  {
    property: "birth_year",
    title: "Birth Year",
    type: "badge",
  },
  {
    property: "gender",
    title: "Gender",
    type: "badge",
  },
  {
    property: "height",
    title: "Height",
    type: "measurement",
    unit: "cm",
  },
  {
    property: "mass",
    title: "Mass",
    type: "measurement",
    unit: "kg",
  },
  {
    property: "hair_color",
    title: "Hair Color",
    type: "badge",
  },
  {
    property: "eye_color",
    title: "Eye Color",
    type: "badge",
  },
  {
    property: "homeworld",
    title: "Homeworld",
    resource: "planets",
  },
];

export default function PersonDetailPage() {
  return <DetailPage resource={resource} properties={properties} />;
}
