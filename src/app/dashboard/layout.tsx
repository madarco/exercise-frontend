"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { sidebar } from "@/configs/menus";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Layout({ children }) {
  const pathname = usePathname();
  const navItem = sidebar.navMain.find((item) => item.url === pathname);

  return (
    <NuqsAdapter>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader name={navItem?.title || "Detail"} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2 px-8">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </NuqsAdapter>
  );
}
