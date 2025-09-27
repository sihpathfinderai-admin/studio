import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { Chatbot } from "@/components/chatbot/chatbot";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <Suspense>
          <AppSidebar />
        </Suspense>
      <SidebarInset>
        <Suspense>
          <AppHeader />
        </Suspense>
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
