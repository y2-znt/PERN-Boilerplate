import ProtectedRoute from "../../components/shared/ProtectedRoute";
import { DashboardHeader } from "../../components/shared/dashboard/header";
import { DashboardSidebar } from "../../components/shared/dashboard/sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute>
      <div className="relative flex min-h-screen">
        <DashboardSidebar className="hidden lg:block" />
        <div className="flex w-full flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
