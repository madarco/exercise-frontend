"use client";

import ListPage from "../components/list-page";
import { ResourceType } from "../swapi-client";
import { ColumnDef } from "../use-swapi";
import { IconAlien, IconCategory, IconFlag, IconLanguage, IconClock } from "@tabler/icons-react";

const columnsDef: ColumnDef[] = [
  { property: "name", title: "Name", icon: IconAlien },
  { property: "classification", title: "Classification", icon: IconCategory },
  { property: "designation", title: "Designation", icon: IconFlag },
  { property: "language", title: "Language", icon: IconLanguage },
  { property: "average_lifespan", title: "Average Lifespan", icon: IconClock },
];

const resource: ResourceType = "species";

export default function SpeciesPage() {
  return <ListPage resource={resource} columnsDef={columnsDef} />;
}
