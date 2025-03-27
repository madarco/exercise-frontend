"use client";

import ListPage from "../components/list-page";
import { ResourceType } from "../swapi-client";
import { ColumnDef } from "../use-swapi";
import { IconWorld, IconCloud, IconMountain, IconUsers } from "@tabler/icons-react";

const columnsDef: ColumnDef[] = [
  { property: "name", title: "Name", icon: IconWorld },
  { property: "climate", title: "Climate", icon: IconCloud },
  { property: "terrain", title: "Terrain", icon: IconMountain },
  { property: "population", title: "Population", type: "measurement", unit: "people", icon: IconUsers },
];

const resource: ResourceType = "planets";

export default function PlanetsPage() {
  return <ListPage resource={resource} columnsDef={columnsDef} />;
}
