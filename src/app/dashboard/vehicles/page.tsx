"use client";

import ListPage from "../components/list-page";
import { ResourceType } from "../swapi-client";
import { ColumnDef } from "../use-swapi";
import { IconCar, IconCategory, IconBuildingFactory, IconUsers, IconUserFilled } from "@tabler/icons-react";

const columnsDef: ColumnDef[] = [
  { property: "name", title: "Name", icon: IconCar },
  { property: "model", title: "Model", icon: IconCategory },
  { property: "manufacturer", title: "Manufacturer", icon: IconBuildingFactory },
  { property: "crew", title: "Crew", icon: IconUsers },
  { property: "passengers", title: "Passengers", icon: IconUserFilled },
];

const resource: ResourceType = "vehicles";

export default function VehiclesPage() {
  return <ListPage resource={resource} columnsDef={columnsDef} />;
}
