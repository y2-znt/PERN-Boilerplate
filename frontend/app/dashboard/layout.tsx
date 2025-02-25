import { ReactNode } from "react";
import { DashboardHeader } from "../../components/shared/dashboard/header";
import { DashboardSidebar } from "../../components/shared/dashboard/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen">
      <DashboardSidebar className="hidden lg:block" />
      <div className="flex w-full flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
