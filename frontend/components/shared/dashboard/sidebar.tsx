"use client";

import { Home, Menu, Settings, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { ThemeToggle } from "../../ui/themeToggle";

interface SidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Burger Menu Button - visible only on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-3 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-background transition-transform duration-200 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div className={`w-64 border-r ${className}`}>
        <SidebarContent />
      </div>

      {/* Backdrop - visible when mobile sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// Composant interne pour le contenu de la sidebar
function SidebarContent() {
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="z-40 flex h-14 items-center lg:h-[60px] lg:border-b">
        <Link href="/" className="flex-1">
          <div className="relative z-20 bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-center text-xl font-bold text-transparent">
            y2 Boilerplate
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start gap-1 px-2 text-sm font-medium">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent ${
              isLinkActive("/dashboard")
                ? "bg-accent text-secondary-foreground"
                : "text-muted-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/dashboard/users"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent ${
              isLinkActive("/dashboard/users")
                ? "bg-accent text-secondary-foreground"
                : "text-muted-foreground"
            }`}
          >
            <Users className="h-4 w-4" />
            Users
          </Link>
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent ${
              isLinkActive("/dashboard/settings")
                ? "bg-accent text-secondary-foreground"
                : "text-muted-foreground"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>

      <div className="mb-12 flex items-center justify-end border-t px-4 py-2">
        <ThemeToggle />
      </div>
    </div>
  );
}
