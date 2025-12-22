import { notFound } from "next/navigation";

// import { Separator } from "@/app/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/app/components/ui/sidebar";

// import { PropsWithChildren } from "react";
// import { DashboardBreadcrumb } from "./components/layout/dashboard-breadcrumb";
// import { DashboardSidebar } from "./components/layout/dashboard-sidebar";

// import { BreadcrumbProvider } from "./contexts/breadcrumb";

export default function DashboardLayout() {
  notFound();

  // return (
  //   <BreadcrumbProvider>
  //     <SidebarProvider>
  //       <DashboardSidebar />
  //       <SidebarInset className="flex min-h-svh flex-1 flex-col md:max-w-[calc(100vw-var(--sidebar-width))] peer-data-[state=collapsed]:md:max-w-[calc(100vw-var(--sidebar-width-icon))]">
  //         <header className="flex h-16 shrink-0 items-center gap-2">
  //           <div className="flex items-center gap-2 px-4">
  //             <SidebarTrigger className="-ml-1" />
  //             <Separator
  //               orientation="vertical"
  //               className="mr-2 data-[orientation=vertical]:h-4"
  //             />
  //             <DashboardBreadcrumb />
  //           </div>
  //         </header>
  //         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
  //       </SidebarInset>
  //     </SidebarProvider>
  //   </BreadcrumbProvider>
  // );
}
