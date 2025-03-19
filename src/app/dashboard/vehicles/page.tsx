"use client";

import ListPage from "../components/list-page";
import { ResourceType } from "../swapi-client";
import { ColumnDef } from "../use-swapi";

const columnsDef: ColumnDef[] = [
  { property: "name", title: "Name" },
  { property: "model", title: "Model" },
  { property: "manufacturer", title: "Manufacturer" },
  { property: "crew", title: "Crew" },
  { property: "passengers", title: "Passengers" },
];

const resource: ResourceType = "vehicles";

export default function VehiclesPage() {
  return <ListPage resource={resource} columnsDef={columnsDef} />;
}
