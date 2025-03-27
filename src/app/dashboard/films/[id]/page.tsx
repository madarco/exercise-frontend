"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";
import { IconMovie, IconNumbers, IconUser, IconUsers, IconCalendar, IconFileText, IconWorld, IconRocket, IconCar, IconAlien } from "@tabler/icons-react";

// Define the properties to display for a film
const filmProperties: ColumnDef[] = [
  {
    property: "title",
    title: "Title",
    type: "text",
    icon: IconMovie,
  },
  {
    property: "episode_id",
    title: "Episode",
    type: "badge",
    icon: IconNumbers,
  },
  {
    property: "director",
    title: "Director",
    type: "text",
    icon: IconUser,
  },
  {
    property: "producer",
    title: "Producer",
    type: "text",
    icon: IconUser,
  },
  {
    property: "release_date",
    title: "Release Date",
    type: "text",
    icon: IconCalendar,
  },
  {
    property: "opening_crawl",
    title: "Opening Crawl",
    type: "text",
    icon: IconFileText,
  },
  {
    property: "characters",
    title: "Characters",
    type: "resources",
    resource: "people",
    icon: IconUsers,
  },
  {
    property: "planets",
    title: "Planets",
    type: "resources",
    resource: "planets",
    icon: IconWorld,
  },
  {
    property: "starships",
    title: "Starships",
    type: "resources",
    resource: "starships",
    icon: IconRocket,
  },
  {
    property: "vehicles",
    title: "Vehicles",
    type: "resources",
    resource: "vehicles",
    icon: IconCar,
  },
  {
    property: "species",
    title: "Species",
    type: "resources",
    resource: "species",
    icon: IconAlien,
  },
];

export default function FilmDetailPage() {
  return <DetailPage resource="films" properties={filmProperties} />;
}
