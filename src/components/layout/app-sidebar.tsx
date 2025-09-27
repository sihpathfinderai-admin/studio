"use client";

import { usePathname, useSearchParams } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";

function AppSidebarMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "student";

  const createLink = (href: string) => `${href}?${searchParams.toString()}`;

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

export function AppSidebar() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar-1");

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="font-bold text-lg text-foreground font-headline">PathWise</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarMenu />
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
