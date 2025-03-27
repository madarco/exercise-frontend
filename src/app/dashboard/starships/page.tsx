"use client";

import ListPage from "../components/list-page";
import { ResourceType } from "../swapi-client";
import { ColumnDef } from "../use-swapi";
import { IconRocket, IconBuildingFactory, IconCategory, IconEngine, IconGauge } from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const columnsDef: ColumnDef[] = [
  { property: "name", title: "Name", icon: IconRocket },
  { property: "model", title: "Model", icon: IconCategory },
  {
    property: "manufacturer",
    title: "Manufacturer",
    icon: IconBuildingFactory,
    render: (value) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="text-muted-foreground truncate max-w-46">{value}</div>
          </TooltipTrigger>
          <TooltipContent>{value}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  { property: "starship_class", title: "Class", icon: IconEngine },
  { property: "hyperdrive_rating", title: "Hyperdrive Rating", icon: IconGauge },
];

const resource: ResourceType = "starships";

export default function StarshipsPage() {
  return <ListPage resource={resource} columnsDef={columnsDef} />;
}
