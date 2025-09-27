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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { GraduationCap, LogOut } from "lucide-react";
import { Button } from "../ui/button";

function AppSidebarMenu({ role, paramsString }: { role: string, paramsString: string }) {
  const pathname = usePathname();

  const createLink = (href: string) => `${href}?${paramsString}`;

  const filteredLinks = navLinks.filter((link) =>
    link.roles.includes(role as "student" | "admin")
  );

  return (
    <SidebarMenu>
      {filteredLinks.map((link, i) =>
        link.isGroup && link.children ? (
          <SidebarGroup key={`${link.label}-${i}`}>
            <SidebarGroupLabel>{link.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {link.children.map((child, j) => (
                  <SidebarMenuItem key={`${child.label}-${j}`}>
                    <Link href={createLink(child.href)} className="w-full">
                      <SidebarMenuButton
                        isActive={pathname === child.href}
                        icon={<child.icon />}
                        tooltip={child.label}
                      >
                        {child.label}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarMenuItem key={`${link.label}-${i}`}>
             <Link href={createLink(link.href)} className="w-full">
              <SidebarMenuButton
                isActive={pathname === link.href}
                icon={<link.icon />}
                tooltip={link.label}
              >
                {link.label}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        )
      )}
    </SidebarMenu>
  );
}

export function AppSidebar({ role, paramsString }: { role: string, paramsString: string }) {

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <Link href={`/dashboard?${paramsString}`} className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="font-bold text-lg text-foreground font-headline">PathFinder AI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarMenu role={role} paramsString={paramsString} />
      </SidebarContent>
      <SidebarFooter>
         <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogOut className="w-4 h-4" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
