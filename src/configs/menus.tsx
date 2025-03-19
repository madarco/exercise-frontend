
import * as React from "react"
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
} from "@tabler/icons-react"

export const sidebar = {
    user: {
      name: "marco",
      email: "marco@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Films",
        url: "#",
        icon: IconDashboard,
      },
      {
        title: "People",
        url: "#",
        icon: IconListDetails,
      },
      {
        title: "Plantes",
        url: "#",
        icon: IconChartBar,
      },
      {
        title: "Species",
        url: "#",
        icon: IconFolder,
      },
      {
        title: "Staships",
        url: "#",
        icon: IconUsers,
      },

      {
        title: "Vehicles",
        url: "#",
        icon: IconUsers,
      },
    ],
  }