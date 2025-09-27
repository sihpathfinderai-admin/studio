import { AppContent } from "./app-content";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppContent>{children}</AppContent>;
}
