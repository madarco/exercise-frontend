"use client";

import ListPage from "../components/list-page";
import { ResourceType } from "../swapi-client";
import { ColumnDef } from "../use-swapi";
import { IconUser, IconGenderBigender, IconCake, IconWorld } from "@tabler/icons-react";

const columnsDef: ColumnDef[] = [
  { property: "name", title: "Name", icon: IconUser },
  { property: "gender", title: "Gender", icon: IconGenderBigender },
  { property: "birth_year", title: "Birth Year", icon: IconCake },
  { property: "homeworld", title: "Homeworld", resource: "planets", icon: IconWorld },
];

const resource: ResourceType = "people";

export default function PeoplePage() {
  return <ListPage resource={resource} columnsDef={columnsDef} />;
}
