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
} from "@tabler/icons-react";

export const sidebar = {
  user: {
    name: "marco",
    email: "marco@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Films",
      url: "/dashboard/films",
      icon: IconDashboard,
    },
    {
      title: "People",
      url: "/dashboard/people",
      icon: IconListDetails,
    },
    {
      title: "Planets",
      url: "/dashboard/planets",
      icon: IconChartBar,
    },
    {
      title: "Species",
      url: "/dashboard/species",
      icon: IconFolder,
    },
    {
      title: "Starships",
      url: "/dashboard/starships",
      icon: IconUsers,
    },

    {
      title: "Vehicles",
      url: "/dashboard/vehicles",
      icon: IconUsers,
    },
  ],
};
