import type { LucideIcon } from 'lucide-react';
import {
  AreaChart,
  Bot,
  Briefcase,
  Building,
  FileText,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  Library,
  ListChecks,
  MessageSquareWarning,
  MessagesSquare,
  Network,
  GitMerge,
  Shield,
  Users,
  User,
  BookCopy,
  WifiOff
} from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: ('student' | 'admin')[];
  isGroup?: boolean;
  children?: NavLink[];
};

export const navLinks: NavLink[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['student', 'admin'],
  },
  {
    href: '/profiler',
    label: 'My Profile',
    icon: User,
    roles: ['student'],
  },
  {
    href: '/stream',
    label: 'Stream Suggestion',
    icon: Network,
    roles: ['student'],
  },
  {
    href: '/degree',
    label: 'Degree Recommendation',
    icon: GraduationCap,
    roles: ['student'],
  },
  {
    href: '/career',
    label: 'Career Exploration',
    icon: Briefcase,
    roles: ['student'],
  },
  {
    href: '/ai-advisor',
    label: 'AI Career Plan Generator',
    icon: Bot,
    roles: ['student'],
  },
  {
    href: '/colleges',
    label: 'College Locator',
    icon: Building,
    roles: ['student'],
  },
  {
    href: '/timeline',
    label: 'My Roadmap',
    icon: GitMerge,
    roles: ['student'],
  },
  {
    href: '/planner',
    label: 'Action Plan',
    icon: ListChecks,
    roles: ['student'],
  },
  {
    href: '/resources',
    label: 'Learning Resources',
    icon: Library,
    roles: ['student'],
  },
  {
    href: '/resume',
    label: 'Resume Builder',
    icon: FileText,
    roles: ['student'],
  },
  {
    href: '/feedback',
    label: 'Send Feedback',
    icon: MessageSquareWarning,
    roles: ['student'],
  },
  {
    href: '/offline',
    label: 'Offline Access',
    icon: WifiOff,
    roles: ['student'],
  },
  // Admin Links
  {
    href: '/admin',
    label: 'Admin Dashboard',
    icon: Shield,
    roles: ['admin'],
  },
  {
    href: '/admin/users',
    label: 'User Management',
    icon: Users,
    roles: ['admin'],
  },
  {
    href: '/admin/content',
    label: 'Content',
    icon: BookCopy,
    roles: ['admin'],
  },
  {
    href: '/admin/reports',
    label: 'Reports',
    icon: AreaChart,
    roles: ['admin'],
  },
];
