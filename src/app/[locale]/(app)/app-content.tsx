
"use client";

import { useSearchParams } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { Chatbot } from "@/components/chatbot/chatbot";
import { Suspense } from "react";
import { useCurrentLocale } from "@/lib/i18n/client";

export function AppContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "student";
  const locale = useCurrentLocale();
  const paramsString = searchParams.toString();

  return (
    <SidebarProvider>
      <AppSidebar role={role} paramsString={paramsString} />
      <SidebarInset>
        <AppHeader role={role} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Suspense>
              {children}
            </Suspense>
        </main>
        <Chatbot />
      </SidebarInset>
    </SidebarProvider>
  );
}
