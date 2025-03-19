"use client";

import ListPage from "../components/list-page";
import { ResourceType } from "../swapi-client";
import { ColumnDef } from "../use-swapi";

const columnsDef: ColumnDef[] = [
  { property: "name", title: "Name" },
  { property: "gender", title: "Gender" },
  { property: "birth_year", title: "Birth Year" },
  { property: "homeworld", title: "Homeworld", resource: "planets" },
];

const resource: ResourceType = "people";

export default function PeoplePage() {
  return <ListPage resource={resource} columnsDef={columnsDef} />;
}
