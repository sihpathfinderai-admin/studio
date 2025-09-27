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
    href: '/ai-advisor',
    label: 'AI Advisor',
    icon: Bot,
    roles: ['student'],
  },
  {
    href: '#',
    label: 'Explore Paths',
    icon: Network,
    roles: ['student'],
    isGroup: true,
    children: [
      {
        href: '/stream',
        label: 'Streams',
        icon: Network,
        roles: ['student'],
      },
      {
        href: '/degree',
        label: 'Degrees',
        icon: GraduationCap,
        roles: ['student'],
      },
      {
        href: '/career',
        label: 'Careers',
        icon: Briefcase,
        roles: ['student'],
      },
      {
        href: '/colleges',
        label: 'Colleges',
        icon: Building,
        roles: ['student'],
      },
    ],
  },
  {
    href: '#',
    label: 'My Journey',
    icon: GitMerge,
    roles: ['student'],
    isGroup: true,
    children: [
      {
        href: '/timeline',
        label: 'Roadmap',
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
        label: 'My Resources',
        icon: Library,
        roles: ['student'],
      },
      {
        href: '/resume',
        label: 'Resume Builder',
        icon: FileText,
        roles: ['student'],
      },
    ],
  },
  {
    href: '#',
    label: 'Support',
    icon: MessagesSquare,
    roles: ['student'],
    isGroup: true,
    children: [
      {
        href: '/counselor',
        label: 'Counselor Connect',
        icon: MessagesSquare,
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
        label: 'Send Feedback',
        icon: MessageSquareWarning,
        roles: ['student'],
      },
    ],
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
