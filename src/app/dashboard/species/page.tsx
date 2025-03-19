"use client";

import ListPage from "../components/list-page";
import { ResourceType } from "../swapi-client";
import { ColumnDef } from "../use-swapi";

const columnsDef: ColumnDef[] = [
  { property: "name", title: "Name" },
  { property: "classification", title: "Classification" },
  { property: "designation", title: "Designation" },
  { property: "language", title: "Language" },
  { property: "average_lifespan", title: "Average Lifespan" },
];

const resource: ResourceType = "species";

export default function SpeciesPage() {
  return <ListPage resource={resource} columnsDef={columnsDef} />;
}
