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
    label: 'Profiler',
    icon: User,
    roles: ['student'],
  },
  {
    href: '/ai-advisor',
    label: 'AI Advisor',
    icon: Bot,
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
    href: '/colleges',
    label: 'Colleges',
    icon: Building,
    roles: ['student'],
  },
  {
    href: '/timeline',
    label: 'Timeline',
    icon: GitMerge,
    roles: ['student'],
  },
  {
    href: '/planner',
    label: 'Planner',
    icon: ListChecks,
    roles: ['student'],
  },
  {
    href: '/resources',
    label: 'Resources',
    icon: Library,
    roles: ['student'],
  },
  {
    href: '/resume',
    label: 'Resume',
    icon: FileText,
    roles: ['student'],
  },
   {
    href: '/parents',
    label: 'Parent Portal',
    icon: HeartHandshake,
    roles: ['student'],
  },
  {
    href: '/feedback',
    label: 'Feedback',
    icon: MessageSquareWarning,
    roles: ['student'],
  },
  {
    href: '/offline',
    label: 'Offline',
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
