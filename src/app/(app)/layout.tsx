import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { Chatbot } from "@/components/chatbot/chatbot";
import { AppContent } from "./app-content";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <AppContent>{children}</AppContent>
    </Suspense>
  );
}
