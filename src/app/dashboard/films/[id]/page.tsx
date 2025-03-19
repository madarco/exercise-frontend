"use client";

import DetailPage from "@/app/dashboard/components/detail-page";
import { ResourceType } from "../../swapi-client";
import { ColumnDef } from "../../use-swapi";

// Define the properties to display for a film
const filmProperties: ColumnDef[] = [
  {
    property: "title",
    title: "Title",
    type: "text",
  },
  {
    property: "episode_id",
    title: "Episode",
    type: "badge",
  },
  {
    property: "director",
    title: "Director",
    type: "text",
  },
  {
    property: "producer",
    title: "Producer",
    type: "text",
  },
  {
    property: "release_date",
    title: "Release Date",
    type: "text",
  },
  {
    property: "opening_crawl",
    title: "Opening Crawl",
    type: "text",
  },
  {
    property: "characters",
    title: "Characters",
    type: "resources",
    resource: "people",
  },
  {
    property: "planets",
    title: "Planets",
    type: "resources",
    resource: "planets",
  },
  {
    property: "starships",
    title: "Starships",
    type: "resources",
    resource: "starships",
  },
  {
    property: "vehicles",
    title: "Vehicles",
    type: "resources",
    resource: "vehicles",
  },
  {
    property: "species",
    title: "Species",
    type: "resources",
    resource: "species",
  },
];

export default function FilmDetailPage() {
  return <DetailPage resource="films" properties={filmProperties} />;
}
