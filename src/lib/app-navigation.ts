import {
  LayoutDashboard,
  CalendarClock,
  ClipboardList,
  ListChecks,
  Wrench,
  Package,
  DollarSign,
  BarChart3,
  Lock,
  Sparkles,
  MessageSquare,
  BookOpen,
  Bot,
  TrendingUp,
  Building2,
  Users,
  Briefcase,
  Plug,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  name: string
  href: string
  icon: LucideIcon
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const APP_NAVIGATION: NavSection[] = [
  {
    title: 'Overview',
    items: [
      {
        name: 'Dashboard',
        href: '/app/dashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        name: 'Scheduling',
        href: '/app/scheduling',
        icon: CalendarClock,
      },
      {
        name: 'Work Coordination',
        href: '/app/work',
        icon: ClipboardList,
      },
      {
        name: 'Checklists',
        href: '/app/checklists',
        icon: ListChecks,
      },
      {
        name: 'Maintenance',
        href: '/app/maintenance',
        icon: Wrench,
      },
      {
        name: 'Inventory',
        href: '/app/inventory',
        icon: Package,
      },
      {
        name: 'Payments',
        href: '/app/payments',
        icon: DollarSign,
      },
      {
        name: 'Insights & Reporting',
        href: '/app/insights',
        icon: BarChart3,
      },
      {
        name: 'Smart Locks',
        href: '/app/smart-locks',
        icon: Lock,
      },
      {
        name: 'Housekeeping',
        href: '/app/housekeeping',
        icon: Sparkles,
      },
    ],
  },
  {
    title: 'Guest Experience',
    items: [
      {
        name: 'Messaging',
        href: '/app/messaging',
        icon: MessageSquare,
      },
      {
        name: 'Guide',
        href: '/app/guide',
        icon: BookOpen,
      },
      {
        name: 'AI Assist',
        href: '/app/assist',
        icon: Bot,
      },
      {
        name: 'Upsells',
        href: '/app/upsells',
        icon: TrendingUp,
      },
    ],
  },
  {
    title: 'Setup',
    items: [
      {
        name: 'Properties',
        href: '/app/properties',
        icon: Building2,
      },
      {
        name: 'Team',
        href: '/app/team',
        icon: Users,
      },
      {
        name: 'Vendors',
        href: '/app/vendors',
        icon: Briefcase,
      },
      {
        name: 'Integrations',
        href: '/app/integrations/airbnb',
        icon: Plug,
      },
      {
        name: 'Settings',
        href: '/app/settings',
        icon: Settings,
      },
    ],
  },
]
