"use client";

import ListPage from "../components/list-page";
import { ResourceType } from "../swapi-client";
import { ColumnDef } from "../use-swapi";

const columnsDef: ColumnDef[] = [
  { property: "name", title: "Name" },
  { property: "model", title: "Model" },
  { property: "manufacturer", title: "Manufacturer" },
  { property: "starship_class", title: "Class" },
  { property: "hyperdrive_rating", title: "Hyperdrive Rating" },
];

const resource: ResourceType = "starships";

export default function StarshipsPage() {
  return <ListPage resource={resource} columnsDef={columnsDef} />;
}
