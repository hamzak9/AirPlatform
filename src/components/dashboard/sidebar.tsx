'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
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
  LayoutDashboard,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Task Scheduling', href: '/tasks', icon: CalendarClock },
  { name: 'Work Coordination', href: '/coordination', icon: ClipboardList },
  { name: 'Checklists', href: '/checklists', icon: ListChecks },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Payments', href: '/payments', icon: DollarSign },
  { name: 'Insights & Reporting', href: '/insights', icon: BarChart3 },
  { name: 'Smart Locks', href: '/smart-locks', icon: Lock },
  { name: 'Housekeeping', href: '/housekeeping', icon: Sparkles },
  { name: 'Messaging', href: '/messaging', icon: MessageSquare },
  { name: 'Guide', href: '/guide', icon: BookOpen },
  { name: 'Assist', href: '/assist', icon: Bot },
  { name: 'Upsells', href: '/upsells', icon: TrendingUp },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r bg-background">
      <div className="flex h-full flex-col overflow-y-auto py-4">
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
