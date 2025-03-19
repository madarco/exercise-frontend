"use client";

import ListPage from "../components/list-page";
import { ResourceType } from "../swapi-client";
import { ColumnDef } from "../use-swapi";

const columnsDef: ColumnDef[] = [
  { property: "name", title: "Name" },
  { property: "climate", title: "Climate" },
  { property: "terrain", title: "Terrain" },
  { property: "population", title: "Population", type: "measurement", unit: "people" },
];

const resource: ResourceType = "planets";

export default function PlanetsPage() {
  return <ListPage resource={resource} columnsDef={columnsDef} />;
}
