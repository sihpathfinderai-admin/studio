

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLinks, type NavLink } from "@/lib/nav-links";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { GraduationCap, LogOut, PanelLeftClose, PanelRightClose } from "lucide-react";
import { Button } from "../ui/button";

function AppSidebarMenu({ role, paramsString }: { role: string, paramsString: string }) {
  const pathname = usePathname();

  const createLink = (href: string) => `${href}?${paramsString}`;

  const filteredLinks = navLinks.filter((link) =>
    link.roles.includes(role as "student" | "admin")
  );

  return (
    <SidebarMenu>
      {filteredLinks.map((link, i) => (
        <SidebarMenuItem key={`${link.label}-${i}`}>
            <Link href={createLink(link.href)} prefetch={true} className="w-full">
            <SidebarMenuButton
                isActive={pathname === link.href}
                icon={<link.icon />}
                tooltip={link.label}
            >
                <link.icon className="inline-block mr-2" /> {link.label}
            </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function AppSidebar({ role, paramsString }: { role: string, paramsString: string }) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between">
            <Link href={`/dashboard?${paramsString}`} className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-primary" />
                <span className="font-bold text-lg text-foreground font-headline group-data-[collapsible=icon]:hidden">PathFinder AI</span>
            </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarMenu role={role} paramsString={paramsString} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex w-full justify-end">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                {isCollapsed ? <PanelRightClose /> : <PanelLeftClose />}
                <span className="sr-only">{isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}</span>
            </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
