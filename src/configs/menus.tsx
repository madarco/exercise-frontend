import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconMovie,
  IconAlien,
  IconPlanet,
  IconRocket,
  IconCar,
  IconWorld,
} from "@tabler/icons-react";

export const sidebar = {
  user: {
    name: "marco",
    email: "marco@example.com",
    avatar: "https://gravatar.com/avatar/f3d0e1eb64485817359c54ed351b3757?s=400&d=robohash&r=x",
  },
  navMain: [
    {
      title: "Films",
      url: "/dashboard/films",
      icon: IconMovie,
    },
    {
      title: "People",
      url: "/dashboard/people",
      icon: IconUsers,
    },
    {
      title: "Planets",
      url: "/dashboard/planets",
      icon: IconPlanet,
    },
    {
      title: "Species",
      url: "/dashboard/species",
      icon: IconAlien,
    },
    {
      title: "Starships",
      url: "/dashboard/starships",
      icon: IconRocket,
    },

    {
      title: "Vehicles",
      url: "/dashboard/vehicles",
      icon: IconCar,
    },
  ],
};
