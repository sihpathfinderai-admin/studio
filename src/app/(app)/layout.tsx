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
    <Suspense>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
            </main>
            <Chatbot />
          </SidebarInset>
        </SidebarProvider>
    </Suspense>
  );
}
