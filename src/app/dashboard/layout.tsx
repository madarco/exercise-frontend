"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { sidebar } from "@/configs/menus";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function Layout({ children }) {
  const pathname = usePathname();
  const navItem = sidebar.navMain.find((item) => item.url === pathname);

  return (
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
          <div className="@container/main flex flex-1 flex-col gap-2 px-1 md:px-8">
            <Suspense>{children}</Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
