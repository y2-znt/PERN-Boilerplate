import { ReactNode } from "react";
import { DashboardHeader } from "../../components/shared/dashboard/header";
import { DashboardSidebar } from "../../components/shared/dashboard/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen">
      <div className="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0">
        <DashboardSidebar />
      </div>

      <div className="flex-1">
        <div className="flex min-h-screen w-full flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
